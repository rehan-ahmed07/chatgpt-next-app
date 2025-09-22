import React from "react";

const RegisterForm = () => {
  return (
    <>
      <form id="signup-form" className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="signup-name"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            id="signup-name"
            placeholder="Marvin McKinney"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="signup-email"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="signup-email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="signup-password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="signup-password"
            placeholder="••••••••"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-600 text-white font-semibold py-2.5 rounded-lg hover:bg-sky-700 transition-colors shadow-sm"
        >
          Create Account
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
