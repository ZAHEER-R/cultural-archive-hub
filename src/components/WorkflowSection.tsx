import { motion } from "framer-motion";
import { UserPlus, Upload, Tag, CheckCircle, Shield, Archive } from "lucide-react";

const steps = [
  { icon: UserPlus, label: "Register", desc: "Create your account" },
  { icon: Upload, label: "Submit", desc: "Upload cultural content" },
  { icon: Tag, label: "Tag", desc: "Add metadata & details" },
  { icon: CheckCircle, label: "Verify", desc: "Expert authentication" },
  { icon: Shield, label: "Protect", desc: "Ownership registration" },
  { icon: Archive, label: "Archive", desc: "Permanent preservation" },
];

const statusBadges = [
  { label: "Pending", color: "bg-yellow-500/20 text-yellow-700" },
  { label: "Verified", color: "bg-emerald-500/20 text-emerald-700" },
  { label: "Rejected", color: "bg-red-500/20 text-red-700" },
];

export default function WorkflowSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            How It <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A streamlined workflow from submission to preservation
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border shadow-sm hover:shadow-gold transition-all duration-300 min-w-[100px]">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="font-heading font-semibold text-sm">{step.label}</p>
                <p className="text-[10px] text-muted-foreground">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block w-8 h-[2px] bg-accent/30" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          {statusBadges.map((b, i) => (
            <motion.span
              key={i}
              className={`px-4 py-2 rounded-full text-sm font-medium ${b.color}`}
              animate={b.label === "Pending" ? { scale: [1, 1.05, 1] } : b.label === "Verified" ? { boxShadow: ["0 0 0px hsl(140 50% 50% / 0)", "0 0 15px hsl(140 50% 50% / 0.3)", "0 0 0px hsl(140 50% 50% / 0)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {b.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
