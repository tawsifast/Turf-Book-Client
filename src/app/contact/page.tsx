"use client";

import { useState, type FormEvent } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      {submitted ? (
        <p className="text-emerald-600">Thanks for reaching out! We'll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2"
            required
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 h-32"
            required
          />
          <button type="submit" className="bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}