import { motion } from "framer-motion";
import { Cpu, Database, Network, Zap, FileCode2, ShieldAlert, Briefcase, Target, ServerCog } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function Technologies() {
  const techCategories = [
    {
      title: "Security Technology",
      description: "Robust detection, protection, containment and access security.",
      icon: ShieldAlert,
      features: [
        "Cyber Security (frameworks, IAM)",
        "Digital Security (cloud environments, endpoint safety)",
        "Physical Security (smart access control, automated surveillance)"
      ],
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      title: "Operational & Industrial Technology (OT)",
      description: "Bridging heavy physical infrastructure with intelligent workflows.",
      icon: Cpu,
      features: [
        "Industrial Technology (robotics, plant data optimization)",
        "Operation Systems (real-time visibility, SCADA)",
        "Automation (intelligent workflows)"
      ],
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      title: "Business Technology",
      description: "Streamlining business operations and services for efficiency and effectiveness.",
      icon: Briefcase,
      features: [
        "Enterprise Resource Planning (ERP)",
        "Human Resources (HR Tech payroll automation)",
        "Operations (OP Tech logistics)"
      ],
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Information & Data Technology",
      description: "We turn chaotic enterprise data into structured intelligence by designing secure, scalable cloud ecosystems and zero-trust architectures.",
      icon: Database,
      features: [
        "Information Technology (IT core networks)",
        "Big Data",
        "Data Analytics",
        "Data Science"
      ],
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      title: "Emerging Technology",
      description: "Future-proofing enterprise environments with intelligent systems.",
      icon: Zap,
      features: [
        "Artificial Intelligence (Predictive analytics models)",
        "Digital Transformation & Digitization",
        "IoT & IIoT"
      ],
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "Technology Consulting Services",
      description: "Agnostic technology consultation services providing comprehensive strategic guidance and architectural blueprints.",
      icon: FileCode2,
      features: [
        "IT Strategy & Transformation",
        "Enterprise Resource Planning (ERP)",
        "Cloud & Infrastructure Consulting",
        "Cybersecurity & Risk Management",
        "Custom Software Advisory"
      ],
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    }
  ];

  const executionPillars = [
    {
      title: "Project Management",
      desc: "End-to-end delivery using Agile/PMI frameworks, structured lifecycle planning, and budget control."
    },
    {
      title: "Implementations & Support",
      desc: "Turnkey platform engineering, cross-border installations, and SLA-managed technical support."
    },
    {
      title: "Governance",
      desc: "ICT and digital framework design, enterprise alignment advisory, and compliance auditing."
    },
    {
      title: "Risk Management",
      desc: "Cyber-threat mitigation matrices, quantitative risk exposure profiling, and business continuity safeguarding."
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <Network className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Our Technologies</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Extensive Solutions <span className="text-emerald-500">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mapping out our core categories from robust security technology to intelligent emerging systems and agnostic technology consulting services.
          </p>
        </div>
      </section>

      {/* Tech Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCategories.map((category, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-border rounded-2xl bg-card backdrop-blur-sm relative overflow-hidden group flex flex-col h-full"
              >
                {/* Decorative background glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity ${category.bg}`}></div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${category.bg} ${category.border}`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1 text-sm">{category.description}</p>
                
                <div className="space-y-3 mb-8">
                  {category.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${category.bg.replace('/10', '')}`}></div>
                      <span className="text-sm font-medium text-muted-foreground leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full bg-muted/20 hover:bg-accent border-border text-foreground mt-auto">
                  View Solutions
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Execution Pillars */}
      <section className="py-24 px-4 border-t border-border bg-muted/20 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
              <Target className="h-3 w-3 text-amber-500" />
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Consulting Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">Strategic Execution Pillars</h2>
            <p className="text-muted-foreground text-lg">
              Our consulting services are driven by four core pillars ensuring seamless end-to-end delivery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executionPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-card border border-border rounded-xl hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-emerald-500 font-black text-xl opacity-30">0{idx + 1}</div>
                  <h3 className="font-bold text-foreground">{pillar.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Call to Action */}
      <section className="py-24 px-4 border-t border-border bg-emerald-950/20">
        <div className="container mx-auto max-w-4xl text-center">
          <ServerCog className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Transform Raw Information into Competitive Advantage</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto text-balance">
            We eliminate system downtime and protect your vital data assets without slowing down daily productivity. Engage our experts for a comprehensive architectural blueprint.
          </p>
          <Button size="lg" className="px-8 bg-emerald-600 hover:bg-emerald-500 text-white">
            <FileCode2 className="mr-2 h-4 w-4" />
            Request Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}

