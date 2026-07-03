import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Database, Globe2, ChevronRight} from "lucide-react";
import { Link } from "react-router-dom";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        {/* Abstract Background Noise */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Enterprise Technology Solutions</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-tight text-foreground">
              Transforming <span className="text-emerald-500">African</span> <br className="hidden md:block" />
              Enterprise Logic.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              World-class technology consulting, cybersecurity, and industrial systems engineered for modern enterprises. We deliver secure, scalable frameworks that propel African businesses into the global digital arena, ensuring robustness against emerging threats.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/portal" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-base h-12 px-8 bg-emerald-500 text-black hover:bg-emerald-400 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  Access Portal (Login)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="text-sm text-muted-foreground mt-4">
              Sign up as a standard user or administrator to explore the platform.
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent z-10" />
      </section>

      {/* Partners / Trust Banner */}
      <section className="border-y border-border bg-muted/30 backdrop-blur-sm py-10 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder SVGs for logos */}
            {['Microsoft', 'Palo Alto', 'AVEVA', 'Digital Matter', 'Universal Robots'].map((partner) => (
              <div key={partner} className="text-xl font-bold font-sans tracking-tighter flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technologies Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Enterprise-Grade Architecture</h2>
            <p className="text-muted-foreground text-lg text-balance">
              We deploy scalable, secure ecosystems tailored to complex organizational requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cybersecurity Frameworks",
                desc: "Zero-trust architecture, edge protection, and automated threat response systems.",
                icon: ShieldCheck,
              },
              {
                title: "Industrial Systems",
                desc: "SCADA integration, IoT sensor networks, and robotic automation pipelines.",
                icon: Database,
              },
              {
                title: "Cloud Infrastructure",
                desc: "Hybrid cloud orchestration, serverless edge computing, and high-availability databases.",
                icon: Globe2,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors group">
                  <CardContent className="p-8 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                    <div className="pt-4 flex items-center text-primary font-medium text-sm">
                      Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-border bg-muted/40 backdrop-blur-md text-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            {[
              { label: "Enterprise Clients", value: "500+" },
              { label: "Systems Deployed", value: "1.2K" },
              { label: "Support Uptime", value: "99.9%" },
              { label: "Regional Offices", value: "12" },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tighter text-foreground">{stat.value}</div>
                <div className="text-muted-foreground font-medium text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to Scale Your Infrastructure?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book a consultation with our system architects to design a tailored digital transformation roadmap.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="h-12 px-8">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
