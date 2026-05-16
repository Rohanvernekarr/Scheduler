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
    badge: "$32 OFF",
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-8 rounded-3xl border backdrop-blur-sm ${
                plan.popular 
                  ? ' border-zinc-700' 
                  : 'border-zinc-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              {plan.badge && (
                <div className="absolute -top-4 right-8 px-3 py-1 bg-zinc-800 text-white text-xs font-bold rounded-full border border-zinc-700">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-500 ml-2">/{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-zinc-300">
                    <Check className="w-5 h-5 text-white mr-3 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-full font-medium transition-all duration-200 ${
                  plan.buttonVariant === 'solid'
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-transparent text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900'
                }`}
              >
                {plan.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
