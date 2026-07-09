import { MapPin, Phone, Send, ShieldAlert } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 border-b border-border bg-muted/20">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Secure Communications
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Establish an encrypted line with our engineering and sales teams. Whether you are inquiring about a new deployment, requesting technical support for existing infrastructure, or exploring partnership opportunities, our dedicated response units are ready to assist.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
          
          {/* Contact Information & Map Placeholder */}
          <div className="space-y-8">
            <div className="bg-card border border-border p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-foreground mb-6">Regional Command Centers</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Nairobi HQ (East Africa)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      Green Symbol Technology Tower<br/>
                      Westlands, Nairobi, Kenya
                    </p>
                    <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3"/> +254 700 000 000</span>
                    </div>
                  </div>
                </div>

                {/* <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-card border border-border flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Kisii, KE (East Africa)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                       Green Symbol Technology<br/>
                      Kisii, Kenya
                    </p>
                    <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3"/> +254 700 000 000</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="bg-muted/40 border border-border rounded-xl p-6 h-64 relative overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               <div className="text-center z-10">
                 <GlobeIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2 group-hover:text-emerald-500 transition-colors" />
                 <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Interactive Map Offline</span>
                 <p className="text-xs text-muted-foreground mt-1">Awaiting secure connection...</p>
               </div>
            </div>
          </div>

          {/* Contact Forms */}
          <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <ShieldAlert className="h-5 w-5 text-emerald-500/50" />
            </div>
            
            <div className="flex gap-4 mb-8 border-b border-border pb-4">
              <button className="text-sm font-bold text-emerald-400 border-b-2 border-emerald-500 pb-2">Sales Inquiry</button>
              <button className="text-sm font-bold text-muted-foreground hover:text-muted-foreground pb-2 transition-colors">Technical Support</button>
            </div>

            <form className="space-y-4 relative z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">First Name</label>
                  <input type="text" className="w-full bg-muted/40 border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Name</label>
                  <input type="text" className="w-full bg-muted/40 border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Corporate Email</label>
                <input type="email" className="w-full bg-muted/40 border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Organization / Company</label>
                <input type="text" className="w-full bg-muted/40 border border-border rounded-md h-10 px-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</label>
                <textarea rows={4} className="w-full bg-muted/40 border border-border rounded-md p-3 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"></textarea>
              </div>
              <Button className="w-full bg-emerald-500 text-black hover:bg-emerald-400 font-semibold h-12 shadow-[0_0_15px_rgba(16,185,129,0.2)] mt-2">
                <Send className="w-4 h-4 mr-2" /> Submit Transmission
              </Button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}