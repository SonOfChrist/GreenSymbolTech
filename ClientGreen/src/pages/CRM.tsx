import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, User, Mail, Phone, Calendar, Building} from "lucide-react";
import { Button } from "@/src/components/ui/button";

const MOCK_CLIENTS = [
  { id: 1, name: "CyberSecurity", contact: "Stanley Mochoge", email: "Mochogestanley80@gmail.com", phone: "+254 743 587 157", status: "Active", lastContact: "2023-10-25" },
  { id: 2, name: "Global Tech", contact: "Robin M", email: "sinfo@greensymboltechology.com", phone: "+254 700 000 000", status: "Active", lastContact: "2023-10-24" },
];

export default function CRM() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">CRM Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your client relationships and leads.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm font-medium text-muted-foreground mb-1">Total Clients</div>
          <div className="text-2xl font-bold text-foreground">1,248</div>
          <div className="text-xs text-emerald-500 mt-1">+12% from last month</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm font-medium text-muted-foreground mb-1">Active Deals</div>
          <div className="text-2xl font-bold text-foreground">42</div>
          <div className="text-xs text-emerald-500 mt-1">+5 new this week</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm font-medium text-muted-foreground mb-1">Revenue Pipeline</div>
          <div className="text-2xl font-bold text-foreground">$2.4M</div>
          <div className="text-xs text-muted-foreground mt-1">Expected this quarter</div>
        </div>
        <div className="bg-card border border-border p-4 rounded-xl">
          <div className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</div>
          <div className="text-2xl font-bold text-foreground">24%</div>
          <div className="text-xs text-rose-500 mt-1">-2% from last month</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-4 text-sm text-foreground focus-visible:outline-none focus-visible:border-emerald-500/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Company / Contact</th>
                <th className="px-6 py-3 font-medium">Contact Info</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Last Contact</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {client.name}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 mt-1">
                      <User className="h-3 w-3" />
                      {client.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-foreground flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {client.email}
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 mt-1">
                      <Phone className="h-3 w-3" />
                      {client.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                      client.status === 'Lead' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                      'bg-slate-500/10 text-slate-600 border-slate-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {client.lastContact}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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