"use client";
import React, { useState } from "react";
import LoginForm from "../_components/LoginForm";
import RegisterForm from "../_components/RegisterForm";

const page = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  return (
    <>
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 text-center font-semibold border-b-2 transition-colors ${
              activeTab === "login"
                ? "text-sky-600 dark:text-sky-400 border-sky-500"
                : "text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2 text-center font-semibold border-b-2 transition-colors ${
              activeTab === "signup"
                ? "text-sky-600 dark:text-sky-400 border-sky-500"
                : "text-gray-500 dark:text-gray-400 border-transparent hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
          OR
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
      </div>
      {/* Social Logins */}
      <div className="space-y-3">
        <button className="w-full inline-flex items-center justify-center py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.3v2.84C4.02 20.44 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.3C1.47 8.88 1 10.4 1 12s.47 3.12 1.3 4.93l3.54-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4.02 3.56 2.3 6.96l3.54 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default page;
