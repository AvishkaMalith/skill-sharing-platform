import { useState } from "react";
import {
  Search,
  House,
  Compass,
  Calendar,
  CircleHelp,
  Menu,
  X,
} from "lucide-react";
import SignUpForm from "./SignUpForm";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [signUpFormOpen, setSignUpFormOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-10 w-full">
        <div className="max-w-7xl container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-500">
              Skill<span className="text-gray-900">Era</span>
            </h1>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-4 items-center gap-2 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-600">
            <Search className="text-blue-600" size={20} />
            <input
              type="text"
              placeholder="Search for skills, posts or people..."
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-800 flex items-center gap-2 hover:text-blue-500">
              <House /> Home
            </a>
            <a href="#" className="text-gray-800 flex items-center gap-2 hover:text-blue-500">
              <Compass /> Explore
            </a>
            <a href="#" className="text-gray-800 flex items-center gap-2 hover:text-blue-500">
              <Calendar /> Plans
            </a>
            <a href="#" className="text-gray-800 flex items-center gap-2 hover:text-blue-500">
              <CircleHelp /> Help
            </a>
            <div className="hidden md:block ml-4">
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setSignUpFormOpen(true)}
              >
                Join For Free
              </button>
            </div>
          </nav>
          <button
            className="md:hidden ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="text-red-500" size={24} /> : <Menu className="text-blue-500" size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 bg-white">
            <div className="mb-2 flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 shadow-sm">
              <Search className="text-blue-600" size={20} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="flex items-center gap-2 text-gray-800 hover:text-blue-500">
                <House /> Home
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-800 hover:text-blue-500">
                <Compass /> Explore
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-800 hover:text-blue-500">
                <Calendar /> Plans
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-800 hover:text-blue-500">
                <LifeBuoy /> Help
              </a>
              <button
                type="button"
                className="w-full mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                onClick={() => setSignUpFormOpen(true)}
              >
                Join For Free
              </button>
            </nav>
          </div>
        )}
      </header>
      {signUpFormOpen && <SignUpForm isOpen={signUpFormOpen} onClose={() => setSignUpFormOpen(false)} />}
    </>
  );
};

export default Header;
