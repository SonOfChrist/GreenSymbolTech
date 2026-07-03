import { motion } from "framer-motion";
import { Factory, HeartPulse, Building2, Zap, GraduationCap, Landmark, Wheat, Pickaxe, Train, ShoppingCart } from "lucide-react";

export default function Industries() {
  const industries = [
    { name: "Manufacturing", icon: Factory, desc: "IIoT integration, predictive maintenance, and supply chain security." },
    { name: "Healthcare", icon: HeartPulse, desc: "HIPAA-compliant data infrastructure, secure tele-health, and EHR databases." },
    { name: "Government", icon: Building2, desc: "Sovereign cloud architectures, encrypted communications, and smart city tech." },
    { name: "Energy & Utilities", icon: Zap, desc: "SCADA protection, smart grid analytics, and edge-device management." },
    { name: "Finance", icon: Landmark, desc: "Fraud detection ML, zero-trust transactional gateways, and compliance reporting." },
    { name: "Mining", icon: Pickaxe, desc: "Remote operations monitoring, autonomous vehicle networks, and safety IoT." },
    { name: "Agriculture", icon: Wheat, desc: "Precision farming data lakes, drone network security, and resource optimization." },
    { name: "Transportation", icon: Train, desc: "Fleet telematics, secure logistics tracking, and automated routing." },
    { name: "Education", icon: GraduationCap, desc: "Secure campus networks, distributed learning platforms, and student data protection." },
    { name: "Retail", icon: ShoppingCart, desc: "Secure POS systems, inventory AI, and unified customer data platforms." }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Securing <span className="text-emerald-500">Every Sector</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We provide tailored, compliant, and highly secure technology solutions designed for the unique operational demands of diverse industries. From securing critical national infrastructure to optimizing local supply chains, our frameworks ensure resilience, scalability, and absolute data sovereignty across every sector we touch.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 border border-border rounded-xl bg-card backdrop-blur-sm hover:bg-accent hover:border-emerald-500/50 transition-all group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors">
                  <ind.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{ind.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Teaser */}
      <section className="py-24 px-4 border-t border-border bg-muted/20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Proven Deployments</h2>
          <p className="text-muted-foreground mb-8">Review our sanitized architectural blueprints and deployment metrics across these sectors.</p>
          <div className="inline-flex gap-4">
             <button className="px-6 py-3 border border-border rounded-md bg-card text-foreground text-sm font-medium hover:bg-accent transition-colors">
               View Case Studies
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
