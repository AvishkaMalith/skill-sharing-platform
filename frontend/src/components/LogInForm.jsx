import { useState } from "react";

import { X } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const LogInForm = ({ isOpen, onClose }) => {

  const [signUpFormData, setSignUpFormData] = useState({
    userEmail: "",
    userPassword: ""
  });

  const handleFormChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpWithEmail = async (e) => {
    // Prevent from refreshing
    e.preventDefault();

  };

  const handleSignUpWithGoogle = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    (isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fadeIn scale-95">
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-400 to-blue-500 items-center justify-center text-white p-10">
          <h2 className="text-3xl font-bold">Join our community !</h2>
        </div>
        <div className="w-full md:w-1/2 p-8 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
            <X />
          </button>
          <h2 className="text-2xl font-bold mb-6">Create your account</h2>
          <div className="space-y-3">
            <button
              onClick={handleSignUpWithGoogle}
              className="w-full py-2 bg-white border border-blue-400 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
              <FaGoogle className="text-blue-800" size={22} />
              Sign up with Google
            </button>
            <button className="w-full py-2 bg-white border border-blue-400 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200">
              <FaFacebook className="text-blue-800" size={22} />
              Sign up with FaceBook
            </button>
          </div>
          <div className="my-6 text-center text-md text-gray-500">or sign up with email</div>
          <form onSubmit={handleSignUpWithEmail} className="space-y-4">
            <input
              className="w-full border border-blue-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Email"
              onChange={handleFormChange}
              name="userEmail"
              required
            />
            <input
              className="w-full border border-blue-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Password"
              onChange={handleFormChange}
              name="userPassword"
              required
            />
            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                className="mr-2 mt-1"
                required
              />
              <label>I agree to the <a href="#" className="text-blue-600 underline">terms</a></label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>)
  );
};

export default LogInForm;