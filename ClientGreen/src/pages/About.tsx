import { motion } from "framer-motion";
import { ShieldCheck, Target, Lightbulb, Users, Globe2, Network } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Company Overview</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Securing the Future of <span className="text-emerald-500">African Industries</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              •	Corporate Culture/Identity: Our Motto, Goals and more Our history – Green Symbol technology is a registered trade name of Green Symbol Africa Limited, founded in 2013 and incorporated in 2015. <br/>
              •	Our Team (Human Capital): 36 elite tech professionals and specialized regional consultants deployed for high-availability localized technical accountability.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 border-y border-border bg-card backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-border rounded-2xl bg-muted/20 hover:bg-card transition-colors group">
              <Target className="h-10 w-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower African enterprises with robust, scalable, and sovereign technology solutions that drive operational efficiency while maintaining the highest standards of cybersecurity and data integrity. We strive to be the catalyst for digital transformation, providing tailored solutions that address the unique socio-economic and technological landscapes of the regions we serve.
              </p>
            </div>
            <div className="p-8 border border-border rounded-2xl bg-muted/20 hover:bg-card transition-colors group">
              <Lightbulb className="h-10 w-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the foundational technological pillar for the next industrial revolution in Africa, setting global benchmarks in secure enterprise logic, intelligent systems, and sustainable digital infrastructure. We envision a future where African industries lead the global stage in innovation, powered by resilient, home-grown technological frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Core Values</h2>
            <p className="text-muted-foreground max-w-2xl">The operational directives that govern our engineering and business logic.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Zero Trust Integrity", desc: "Security is not an add-on; it is the foundation of every system we design.", icon: ShieldCheck },
              { title: "Radical Innovation", desc: "Deploying emerging technologies to solve complex, systemic challenges.", icon: Network },
              { title: "Sovereign Capability", desc: "Building localized expertise and infrastructure for data sovereignty.", icon: Globe2 },
            ].map((value, i) => (
              <div key={i} className="p-6 border border-border rounded-xl bg-linear-to-b from-white/5 to-transparent">
                <value.icon className="h-8 w-8 text-emerald-500 mb-4" />
                <h4 className="text-lg font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Presence */}
      <section className="py-24 px-4 border-t border-border bg-muted/40">
        <div className="container mx-auto max-w-5xl text-center">
          <Users className="h-12 w-12 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-6">Regional Footprint</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Operating across this regional nodes, providing low-latency enterprise support and localized engineering expertise throughout the continent.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Nairobi, KE', 'Tanzania, TZ', 'Rwanda, RW', 'Democratic Republic of Congo, DRC'].map((city) => (
              <div key={city} className="p-4 border border-border rounded-lg bg-card text-foreground font-mono text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-2 animate-pulse"></span>
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}