'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { loginUser } from '@/lib/store/features/authSlice';
import { toast } from 'sonner';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      if (result.token) {
        // Token will be set as cookie by the backend
        toast.success('Login successful!');
        router.push('/');
      }
    } catch (err: any) {
      const errorMessage = err.message || error || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <form id="login-form" className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="emailOrUsername"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            id="emailOrUsername"
            placeholder="you@example.com"
            value={formData.emailOrUsername}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              Forgot?
            </a>
          </div>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-600 text-white font-semibold py-2.5 rounded-lg hover:bg-sky-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
