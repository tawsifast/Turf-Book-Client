"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { RegisterFormData, FormErrors } from "@/types/auth";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(data: RegisterFormData): FormErrors {
    const newErrors: FormErrors = {};
    if (data.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    if (!data.email.includes("@")) newErrors.email = "Enter a valid email address.";
    if (data.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (data.password !== data.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Registering:", formData); // পরে backend call হবে
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(
          [
            { key: "name", type: "text", placeholder: "Full Name" },
            { key: "email", type: "email", placeholder: "Email" },
            { key: "password", type: "password", placeholder: "Password" },
            { key: "confirmPassword", type: "password", placeholder: "Confirm Password" },
          ] as const
        ).map((field) => (
          <div key={field.key}>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.key]}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors[field.key] && <p className="text-red-500 text-sm mt-1">{errors[field.key]}</p>}
          </div>
        ))}

        <button type="submit" className="bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition">
          Register
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-emerald-600 font-medium">Login</Link>
      </p>
    </div>
  );
}