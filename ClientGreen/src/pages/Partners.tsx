import { Handshake, ShieldCheck, Database, Cpu, Server, LayoutGrid} from "lucide-react";
import { Button } from "@/src/components/ui/button";
// import { motion } from "framer-motion";

export default function Partners() {
  const partners = [
    { name: "Palo Alto Networks", type: "Enterprise Cyber Security frameworks and zero-trust cloud network architectures.", level: "Platinum" },
    { name: "Microsoft", type: "Resilient Business Technology solutions, cloud infrastructure via Azure, and modern workplace tools.", level: "Gold" },
    { name: "AVEVA", type: "High-performance Industrial & Operation Technology platforming, asset optimization, and digital twins.", level: "Certified" },
    { name: "Linkshadow", type: "an AI-native unified identity, Data and Network analytics platform designed to proactively mitigate sophisticated cyber threats. Positioned as a \"Visionary solution\" the platform replaces fragmented legacy monitoring with cross-domain threat correlation and real-time behavioral analytics", level: "Authorized" }
  ];

  const integrationMatrix = [
    {
      partner: "Microsoft",
      it: "Hosts business software (ERP/M365) and enterprise security logs.",
      ot: "Scales data storage pipelines for massive plant architectures.",
      analytical: "Core enterprise identity provider, cloud infrastructure, and enterprise SIEM."
    },
    {
      partner: "Palo Alto",
      it: "Secures corporate endpoints and office network boundaries.",
      ot: "Filters industrial protocols to block physical machine attacks.",
      analytical: "Network perimeter firewall, ZTNA, and automated SOAR response."
    },
    {
      partner: "LinkShadow",
      it: "Tracks corporate user logins and patterns to find insider threats.",
      ot: "Scans internal networks to catch malware attempting lateral movement.",
      analytical: "AI behavioral profiling across network, identities, and sensitive data."
    },
    {
      partner: "AVEVA",
      it: "Feeds process efficiency and cost data up to enterprise layers.",
      ot: "Connects to PLCs and hardware to monitor physical processes.",
      analytical: "Live time-series asset telemetry, digital twins, and industrial process control."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <Handshake className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Partner Ecosystem</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Global Technology, <span className="text-emerald-500">Local Execution</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We distribute, deploy, and support best-in-class ecosystems from global industry leaders
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <div key={i} className="p-6 border border-border rounded-xl bg-card backdrop-blur-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-8">
                  <div className="h-10 w-10 bg-muted/40 rounded border border-border flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-1 bg-card rounded text-emerald-400 border border-emerald-500/20">
                    {partner.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{partner.name}</h3>
                <p className="text-sm text-muted-foreground font-mono mb-4">{partner.type}</p>
                <div className="border-t border-border pt-4 flex gap-2">
                  <span className="text-[10px] uppercase text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Catalog</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <span className="text-[10px] uppercase text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Certs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Strategic Partner Integration Matrix */}
      <section className="py-24 px-4 border-t border-border bg-muted/20 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <LayoutGrid className="h-3 w-3 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold">Integration</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Strategic Partner Integration Matrix</h2>
            <p className="text-muted-foreground text-lg">
              By coordinating these four partners, organizations can secure their operations seamlessly from the IT boardroom down to the OT shop floor:
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-200">
                <thead>
                  <tr className="bg-muted/50 border-b border-border text-sm">
                    <th className="p-5 font-semibold text-foreground w-1/4">
                      Partner
                    </th>
                    <th className="p-5 font-semibold text-foreground w-1/4">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-blue-500" />
                        Enterprise Layer (IT)
                      </div>
                    </th>
                    <th className="p-5 font-semibold text-foreground w-1/4">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-amber-500" />
                        Operations Layer (OT/Middleware)
                      </div>
                    </th>
                    <th className="p-5 font-semibold text-foreground w-1/4">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-emerald-500" />
                        Analytical & Defense Role
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {integrationMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="p-5 font-bold text-foreground">
                        {row.partner}
                      </td>
                      <td className="p-5 text-sm text-muted-foreground leading-relaxed">
                        {row.it}
                      </td>
                      <td className="p-5 text-sm text-muted-foreground leading-relaxed">
                        {row.ot}
                      </td>
                      <td className="p-5 text-sm text-muted-foreground leading-relaxed">
                        {row.analytical}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Portal CTA */}
      <section className="py-24 px-4 border-t border-border bg-muted/40">
        <div className="container mx-auto max-w-4xl">
          <div className="border border-emerald-500/20 rounded-2xl p-8 md:p-12 bg-emerald-500/5 text-center relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
             <h2 className="text-3xl font-bold text-foreground mb-4 relative z-10">Become a Partner</h2>
             <p className="text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
               Access our Partner Portal for deal registration, marketing kits, technical documentation, and commission tracking.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
               <Button className="px-8 bg-emerald-500 text-black hover:bg-emerald-400 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                 Access Portal
               </Button>
               <Button variant="outline" className="px-8 border-border bg-muted/40 text-foreground hover:bg-accent">
                 Read Requirements
               </Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
