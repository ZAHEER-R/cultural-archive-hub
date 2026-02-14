import { motion } from "framer-motion";
import { BookOpen, Music, Palette, Heart, Utensils, Landmark, Shirt, Leaf } from "lucide-react";

const items = [
  { icon: BookOpen, label: "Folk Stories", color: "from-amber-500/20 to-orange-500/20" },
  { icon: Heart, label: "Rituals & Ceremonies", color: "from-rose-500/20 to-pink-500/20" },
  { icon: Leaf, label: "Traditional Medicine", color: "from-emerald-500/20 to-green-500/20" },
  { icon: Music, label: "Songs & Music", color: "from-blue-500/20 to-indigo-500/20" },
  { icon: Palette, label: "Dance Forms", color: "from-purple-500/20 to-violet-500/20" },
  { icon: Shirt, label: "Craft Techniques", color: "from-teal-500/20 to-cyan-500/20" },
  { icon: Utensils, label: "Cuisine", color: "from-yellow-500/20 to-amber-500/20" },
  { icon: Landmark, label: "Architecture", color: "from-stone-500/20 to-gray-500/20" },
];

export default function CategoriesSection() {
  return (
    <section id="about" className="py-20 bg-gradient-earth">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            Intangible Cultural Heritage
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Globally recognized and protected by UNESCO
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`group p-6 rounded-xl bg-gradient-to-br ${item.color} border cursor-pointer transition-all duration-300 hover:shadow-gold hover:-translate-y-1`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ rotateY: 10, rotateX: 5 }}
              style={{ perspective: "1000px" }}
            >
              <item.icon className="w-8 h-8 mb-3 text-accent group-hover:scale-110 transition-transform" />
              <p className="font-medium text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
