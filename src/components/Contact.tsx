"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendEmailAction } from "@/app/actions/contact";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-white text-black font-semibold py-4 px-8 rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useFormState(sendEmailAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="bg-[#121212] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight text-center">
            Let's build something.
          </h2>
          <p className="text-neutral-400 text-center mb-12 text-lg">
            Have a project in mind? Enter your details below.
          </p>

          <form action={formAction} ref={formRef} className="space-y-6 bg-white/[0.03] p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md">
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-300 tracking-wide">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Krishna Singh Parihar"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-300 tracking-wide">Contact Info (Email)</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="hello@example.com"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium text-neutral-300 tracking-wide">Place (Country)</label>
              <input
                type="text"
                id="country"
                name="country"
                required
                placeholder="India"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-light"
              />
            </div>

            {state?.message && (
              <p className={`text-sm tracking-wide ${state.status === "success" ? "text-green-400" : "text-red-400"}`}>
                {state.message}
              </p>
            )}

            <div className="pt-4">
              <SubmitButton />
            </div>
            
          </form>
        </motion.div>
      </div>
    </section>
  );
}
