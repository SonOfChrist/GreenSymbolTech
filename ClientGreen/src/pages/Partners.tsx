import { Handshake, ShieldCheck} from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Partners() {
  const partners = [
    { name: "Palo Alto Networks", type: "Security Partner", level: "Platinum" },
    { name: "Microsoft", type: "Cloud Partner", level: "Gold" },
    { name: "AVEVA", type: "Industrial Software", level: "Certified" },
    { name: "Digital Matter", type: "IoT Hardware", level: "Authorized" },
    { name: "Universal Robots", type: "Automation", level: "Integration Partner" },
    { name: "Sunmi", type: "Business IoT", level: "Authorized" }
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
            Global Tech, <span className="text-emerald-500">Local Execution</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We collaborate with world-class technology vendors to deliver uncompromised infrastructure, fully certified and locally supported. Our strong global alliances guarantee that African enterprises benefit from top-tier security intelligence, cloud solutions, and smart hardware implementations, tailored to regional needs without compromising global standards.
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
