// pages/settings-preferences.js
"use client";

// pages/settings-preferences.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Header from '@/components/header';
import Footer from "@/components/footer"
export default function SettingsPreferences() {
  const [marketingCommunications, setMarketingCommunications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('Nigerian Naira ₦');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  // Language options
  const languages = ['English', 'French', 'Spanish', 'German', 'Chinese'];
  
  // Currency options
  const currencies = [
    'Nigerian Naira ₦',
    'US Dollar $',
    'Euro €',
    'British Pound £',
    'Japanese Yen ¥'
  ];

  // Apply dark mode to the document when the state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageOpen || currencyOpen) {
        const dropdowns = document.querySelectorAll('.custom-dropdown');
        let shouldClose = true;
        
        dropdowns.forEach(dropdown => {
          if (dropdown.contains(event.target)) {
            shouldClose = false;
          }
        });
        
        if (shouldClose) {
          setLanguageOpen(false);
          setCurrencyOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [languageOpen, currencyOpen]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-6 transition-colors duration-200`}>
        <div className='mb-12'>
                          <Header />
                   
                          </div>
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center text-sm mb-6">
          <Link href="/" className={`flex items-center ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home

          </Link>
          <span className="mx-2 text-gray-400"> &gt; </span>

          <Link href="/profile" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            Profile
          </Link>
          <span className="mx-2 text-gray-400"> &gt; </span>

          <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium`}>Settings & Preferences</span>
        </nav>

        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Settings & Preferences</h1>

        {/* Notifications Section */}
        <section className="mb-8">
          <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Notifications</h2>
          
          <div className="flex items-center justify-between py-4">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Send me marketing communications on various deals and prices</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={marketingCommunications} 
                  onChange={() => setMarketingCommunications(!marketingCommunications)}
                />
                <div className={`w-10 h-6 ${marketingCommunications ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${marketingCommunications ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Send me notifications on my bookings and reservations</p>
            </div>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={bookingNotifications} 
                  onChange={() => setBookingNotifications(!bookingNotifications)}
                />
                <div className={`w-10 h-6 ${bookingNotifications ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${bookingNotifications ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>
        </section>

        {/* Language Section */}
        <section className="mb-8">
          <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Language</h2>
          <div className="custom-dropdown relative w-full md:w-60">
            <button
              type="button"
              className={`flex justify-between items-center w-full px-4 py-3 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-700'
              } border rounded`}
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <span>{language}</span>
              <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>
            
            {languageOpen && (
              <div className={`absolute z-10 w-full mt-1 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } border rounded shadow-lg`}>
                <ul>
                  {languages.map((lang) => (
                    <li 
                      key={lang}
                      className={`px-4 py-2 cursor-pointer ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'
                      } ${language === lang ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                      onClick={() => {
                        setLanguage(lang);
                        setLanguageOpen(false);
                      }}
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Currency Section */}
        <section className="mb-8">
          <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Currency</h2>
          <div className="custom-dropdown relative w-full md:w-60">
            <button
              type="button"
              className={`flex justify-between items-center w-full px-4 py-3 ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-700'
              } border rounded`}
              onClick={() => setCurrencyOpen(!currencyOpen)}
            >
              <span>{currency}</span>
              <ChevronDown className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} />
            </button>
            
            {currencyOpen && (
              <div className={`absolute z-10 w-full mt-1 ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              } border rounded shadow-lg`}>
                <ul>
                  {currencies.map((curr) => (
                    <li 
                      key={curr}
                      className={`px-4 py-2 cursor-pointer ${
                        darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'
                      } ${currency === curr ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyOpen(false);
                      }}
                    >
                      {curr}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Display Mode Section */}
        <section className="mb-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Dark Mode</p>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={darkMode} 
                    onChange={toggleDarkMode}
                  />
                  <div className={`w-10 h-6 ${darkMode ? 'bg-green-500' : 'bg-gray-300'} rounded-full shadow-inner transition-colors`}></div>
                  <div className={`absolute left-0 top-0 bg-white w-6 h-6 rounded-full shadow transform transition-transform ${darkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </div>
            
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Light Mode</p>
            </div>
          </div>
        </section>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-6 right-6">
        <button className={`${darkMode ? 'bg-blue-600' : 'bg-gray-800'} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:opacity-90`}>
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
        <div className='mt-12'>
                          <Footer />
                   
                          </div>
    </div>
  );
}