import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { CheckCircle, User, Lock, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }

    if (formData.displayName.length < 5) {
      setError("Name should be greater than 4 letters");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signupUser({
        displayName: formData.displayName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log("Signup successful:", result);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50 flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-gradient-to-br from-cyan-600 to-blue-700 text-white">
        <div className="max-w-lg">
          <div className="flex items-center mb-8">
            <div className="bg-white text-cyan-600 p-2 rounded-lg shadow-md">
              <div className="h-6 w-6 flex items-center justify-center font-bold">
                +
              </div>
            </div>
            <h1 className="ml-3 font-bold text-2xl tracking-tight">Medisure</h1>
          </div>

          <h2 className="text-4xl font-bold mb-6">
            Welcome to your healthcare dashboard
          </h2>
          <p className="text-cyan-100 text-lg mb-10">
            Access your medical records, view test results, and manage patient
            care all in one secure platform.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-cyan-500 bg-opacity-30 p-2 rounded-lg mr-4">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Secure Access</h3>
                <p className="text-cyan-100 text-sm">
                  Advanced encryption and security protocols to protect patient
                  data
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-cyan-500 bg-opacity-30 p-2 rounded-lg mr-4">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">Centralized Records</h3>
                <p className="text-cyan-100 text-sm">
                  All patient information and test results available in one
                  place
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-cyan-500 bg-opacity-30 p-2 rounded-lg mr-4">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium mb-1">AI-Powered Analysis</h3>
                <p className="text-cyan-100 text-sm">
                  Advanced algorithms to help with diagnosis and patient care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="lg:w-1/2 flex justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-800">Create your Medisure account</h2>

              <p className="text-slate-500 mt-2">
                Enter your credentials to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="doctor@hospital.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2 flex justify-between"
                  >
                    <span>Password</span>
                    <a
                      href="#"
                      className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
                    >
                      Forgot password?
                    </a>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="submit"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    className={`flex items-center justify-center w-5 h-5 rounded mr-2 transition-all focus:outline-none ${
                      rememberMe
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                        : "border border-slate-300 bg-white"
                    }`}
                    onClick={() => setRememberMe(!rememberMe)}
                  >
                    {rememberMe && (
                      <CheckCircle size={12} className="text-white" />
                    )}
                  </button>
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-slate-600"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                <div>
                  <button
                    type="button"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing up..." : "Sign up"}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:text-cyan-700"
                >
                  Request access
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-cyan-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-cyan-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
