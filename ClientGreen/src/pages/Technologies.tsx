import { motion } from "framer-motion";
import { Shield, Cpu, Database, Network, Lock, Zap, FileCode2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Technologies() {
  const techCategories = [
    {
      title: "Security Technology",
      description: "Military-grade cybersecurity frameworks designed for enterprise environments.",
      icon: Lock,
      features: ["Zero-Trust Architecture", "Next-Gen Firewalls", "Endpoint Detection & Response (EDR)", "Identity & Access Management"],
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      title: "Industrial Technology",
      description: "Robust systems for manufacturing, mining, and critical infrastructure.",
      icon: Cpu,
      features: ["SCADA Systems", "Industrial IoT (IIoT)", "Robotic Automation", "Predictive Maintenance Algorithms"],
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      title: "Business Technology",
      description: "Scalable software infrastructure for modern organizational workflows.",
      icon: Database,
      features: ["Enterprise Resource Planning (ERP)", "High-Availability Databases", "Custom CRM Solutions", "Automated Billing Gateways"],
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Emerging Technology",
      description: "Cutting-edge innovations tailored for specific African market challenges.",
      icon: Zap,
      features: ["AI & Machine Learning", "Edge Computing", "Blockchain Ledgers", "Quantum-Resistant Cryptography"],
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <Network className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Technology Stack</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Enterprise-Grade <span className="text-emerald-500">Architecture</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of technology solutions designed to secure, automate, and scale your organizational infrastructure. We leverage the latest in cloud computing, AI, and cybersecurity to build resilient systems that stand the test of time and evolving threat landscapes.
          </p>
        </div>
      </section>

      {/* Tech Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {techCategories.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-border rounded-2xl bg-card backdrop-blur-sm relative overflow-hidden group"
              >
                {/* Decorative background glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${category.bg}`}></div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${category.bg} ${category.border}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                
                <div className="space-y-3 mb-8">
                  {category.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${category.bg.replace('/10', '')}`}></div>
                      <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full bg-muted/20 hover:bg-accent border-border text-foreground">
                  View Specifications
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Section */}
      <section className="py-24 px-4 border-t border-border bg-muted/40">
        <div className="container mx-auto max-w-4xl text-center">
          <Shield className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Strategic Consulting</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Not sure what your infrastructure requires? Our security-cleared engineers are available for comprehensive audits and architectural planning.
          </p>
          <Button size="lg" className="px-8">
            <FileCode2 className="mr-2 h-4 w-4" />
            Request Security Audit
          </Button>
        </div>
      </section>
    </div>
  );
}

