"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@gravity-ui/icons";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true); // লোডিং অ্যানিমেশন চালু হলো
  
      try {
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
  
        console.log(user, "user");
  
        const { data, error } = await authClient.signIn.email({
          email: user.email as string,
          password: user.password as string,
        });
  
        console.log(data, error);
  
        if (data) {
          alert("Signin Successful!");
          router.push("/");
        }
  
        if (error) {
          alert(error.message || "Signin Unsuccessful");
        }
      } catch (err) {
        console.error(err);
        alert("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-sm">
        
        {/* Title Area */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to book your favorite slots and manage matches.
          </p>
        </div>

        {/* Hero UI Form */}
        <Form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
          
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
            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</Label>
            <Input 
              placeholder="john@example.com" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none transition"
            />
            <FieldError className="text-xs text-rose-500 font-medium mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <div className="flex justify-between items-center">
              <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</Label>
              <a href="#" className="text-xs font-semibold text-emerald-600 hover:underline">Forgot?</a>
            </div>
            <Input 
              placeholder="Enter your password" 
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-3 rounded-xl focus:outline-none transition"
            />
            <FieldError className="text-xs text-rose-500 font-medium mt-1" />
          </TextField>

          {/* Submit button */}
          <Button
            type="submit"
            // disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-900/50 text-white font-bold h-12 rounded-xl shadow-sm transition-colors duration-200 text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                {/* <Enter size={16} /> */}
                Sign In
              </>
            )}
          </Button>
        </Form>

        {/* Footer Toggle */}
        <p className="text-center text-sm text-slate-500 pt-2">
          Don`t have an account?{" "}
          <Link href="/register" className="font-bold text-emerald-600 hover:underline inline-flex items-center gap-0.5">
            Create an account <ArrowRight width={14} height={14} />
          </Link>
        </p>

      </div>
    </div>
  );
}