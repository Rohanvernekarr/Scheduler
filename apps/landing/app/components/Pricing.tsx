"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals just getting started.",
    features: [
      "1 Calendar connection",
      "Basic booking page",
      "Standard meeting types",
      "Email support",
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline",
  },
  {
    name: "Pro Monthly",
    price: "$8",
    period: "per month",
    description: "For professionals needing advanced features.",
    features: [
      "Unlimited calendar connections",
      "Custom booking page domains",
      "Advanced meeting types",
      "Automated reminders",
      "Priority email support",
    ],
    buttonText: "Subscribe Monthly",
    buttonVariant: "solid",
    popular: true,
  },
  {
    name: "Pro Yearly",
    price: "$64",
    originalPrice: "$96",
    period: "per year",
    description: "Best value for long-term professionals.",
    features: [
      "Everything in Pro Monthly",
      "Save $32 compared to monthly",
      "24/7 Priority support",
      "Custom branding",
      "Analytics dashboard",
    ],
    buttonText: "Subscribe Yearly",
    buttonVariant: "solid",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight"
          >
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            Choose the perfect plan for your scheduling needs. Upgrade anytime as you grow.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto bg-transparent">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col p-8 rounded-3xl border backdrop-blur-md bg-zinc-950/40 transition-colors duration-500 ${
                plan.popular 
                  ? 'border-zinc-600 shadow-2xl shadow-white/5' 
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Subtle background glow on hover */}
              <div
                className={`absolute inset-0 z-[-1] rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  plan.popular ? 'bg-gradient-to-b from-zinc-800/40 to-transparent' : 'bg-gradient-to-b from-zinc-800/20 to-transparent'
                }`}
              />

              {plan.popular && (
                <motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  MOST POPULAR
                </motion.div>
              )}

              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                {/* @ts-ignore */}
                {plan.originalPrice && (
                  <span className="text-2xl font-medium text-zinc-500 line-through mr-3">
                    {/* @ts-ignore */}
                    {plan.originalPrice}
                  </span>
                )}
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-500 ml-2">/{plan.period}</span>
              </div>

              <motion.ul 
                className="flex-1 space-y-4 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 + i * 0.15 } }
                }}
              >
                {plan.features.map((feature) => (
                  <motion.li 
                    key={feature} 
                    className="flex items-start text-sm text-zinc-300"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <Check className="w-5 h-5 text-white mr-3 shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 px-6 rounded-full font-medium transition-colors duration-200 mt-auto ${
                  plan.buttonVariant === 'solid'
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-transparent text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900'
                }`}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
