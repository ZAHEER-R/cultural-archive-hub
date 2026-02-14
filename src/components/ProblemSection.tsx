import { motion } from "framer-motion";
import { AlertTriangle, Clock, ShieldOff, Database, Lock } from "lucide-react";

const problems = [
  { icon: Clock, title: "Knowledge Loss", desc: "Cultural traditions disappear permanently as aging knowledge holders pass away" },
  { icon: AlertTriangle, title: "No Verification", desc: "No reliable system to authenticate cultural information and prevent misinformation" },
  { icon: ShieldOff, title: "Ownership Misuse", desc: "Cultural knowledge copied, commercialized, and exploited without credit or consent" },
  { icon: Database, title: "Fragmented Storage", desc: "No centralized archive exists; knowledge scattered across unreliable sources" },
  { icon: Lock, title: "Accessibility Gap", desc: "Limited access for learners, researchers, and future generations worldwide" },
];

export default function ProblemSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Why This <span className="text-gradient-gold">Matters</span>
          </h2>
          <p className="opacity-70 max-w-xl mx-auto">
            Cultural knowledge is disappearing at an alarming rate
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p.icon className="w-8 h-8 mx-auto mb-3 text-gold" />
              <h3 className="font-heading font-semibold mb-2 text-sm">{p.title}</h3>
              <p className="text-xs opacity-70 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
