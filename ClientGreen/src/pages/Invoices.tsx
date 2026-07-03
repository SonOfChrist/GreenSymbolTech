import { useState } from "react";
import { Search, Plus, Filter, Download, DollarSign, FileText, TrendingUp, MoreHorizontal, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const MOCK_INVOICES = [
  { id: "INV-2023-001", client: "Acme Corp", amount: "$12,500.00", status: "Paid", date: "2023-10-01", dueDate: "2023-10-15" },
  { id: "INV-2023-002", client: "Global Tech", amount: "$4,200.00", status: "Overdue", date: "2023-09-15", dueDate: "2023-09-30" },
  { id: "INV-2023-003", client: "Stark Industries", amount: "$24,000.00", status: "Pending", date: "2023-10-25", dueDate: "2023-11-10" },
  { id: "INV-2023-004", client: "Wayne Enterprises", amount: "$8,500.00", status: "Draft", date: "2023-10-28", dueDate: "2023-11-12" },
  { id: "INV-2023-005", client: "Daily Planet", amount: "$1,250.00", status: "Paid", date: "2023-09-05", dueDate: "2023-09-20" },
];

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage billing, payments, and financial records.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-emerald-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> +14.5%
            </span>
          </div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Total Revenue (YTD)</div>
          <div className="text-3xl font-bold text-foreground">$1.24M</div>
        </div>
        
        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-amber-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Outstanding Invoices</div>
          <div className="text-3xl font-bold text-foreground">$42,500</div>
          <div className="text-sm text-amber-500 mt-2">Across 12 pending invoices</div>
        </div>

        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-rose-500/10 rounded-full blur-xl"></div>
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-sm font-medium text-muted-foreground mb-1">Overdue Amount</div>
          <div className="text-3xl font-bold text-foreground">$8,400</div>
          <div className="text-sm text-rose-500 mt-2">Requires immediate attention</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search invoices by ID or client..."
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
                <th className="px-6 py-3 font-medium">Invoice ID</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date Issued</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_INVOICES.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-foreground">{invoice.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{invoice.client}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{invoice.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                      invoice.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      invoice.status === 'Overdue' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                      'bg-slate-500/10 text-slate-600 border-slate-500/20'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{invoice.date}</td>
                  <td className="px-6 py-4 text-muted-foreground">{invoice.dueDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 text-emerald-500 hover:text-emerald-600 font-medium">
                        View <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
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