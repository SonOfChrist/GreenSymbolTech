import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Phone, Mail, MessageSquare, Send, ShieldAlert, Globe2, Building2, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendInquiryNotifications } from "../lib/contactNotifications";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    fullNameTitle: "",
    companyName: "",
    country: "Kenya",
    phone: "",
    email: "",
    solutionCategory: "Security Tech",
    partnerProduct: "Palo Alto",
    projectScope: ""
  });
  const [inquiryType, setInquiryType] = useState<"sales" | "support">("sales");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, solutionCategory: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      if (!formData.fullNameTitle || !formData.companyName || !formData.phone || !formData.email || !formData.projectScope) {
        throw new Error("Please complete all required fields.");
      }

      // Basic regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address.");
      }

      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error("Please enter a valid phone number (e.g. +254 700 000 000).");
      }

      if (formData.projectScope.length > 1000) {
        throw new Error("Project scope summary must be 1000 characters or less.");
      }

      const docRef = await addDoc(collection(db, "contactMessages"), {
        fullNameTitle: formData.fullNameTitle.substring(0, 100),
        companyName: formData.companyName.substring(0, 255),
        country: formData.country,
        phone: formData.phone.substring(0, 50),
        email: formData.email.substring(0, 255),
        solutionCategory: formData.solutionCategory,
        partnerProduct: formData.partnerProduct,
        projectScope: formData.projectScope.substring(0, 1000),
        inquiryType: inquiryType,
        source: "website-contact-form",
        createdAt: serverTimestamp(),
        status: "new"
      });

      await sendInquiryNotifications({
        id: docRef.id,
        fullNameTitle: formData.fullNameTitle.substring(0, 100),
        companyName: formData.companyName.substring(0, 255),
        country: formData.country,
        phone: formData.phone.substring(0, 50),
        email: formData.email.substring(0, 255),
        solutionCategory: formData.solutionCategory,
        partnerProduct: formData.partnerProduct,
        projectScope: formData.projectScope.substring(0, 1000),
        inquiryType: inquiryType,
        source: "website-contact-form",
      });

      setSubmitStatus("success");
      setFormData({
        fullNameTitle: "",
        companyName: "",
        country: "Kenya",
        phone: "",
        email: "",
        solutionCategory: "Security Tech",
        partnerProduct: "Palo Alto",
        projectScope: ""
      });
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Failed to submit transmission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 md:w-200 md:h-200 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
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
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-6 sm:p-8 rounded-2xl backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <h3 className="text-2xl font-bold text-foreground mb-8">Regional Command Centers</h3>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-5 items-start group/item">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                    <Building2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2 text-lg">Nairobi HQ (East Africa)</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      Bishop Garden Tower.<br/>
                      1st ngong avenue-upperhill, nairobi kenya.
                    </p>
                    <div className="flex flex-col gap-2 text-sm font-mono text-muted-foreground">
                      <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                        <Phone className="h-4 w-4"/> +254 722 732 602
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
              className="bg-muted/30 border border-border rounded-2xl p-6 sm:p-8 h-48 relative overflow-hidden flex flex-col items-center justify-center group"
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
            className="lg:col-span-3 bg-card border border-border rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
               <ShieldAlert className="h-6 w-6 text-emerald-500/30" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-8">Enquiry Support</h3>
            
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 border-b border-border">
              <button 
                onClick={() => setInquiryType("sales")}
                className={`text-sm font-bold pb-3 flex items-center gap-2 border-b-2 transition-colors ${inquiryType === 'sales' ? 'text-emerald-400 border-emerald-500' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
              >
                <MessageSquare className="h-4 w-4" />
                Inquiry
              </button>
              {/* <button 
                onClick={() => setInquiryType("support")}
                className={`text-sm font-bold pb-3 flex items-center gap-2 border-b-2 transition-colors ${inquiryType === 'support' ? 'text-emerald-400 border-emerald-500' : 'text-muted-foreground border-transparent hover:text-foreground'}`}
              >
                Technical Support
              </button> */}
            </div>

            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">Transmission Securely Sent</h4>
                <p className="text-muted-foreground max-w-md">
                  Your message has been encrypted and securely delivered to our team. We will establish contact shortly.
                </p>
                <Button 
                  onClick={() => setSubmitStatus("idle")} 
                  variant="outline"
                  className="mt-6"
                >
                  Send Another Transmission
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name / Corporate Title *</label>
                  <input 
                    type="text" 
                    name="fullNameTitle"
                    value={formData.fullNameTitle}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Robin M - Chief Technology Officer"
                    className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Company Name *</label>
                    <input 
                      type="text" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Country *</label>
                    <div className="relative">
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 pr-10 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50 appearance-none cursor-pointer"
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="DRC">DRC</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Phone *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      pattern="^\+?[\d\s-]{10,}$"
                      placeholder="e.g. +254 700 000 000"
                      className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                      className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Solution Category *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {["Security Tech", "Operating Tech", "Business Tech", "Emerging Tech", "Consulting"].map((category) => (
                      <label key={category} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${formData.solutionCategory === category ? 'border-emerald-500 bg-emerald-500/10' : 'border-border bg-muted/30 hover:bg-muted/50'}`}>
                        <input 
                          type="radio" 
                          name="solutionCategory" 
                          value={category}
                          checked={formData.solutionCategory === category}
                          onChange={handleRadioChange}
                          className="accent-emerald-500"
                        />
                        <span className="text-sm font-medium text-foreground">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Target Partner Product *</label>
                  <div className="relative">
                    <select 
                      name="partnerProduct"
                      value={formData.partnerProduct}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-muted/30 border border-border rounded-xl h-12 px-4 pr-10 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all hover:bg-muted/50 appearance-none cursor-pointer"
                    >
                      <option value="Palo Alto">Palo Alto Networks</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="AVEVA">AVEVA</option>
                      <option value="LinkShadow">LinkShadow</option>
                      <option value="Other">Other / Not Sure</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex justify-between">
                    <span>Project Scope Summary *</span>
                    <span className="text-muted-foreground/70 font-normal">{formData.projectScope.length}/1000</span>
                  </label>
                  <textarea 
                    rows={4} 
                    name="projectScope"
                    value={formData.projectScope}
                    onChange={handleInputChange}
                    required
                    maxLength={1000}
                    placeholder="Briefly describe your project requirements, challenges, or goals..."
                    className="w-full bg-muted/30 border border-border rounded-xl p-4 text-sm text-foreground focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none hover:bg-muted/50"
                  ></textarea>
                </div>

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {errorMessage}
                  </div>
                )}

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-14 rounded-xl text-lg mt-4 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="w-5 h-5 mr-2" /> 
                      Request Consultative Review
                    </span>
                  )}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  By submitting this form, you acknowledge our zero-trust data handling policies.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}