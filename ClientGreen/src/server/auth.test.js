import { describe, it, expect, beforeAll, afterAll } from "vitest";
import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";
import { authRouter } from "./auth.js";
import { db, initDb } from "./db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

describe("Auth Endpoints", () => {
  beforeAll(() => {
    initDb();
    // Clean up before starting
    db.prepare("DELETE FROM users").run();
  });

  afterAll(() => {
    // Clean up
    db.prepare("DELETE FROM users").run();
  });

  const testUser = {
    email: "test@example.com",
    password: "Password123!",
    firstName: "Test",
    lastName: "User",
  };

  let verificationToken = "";
  let refreshTokenCookie = "";
  let accessToken = "";

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);
    
    expect(res.status).toBe(201);
    expect(res.body.message).toContain("registered successfully");

    // Get the verification token from db to test verify-email
    const tokenRecord = db.prepare("SELECT token FROM verification_tokens WHERE type = 'email_verification'").get() as any;
    expect(tokenRecord).toBeDefined();
    verificationToken = tokenRecord.token;
  });

  it("should not login if email is not verified", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });
    
    expect(res.status).toBe(403);
    expect(res.body.error).toBe("Email not verified");
  });

  it("should verify email", async () => {
    const res = await request(app)
      .post("/api/auth/verify-email")
      .send({ token: verificationToken });
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Email verified successfully");
  });

  it("should login successfully after verification", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });
    
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe(testUser.email);

    accessToken = res.body.accessToken;
    
    // Grab refresh token cookie
    const cookies = res.headers['set-cookie'];
    refreshTokenCookie = cookies[0].split(';')[0];
  });

  it("should refresh the token", async () => {
    const res = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", [refreshTokenCookie]);
    
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });

  it("should request password reset", async () => {
    const res = await request(app)
      .post("/api/auth/request-password-reset")
      .send({ email: testUser.email });
    
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("link has been sent");
  });

  it("should reset password", async () => {
    // Get the reset token
    const tokenRecord = db.prepare("SELECT token FROM verification_tokens WHERE type = 'password_reset'").get() as any;
    expect(tokenRecord).toBeDefined();

    const res = await request(app)
      .post("/api/auth/reset-password")
      .send({ token: tokenRecord.token, newPassword: "NewPassword123!" });
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Password reset successfully");
  });

  it("should login with new password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "NewPassword123!" });
    
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });

  it("should logout successfully", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", [refreshTokenCookie]);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logged out successfully");

    // Attempting to refresh should fail
    const refreshRes = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", [refreshTokenCookie]);
    
    expect(refreshRes.status).toBe(401);
  });
});