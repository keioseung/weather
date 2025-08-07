import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Menu, X, Settings, User, LogOut } from 'lucide-react';
import { useWeatherStore } from '@/store/weatherStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { preferences, setPreferences } = useWeatherStore();

  const toggleTheme = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    setPreferences({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Cloud className="w-8 h-8 text-primary-600" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-primary-200 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient font-display">
                WeatherPro
              </h1>
              <p className="text-xs text-gray-600">Professional Weather SaaS</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">
              기능
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-primary-600 transition-colors">
              가격
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
              소개
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              문의
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="테마 변경"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    프로필
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    설정
                  </a>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    로그아웃
                  </button>
                </div>
              </div>
            </div>

            <button className="btn-primary">
              시작하기
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            <a href="#features" className="block text-gray-700 hover:text-primary-600">
              기능
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-primary-600">
              가격
            </a>
            <a href="#about" className="block text-gray-700 hover:text-primary-600">
              소개
            </a>
            <a href="#contact" className="block text-gray-700 hover:text-primary-600">
              문의
            </a>
            <hr />
            <div className="flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-700"
              >
                <Settings className="w-5 h-5" />
                <span>테마 변경</span>
              </button>
            </div>
            <button className="w-full btn-primary">
              시작하기
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
