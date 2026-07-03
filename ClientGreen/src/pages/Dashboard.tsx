import { useAuth } from "../lib/AuthContext";
import { Users, Briefcase, Ticket, Receipt, AlertCircle, Activity } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const { profile } = useAuth();

  const quickStats = [
    { label: "Active Projects", value: "12", icon: Briefcase, trend: "+2", trendUp: true, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Open Tickets", value: "5", icon: Ticket, trend: "-3", trendUp: true, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Invoices", value: "3", icon: Receipt, trend: "+1", trendUp: false, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Total Clients", value: "48", icon: Users, trend: "+5", trendUp: true, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {profile?.firstName || 'GreenSymbol User'}!
          </h1>
          <p className="text-muted-foreground mt-1">Platform analytics and operational metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card border border-border flex items-center gap-4 group hover:border-emerald-500/30 transition-colors">
            <div className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-foreground leading-none">{stat.value}</div>
                <div className={`text-xs font-medium mb-0.5 ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.trend}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Recent Activity
              </h2>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { time: "2 hours ago", text: "New ticket #1042 created by Acme Corp", type: "ticket" },
                { time: "5 hours ago", text: "Invoice #INV-2023-001 marked as paid", type: "invoice" },
                { time: "1 day ago", text: "Project 'Cloud Migration' phase 2 completed", type: "project" },
                { time: "2 days ago", text: "New client 'Stark Industries' onboarded", type: "client" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500/50"></div>
                  <div>
                    <p className="text-sm text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Action Needed
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                <p className="text-sm font-medium text-amber-600 dark:text-amber-500 mb-1">Overdue Invoice</p>
                <p className="text-xs text-muted-foreground mb-2">Global Tech - $4,200 (2 days overdue)</p>
                <Button size="sm" className="w-full bg-amber-500/20 text-amber-600 dark:text-amber-500 hover:bg-amber-500/30">Send Reminder</Button>
              </div>
              <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                <p className="text-sm font-medium text-rose-600 dark:text-rose-500 mb-1">Critical Ticket</p>
                <p className="text-xs text-muted-foreground mb-2">Server connection timeout (#T-1042)</p>
                <Button size="sm" className="w-full bg-rose-500/20 text-rose-600 dark:text-rose-500 hover:bg-rose-500/30">View Ticket</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}