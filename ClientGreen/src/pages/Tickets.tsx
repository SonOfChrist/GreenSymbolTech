import { useState } from "react";
import { Search, Plus, Filter, MessageSquare, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const MOCK_TICKETS = [
  { id: "T-1042", subject: "Server connection timeout on primary database", requester: "Jane Doe", priority: "High", status: "Open", updated: "10 mins ago" },
  { id: "T-1041", subject: "Update SSL certificates for staging environment", requester: "Mark Smith", priority: "Medium", status: "In Progress", updated: "1 hr ago" },
  { id: "T-1040", subject: "User unable to access portal after password reset", requester: "Sarah Jones", priority: "Low", status: "Pending", updated: "3 hrs ago" },
  { id: "T-1039", subject: "Weekly backup failed to sync to offsite storage", requester: "System", priority: "Critical", status: "Open", updated: "5 hrs ago" },
  { id: "T-1038", subject: "Feature request: Dark mode for reporting dashboard", requester: "Alex Johnson", priority: "Low", status: "Resolved", updated: "1 day ago" },
  { id: "T-1037", subject: "API rate limiting issues on external integrations", requester: "Dev Team", priority: "High", status: "Resolved", updated: "2 days ago" },
];

export default function Tickets() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage customer inquiries and technical issues.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">14</div>
            <div className="text-sm font-medium text-muted-foreground">Open Tickets</div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">6</div>
            <div className="text-sm font-medium text-muted-foreground">In Progress</div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm font-medium text-muted-foreground">Critical Priority</div>
          </div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">128</div>
            <div className="text-sm font-medium text-muted-foreground">Resolved (7d)</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
        <div className="border-b border-border px-4 pt-4">
          <div className="flex space-x-6 overflow-x-auto">
            {['all', 'open', 'in_progress', 'resolved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                  activeTab === tab ? 'text-emerald-500' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === 'all' ? 'All Tickets' : 
                 tab === 'open' ? 'Open' : 
                 tab === 'in_progress' ? 'In Progress' : 'Resolved'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID, subject, or requester..."
              className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-4 text-sm text-foreground focus-visible:outline-none focus-visible:border-emerald-500/50"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Ticket ID</th>
                <th className="px-6 py-3 font-medium">Subject & Requester</th>
                <th className="px-6 py-3 font-medium">Priority</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_TICKETS.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground group-hover:text-emerald-500 transition-colors">
                    {ticket.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground mb-1">{ticket.subject}</div>
                    <div className="text-muted-foreground text-xs">{ticket.requester}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {ticket.priority === 'Critical' && <AlertCircle className="h-4 w-4 text-rose-500" />}
                      {ticket.priority === 'High' && <div className="h-2 w-2 rounded-full bg-orange-500"></div>}
                      {ticket.priority === 'Medium' && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                      {ticket.priority === 'Low' && <div className="h-2 w-2 rounded-full bg-slate-400"></div>}
                      <span className="text-muted-foreground">{ticket.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                      ticket.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      ticket.status === 'Pending' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                      'bg-slate-500/10 text-foreground border-slate-500/20'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {ticket.updated}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}