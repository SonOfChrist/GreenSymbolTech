import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db.js";
import { z } from "zod";
import crypto from "crypto";

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "default_dev_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "default_dev_refresh_secret";

// Schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

// Helper to generate tokens
function generateTokens(userId: string, email: string, roles: string[]) {
  const accessToken = jwt.sign({ userId, email, roles }, JWT_SECRET, { expiresIn: '40s' });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '1d' });
  return { accessToken, refreshToken };
}

// 1. Register
authRouter.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Check if user exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(data.email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const userId = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(data.password, 10);

    const insertUser = db.prepare('INSERT INTO users (id, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)');
    insertUser.run(userId, data.email, passwordHash, data.firstName || null, data.lastName || null);

    const insertRole = db.prepare('INSERT INTO user_roles (user_id, role) VALUES (?, ?)');
    insertRole.run(userId, 'user');

    // Create email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours
    
    db.prepare('INSERT INTO verification_tokens (token, user_id, type, expires_at) VALUES (?, ?, ?, ?)').run(
      verificationToken, userId, 'email_verification', expiresAt.toISOString()
    );

    // TODO: Send email here in real life
    console.log(`[Email Mock] Verify email for ${data.email}: /api/auth/verify-email?token=${verificationToken}`);

    res.status(201).json({ message: "User registered successfully. Please check your email to verify." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Register error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. Login
authRouter.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(data.email) as any;
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.is_verified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    const rolesQuery = db.prepare('SELECT role FROM user_roles WHERE user_id = ?').all(user.id) as any[];
    const roles = rolesQuery.map(r => r.role);

    const { accessToken, refreshToken } = generateTokens(user.id, user.email, roles);

    // Save session
    const sessionId = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // 1 day

    db.prepare('INSERT INTO sessions (id, user_id, refresh_token, expires_at) VALUES (?, ?, ?, ?)').run(
      sessionId, user.id, refreshToken, expiresAt.toISOString()
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ accessToken, user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, roles } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. Refresh Token
authRouter.post("/refresh", (req, res) => {
  try { const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    const session = db.prepare('SELECT * FROM sessions WHERE refresh_token = ? AND expires_at > ?').get(refreshToken, new Date().toISOString()) as any;
    if (!session) {
      return res.status(401).json({ error: "Invalid or expired refresh token" });
    }

    try {
      jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (e) {
      return res.status(401).json({ error: "Invalid refresh token signature" });
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(session.user_id) as any;
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const rolesQuery = db.prepare('SELECT role FROM user_roles WHERE user_id = ?').all(user.id) as any[];
    const roles = rolesQuery.map(r => r.role);

    const { accessToken } = generateTokens(user.id, user.email, roles);
    res.json({ accessToken });
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 4. Logout
authRouter.post("/logout", (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (refreshToken) {
      db.prepare('DELETE FROM sessions WHERE refresh_token = ?').run(refreshToken);
    }
    res.clearCookie('refreshToken');
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 5. Verify Email
authRouter.post("/verify-email", (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token required" });
    const verification = db.prepare('SELECT * FROM verification_tokens WHERE token = ? AND type = ? AND expires_at > ?').get(token, 'email_verification', new Date().toISOString()) as any;
    if (!verification) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    db.prepare('UPDATE users SET is_verified = 1 WHERE id = ?').run(verification.user_id);
    db.prepare('DELETE FROM verification_tokens WHERE token = ?').run(token);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 6. Request Password Reset
authRouter.post("/request-password-reset", (req, res) => {
  try { const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email) as any;
    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour valid
      
      db.prepare('INSERT INTO verification_tokens (token, user_id, type, expires_at) VALUES (?, ?, ?, ?)').run(
        resetToken, user.id, 'password_reset', expiresAt.toISOString()
      );

      // TODO: Send email here
      console.log(`[Email Mock] Reset password for ${email}: /api/auth/reset-password?token=${resetToken}`);
    }

    // Always return success to prevent email enumeration
    res.json({ message: "If an account exists, a password reset link has been sent." });
  } catch (error) {
    console.error("Request reset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 7. Reset Password
authRouter.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword || newPassword.length < 8) {
      return res.status(400).json({ error: "Token and valid new password (min 8 chars) required" });
    }

    const verification = db.prepare('SELECT * FROM verification_tokens WHERE token = ? AND type = ? AND expires_at > ?').get(token, 'password_reset', new Date().toISOString()) as any;
    
    if (!verification) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, verification.user_id);
    db.prepare('DELETE FROM verification_tokens WHERE token = ?').run(token);
    // Invalidate all existing sessions
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(verification.user_id);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
