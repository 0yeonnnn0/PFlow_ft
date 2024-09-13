import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { register } from "../services/userAPIs";
import { useNavigate } from "react-router-dom";

const StepByStepSignUpForm = ({ setUserData }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setError(null);
    setMessage("null");
    try {
      await register(formData.email, formData.password, formData.username);
      setMessage("Account created successfully!");
      setUserData({ email: formData.email, username: formData.username });
      navigate("/signupsuccess");
    } catch (err) {
      console.error(err);
      setError(err);
    }
    // Here you would typically send the data to your backend
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="email" {...fadeInUp}>
            <label
              htmlFor="email"
              className="text-sm font-medium text-white mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="password" {...fadeInUp}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="username" {...fadeInUp}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center p-20 items-center min-h-full">
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-xl text-white">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create Your Account
        </h2>

        {/* Progress indicator with animated lines */}
        <div className="flex justify-between mb-8 relative">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
              <div className="text-xs mt-1">
                {step === 1 ? "Email" : step === 2 ? "Password" : "Username"}
              </div>
            </div>
          ))}
          {/* Animated lines */}
          <div className="absolute top-4 left-0 w-11/12 h-0.5 bg-gray-200">
            <motion.div
              className="h-full bg-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep - 1) * 50}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          <motion.div {...fadeInUp}>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep < 3 ? "Continue" : "Create account"}
            </button>
          </motion.div>
        </form>

        <p className="mt-4 text-xs text-center text-gray-500">
          By creating an account, you agree to our
          <a href="#" className="text-indigo-600 hover:underline">
            {" "}
            Terms of Service
          </a>
          . For more information about our privacy practices, see our
          <a href="#" className="text-indigo-600 hover:underline">
            {" "}
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default StepByStepSignUpForm;
