import { useState } from "react";
import { X } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const LogInForm = ({ isOpen, onClose }) => {
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      toast.success("Successfully logged in!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fadeIn scale-95">
          <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-400 to-blue-500 items-center justify-center text-white p-10">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
          </div>
          <div className="w-full md:w-1/2 p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
            <div className="space-y-3">
              <button
                onClick={loginWithGoogle}
                className="w-full py-2 bg-white border border-blue-400 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200"
              >
                <FaGoogle className="text-blue-800" size={22} />
                Log in with Google
              </button>
              <button className="w-full py-2 bg-white border border-blue-400 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
                <FaFacebook className="text-blue-800" size={22} />
                Log in with Facebook
              </button>
            </div>
            <div className="my-6 text-center text-md text-gray-500">or log in with email</div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                className="w-full border border-blue-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
              <input
                className="w-full border border-blue-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                required
              />
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    id="remember"
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default LogInForm;