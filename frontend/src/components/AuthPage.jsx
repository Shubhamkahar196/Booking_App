import { useState, useEffect } from "react";
import { MessageBox } from "./MessageBox";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

/**
 * Shared Auth form for login and signup
 * @param {{ mode: "login" | "signup", theme: string, onLoginSuccess: (user: object) => void }} props
 */
const Auth = ({ mode = "login", theme, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const isDarkMode = theme === "dark";
  const { postData } = useApi();
  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/auth/session", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const user = await res.json();
          onLoginSuccess(user);
          navigate("/");
        }
      } catch (err) {
        // user not logged in, do nothing
      }
    };
    checkSession();
  }, [navigate, onLoginSuccess]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const url =
      mode === "login"
        ? "http://localhost:8000/api/v1/auth/login"
        : "http://localhost:8000/api/v1/auth/register";

    const payload =
      mode === "login" ? { email, password } : { username, email, password };

    try {
      const response = await postData(url, payload);

      const user = response.user || { username };
      onLoginSuccess(user);

      setMessage({
        text: `${mode === "login" ? "Login" : "Signup"} successful!`,
        type: "success",
      });

      navigate("/"); // redirect to dashboard
    } catch (err) {
      setMessage({
        text: err.message || "Authentication failed.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const textColorClass = isDarkMode ? "text-white" : "text-gray-900";
  const inputClass = `w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 transition duration-300 ${
    isDarkMode
      ? "bg-slate-700 text-white border-slate-600"
      : "bg-gray-100 text-gray-900 border-gray-300"
  }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`relative w-full max-w-md p-8 rounded-xl shadow-2xl transition-colors duration-300 ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        {message && (
          <MessageBox
            message={message.text}
            type={message.type}
            onClose={() => setMessage(null)}
          />
        )}

        <div className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold mb-2 ${textColorClass}`}>
            {mode === "login" ? "Welcome Back!" : "Join Us!"}
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            {mode === "login"
              ? "Sign in to your account"
              : "Create a new account"}
          </p>
        </div>

        {/* form */}
        <form className="space-y-4" onSubmit={handleAuth}>
          {mode === "signup" && (
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User size={18} />
              </span>
              <input
                type="text"
                className={inputClass}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              className={inputClass}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className={`${inputClass} pr-10`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <p className={`${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              onClick={() =>
                navigate(mode === "login" ? "/auth/signup" : "/auth/login")
              }
              className="ml-1 text-indigo-500 font-medium hover:text-indigo-400 transition-colors duration-300"
            >
              {mode === "login" ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
