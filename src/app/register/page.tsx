"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, PersonPlus } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Description,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // লোডিং অ্যানিমেশন চালু হলো

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      console.log(user, "user");

      const { data, error } = await authClient.signUp.email({
        email: user.email as string,
        password: user.password as string,
        name: user.name as string,
        image: user.image as string,
      });

      console.log(data, error);

      if (data) {
        alert("Signup Successful!");
        router.push("/login");
      }

      if (error) {
        alert(error.message || "Signup Unsuccessful");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm">
        {/* Title Area */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Join the Squad
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create a player profile to instantly book premium arenas.
          </p>
        </div>

        {/* Hero UI Form */}
        <Form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Full Name Field */}
          <TextField
            isRequired
            name="name" // Better Auth এর অবজেক্টের সাথে মিলানোর জন্য 'name' করা হলো
            type="text"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Name
            </Label>
            <Input
              placeholder="Enter your name"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none transition"
            />
            <FieldError className="text-xs text-rose-500 font-medium mt-1" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              placeholder="Enter your email"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none transition"
            />
            <FieldError className="text-xs text-rose-500 font-medium mt-1" />
          </TextField>

          {/* Image  */}
          <TextField name="image" type="url">
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Photo URL
            </Label>
            <Input
              placeholder="Enter image url"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none transition"
            />
            <FieldError />
          </TextField>

          {/* Password Field with Strict Validation */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Password
            </Label>
            <Input
              placeholder="Enter secure password"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none transition"
            />
            <Description className="text-[11px] text-slate-400 font-medium mt-1">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-xs text-rose-500 font-medium mt-1" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={isLoading}
            className="w-full bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-900/50 text-white font-bold h-12 rounded-xl shadow-sm transition-colors duration-200 text-sm flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <PersonPlus width={14} height={14} />
                Sign Up
              </>
            )}
          </Button>
        </Form>

        {/* Footer Toggle */}
        <p className="text-center text-sm text-slate-500 pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-emerald-600 hover:underline inline-flex items-center gap-0.5"
          >
            <ArrowLeft width={14} height={14} /> Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
