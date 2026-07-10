import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Phone, Mail, MessageSquare, Send, ShieldAlert, Globe2, Building2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Contact() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Mail className="h-3 w-3 text-emerald-400" />
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Encrypted Comms</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Secure <span className="text-emerald-500">Communications</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Establish a direct line with our engineering and sales teams. Whether you are inquiring about a new deployment, requesting technical support, or exploring alliances.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-5 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <h3 className="text-2xl font-bold text-foreground mb-8">Nairobi HQ (East Africa)</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-5 items-start group/item">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Building2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2 text-lg">Nairobi HQ</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Green Symbol Technology Tower<br/>
                      Westlands, Nairobi, Kenya
                    </p>
                    <div className="flex flex-col gap-2 text-sm font-mono text-muted-foreground">
                      <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                        <Phone className="h-4 w-4"/> +254 732 602 000
                      </span>
                      <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                        <Mail className="h-4 w-4"/> support@greensymboltechnology.com
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-muted/30 border border-border rounded-2xl p-8 h-48 relative overflow-hidden flex flex-col items-center justify-center group"
            >
               <div className="absolute inset-0 bg-emerald-950/20"></div>
               <div className="text-center z-10 space-y-3">
                 <Globe2 className="h-10 w-10 text-emerald-500 mx-auto group-hover:scale-110 transition-transform duration-500" />
                 <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block">Global Network Status</span>
                 <p className="text-sm font-bold text-emerald-400">● 48 Nodes Online</p>
               </div>
            </motion.div>
          </div>

          {/* Contact Forms */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
               <ShieldAlert className="h-6 w-6 text-emerald-500/30" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-8">Initiate Transmission</h3>
            
            <div className="flex gap-6 mb-8 border-b border-border">
              <button className="text-sm font-bold text-emerald-400 border-b-2 border-emerald-500 pb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Sales Inquiry
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground pb-3 transition-colors">
                {/* Technical Support */}
              </button>
            </div>

            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                  <input type="text" className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                  <input type="text" className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Corporate Email</label>
                <input type="email" className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Organization / Company</label>
                <input type="text" className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Secure Message</label>
                <textarea rows={5} className="w-full bg-muted/30 border border-border rounded-xl p-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none hover:bg-muted/50"></textarea>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-14 rounded-xl text-lg mt-4">
                <Send className="w-5 h-5 mr-2" /> 
                Submit Transmission
              </Button>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                By submitting this form, you acknowledge our zero-trust data handling policies.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}