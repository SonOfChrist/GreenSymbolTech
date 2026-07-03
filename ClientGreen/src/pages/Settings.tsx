import { useState } from "react";
import { User, Shield, Bell, CreditCard, Save, Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useAuth } from "../lib/AuthContext";

export default function Settings() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and application settings.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "profile" 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <User className="h-4 w-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "security" 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Shield className="h-4 w-4" />
              Security
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "preferences" 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Monitor className="h-4 w-4" />
              Preferences
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "notifications" 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("billing")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "billing" 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Billing
            </button>
          </nav>
        </aside>

        <div className="flex-1 bg-card border border-border rounded-xl p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Profile Information</h3>
                <p className="text-sm text-muted-foreground">Update your personal details and public profile.</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.firstName || ""}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.lastName || ""}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Role</label>
                  <input 
                    type="text" 
                    defaultValue={profile?.role === 'admin' ? 'Administrator' : 'Standard User'}
                    disabled
                    className="w-full h-10 px-3 rounded-md border border-input bg-muted text-muted-foreground text-sm cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Security Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your password and authentication methods.</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Current Password</label>
                  <input 
                    type="password" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">New Password</label>
                    <input 
                      type="password" 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500" 
                    />
                  </div>
                </div>
                <div className="pt-4 mt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Display Preferences</h3>
                <p className="text-sm text-muted-foreground">Customize your viewing experience.</p>
              </div>
              <div className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-border rounded-lg hover:border-emerald-500/50 transition-colors">
                      <Sun className="h-6 w-6 text-foreground" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-emerald-500 bg-emerald-500/5 rounded-lg transition-colors">
                      <Moon className="h-6 w-6 text-emerald-500" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 border border-border rounded-lg hover:border-emerald-500/50 transition-colors">
                      <Monitor className="h-6 w-6 text-foreground" />
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground">Language & Region</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Language</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500">
                        <option>English (US)</option>
                        <option>French</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Timezone</label>
                      <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500">
                        <option>UTC (Coordinated Universal Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>PST (Pacific Standard Time)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Choose what updates you want to receive.</p>
              </div>
              <div className="space-y-4 max-w-2xl divide-y divide-border">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive daily summaries and important alerts.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Ticket Updates</h4>
                    <p className="text-sm text-muted-foreground">Get notified when a support ticket changes status.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Marketing & Promos</h4>
                    <p className="text-sm text-muted-foreground">Receive offers, updates and marketing emails.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground">Billing & Plans</h3>
                <p className="text-sm text-muted-foreground">Manage your subscription and payment methods.</p>
              </div>
              <div className="space-y-6 max-w-2xl">
                <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-base font-bold text-foreground">Enterprise Plan</h4>
                    <p className="text-sm text-muted-foreground mt-1">Billed annually ($12,000/year)</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-full">
                    Active
                  </span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-4">Payment Methods</h4>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-12 bg-muted rounded flex items-center justify-center border border-border">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  <Button variant="outline" className="w-full mt-3">Add Payment Method</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}