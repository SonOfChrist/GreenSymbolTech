import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Lightbulb, Users, Globe2, Network, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Link } from "react-router-dom";

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

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">About Green Symbol Technology</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Driving <span className="text-emerald-500">Digital Transformation</span> Across Africa
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                Green Symbol Technology is a premier enterprise technology firm dedicated to bridging the gap between legacy industrial systems and next-generation cybersecurity, cloud computing, and AI architectures. 
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed">
                We specialize in transforming complex systemic challenges into streamlined, digital-first solutions that drive unparalleled operational efficiency. Our commitment to technological sovereignty ensures that our clients remain competitive and secure in a rapidly evolving global digital economy.
              </motion.p>
              <motion.div variants={fadeUp} className="pt-4">
                <Link to="/technologies"><Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                  Learn About Our Services
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button></Link>
              </motion.div>
            </div>
            
            <motion.div variants={fadeUp} className="relative">
              <div className="aspect-square md:aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden border border-border bg-muted/20 relative p-8 flex flex-col justify-between">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <ShieldCheck className="h-12 w-12 text-emerald-500 mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-4">Securing the Future of African Industries</h3>
                  <p className="text-muted-foreground">
                    By partnering with global leaders like Microsoft, Palo Alto Networks, and AVEVA, we bring world-class security, OT, and IT infrastructure to local enterprises.
                  </p>
                </div>
                
                <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-xl">
                    <div className="text-3xl font-bold text-foreground">4+</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Countries</div>
                  </div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border p-4 rounded-xl">
                    <div className="text-3xl font-bold text-foreground">6+</div>
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">Global Partners</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-4 border-y border-border bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 border border-border rounded-3xl bg-card hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
              <Target className="h-12 w-12 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To empower African enterprises with robust, scalable, and sovereign technology solutions that drive operational efficiency while maintaining the highest standards of cybersecurity and data integrity. We strive to be the catalyst for digital transformation, providing tailored solutions that address the unique socio-economic and technological landscapes of the regions we serve.
              </p>
            </div>
            
            <div className="p-10 border border-border rounded-3xl bg-card hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
              <Lightbulb className="h-12 w-12 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the foundational technological pillar for the next industrial revolution in Africa, setting global benchmarks in secure enterprise logic, intelligent systems, and sustainable digital infrastructure. We envision a future where African industries lead the global stage in innovation, powered by resilient, home-grown technological frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Core Values</h2>
            <p className="text-muted-foreground text-lg">The operational directives that govern our engineering and business logic.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Zero Trust Integrity", desc: "Security is not an add-on; it is the foundation of every system we design.", icon: ShieldCheck, color: "text-red-500" },
              { title: "Radical Innovation", desc: "Deploying emerging technologies like AI and IoT to solve complex, systemic challenges.", icon: Zap, color: "text-amber-500" },
              { title: "Sovereign Capability", desc: "Building localized expertise and infrastructure for strict data sovereignty.", icon: Globe2, color: "text-blue-500" },
              { title: "Operational Excellence", desc: "Delivering end-to-end agile projects with structured lifecycle planning and budget control.", icon: Target, color: "text-emerald-500" },
              { title: "Collaborative Partnerships", desc: "Leveraging global alliances with certified native experts to deliver uncompromised quality.", icon: Network, color: "text-purple-500" },
              { title: "Continuous Support", desc: "Providing SLA-managed technical support and cross-border installations for all clients.", icon: Users, color: "text-cyan-500" },
            ].map((value, i) => (
              <div key={i} className="p-8 border border-border rounded-2xl bg-card hover:bg-muted/30 transition-colors group">
                <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="py-24 px-4 border-t border-border bg-emerald-950/10">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/20 mb-6">
            <Globe2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Regional Presence</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 text-balance">
            Providing low-latency enterprise support and localized engineering expertise throughout the East African region.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { country: "Kenya", code: "+254 732 602" },
              { country: "Uganda", code: "+256 732 602" },
              { country: "Tanzania", code: "+253 732 602" },
              { country: "Rwanda", code: "+257 732 602" }
            ].map((region) => (
              <div key={region.country} className="p-6 border border-emerald-500/20 rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                    <span className="font-bold text-lg text-foreground">{region.country}</span>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground bg-muted py-1.5 px-3 rounded-md inline-block">
                    {region.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}