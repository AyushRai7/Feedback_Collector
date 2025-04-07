"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Moon, Sun, X } from "lucide-react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [viewFeedbacks, setViewFeedbacks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields before submitting.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/submit-feedback", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadFeedbacks = async () => {
    if (viewFeedbacks) {
      setViewFeedbacks(false);
    } else {
      const res = await axios.get("/api/feedbacks");
      setFeedbacks(res.data);
      setViewFeedbacks(true);
    }
  };

  const closeFeedbacks = () => {
    setViewFeedbacks(false);
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-500 to-purple-600"
      }`}
    >
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-800 shadow-md hover:bg-gray-200"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`shadow-2xl rounded-2xl p-8 w-full max-w-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          Feedback
        </h1>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className={`w-full p-2 placeholder-gray-400 border-b-2 border-gray-300 mb-6 focus:outline-none focus:border-purple-500 bg-transparent ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className={`w-full p-2 placeholder-gray-400 border-b-2 border-gray-300 mb-6 focus:outline-none focus:border-purple-500 bg-transparent ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          className={`w-full p-2 placeholder-gray-400 border-b-2 border-gray-300 mb-6 focus:outline-none focus:border-purple-500 bg-transparent ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        ></textarea>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition-opacity duration-300"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        <button
          onClick={loadFeedbacks}
          className="mt-4 w-full text-sm text-blue-500 underline hover:text-purple-500 transition-colors"
        >
          {viewFeedbacks ? "Hide Feedback" : "View Submitted Feedback"}
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-6 bg-green-500 text-white px-6 py-2 rounded-xl shadow-lg z-50"
          >
            Feedback submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {viewFeedbacks && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-6 w-full max-w-xl rounded-2xl shadow-xl p-6 relative ${
            darkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <button
            onClick={closeFeedbacks}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <X size={18} className={darkMode ? "text-white" : "text-black"} />
          </button>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            All Feedbacks
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {feedbacks.map((fb, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg shadow-sm relative ${
                  darkMode
                    ? "bg-gray-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="font-semibold">
                    {fb.name} ({fb.email})
                  </p>
                  <p className="text-xs opacity-70 whitespace-nowrap ml-4 mt-1">
                    {new Date(fb.created_at).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="mt-1">{fb.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <footer className="mt-10 text-sm text-white opacity-80">
        Developed by AYUSH RAI | Feedback Project Submission
      </footer>
    </main>
  );
}
