import { useState } from "react";
import { Search, Plus, Filter, LayoutGrid, List, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const MOCK_PROJECTS = [
  { id: 1, name: "Enterprise Cloud Migration", client: "Acme Corp", status: "In Progress", progress: 65, dueDate: "2026-7-3", team: ["SM", "RM"] },
  { id: 2, name: "Security Audit Q4", client: "Global Tech", status: "Planning", progress: 10, dueDate: "2026-7-3", team: ["SM", "RM"] },
  { id: 3, name: "Network Infrastructure Upgrade", client: "Stark Industries", status: "Completed", progress: 100, dueDate: "2026-7-3", team: ["SM", "RM"] },
  { id: 4, name: "AI Integration Pilot", client: "Wayne Enterprises", status: "In Progress", progress: 40, dueDate: "2026-7-3", team: ["SM", "RM"] },
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and track your ongoing engagements.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card border border-border p-4 rounded-xl">
        <div className="flex items-center gap-6 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <div className="flex items-center gap-2 min-w-max">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">Planning (12)</span>
          </div>
          <div className="flex items-center gap-2 min-w-max">
            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
            <span className="text-sm text-muted-foreground">In Progress (24)</span>
          </div>
          <div className="flex items-center gap-2 min-w-max">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-muted-foreground">Completed (156)</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-4 text-sm text-foreground focus-visible:outline-none focus-visible:border-emerald-500/50"
            />
          </div>
          <Button variant="outline" size="icon" className="shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-xl p-5 hover:border-emerald-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                  project.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                  'bg-blue-500/10 text-blue-600 border-blue-500/20'
                }`}>
                  {project.status}
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="font-bold text-foreground text-lg leading-tight mb-1">{project.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{project.client}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      project.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <div key={i} className="h-7 w-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-medium text-foreground">
                      {member}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {project.dueDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3 font-medium">Project Name</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium w-48">Progress</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_PROJECTS.map((project) => (
                <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{project.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{project.client}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                      project.status === 'In Progress' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                      'bg-blue-500/10 text-blue-600 border-blue-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            project.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`} 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground w-8 text-right">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {project.dueDate}
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
      )}
    </div>
  );
}