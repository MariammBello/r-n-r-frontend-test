// pages/help-feedback.js
"use client";

import { useState } from 'react';

import Link from 'next/link';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import Header from '@/components/header';
import Footer from "@/components/footer"


export default function HelpFeedback() {
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState('what-is-roots');
  
  // Form inputs for contact
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // FAQs data
  const faqs = [
    {
      id: 'what-is-roots',
      question: 'What is Roots & Routes?',
      answer: 'Roots & Routes is an online platform that helps travelers explore authentic African experiences by providing services like accommodation, flights, car rentals, and curated travel packages.'
    },
    {
      id: 'how-does-roots-work',
      question: 'How does Roots & Routes work?',
      answer: 'Roots & Routes connects travelers with local services and experiences across Africa. Users can search for accommodations, transportation, and activities, then book directly through our secure platform.'
    },
    {
      id: 'is-roots-available',
      question: 'Is Roots & Routes available in all African countries?',
      answer: 'Roots & Routes is continually expanding its coverage across Africa. Currently, we operate in major tourism destinations and are adding new locations regularly. Check our destination page for the most up-to-date information.'
    }
  ];

  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission here
    console.log({ name, email, message });
    alert('Your message has been sent!');
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    
    <div className="min-h-screen bg-white p-6">
        <div className='mb-12'>
        <Header />
 
        </div>

      <div className="max-w-3xl mx-auto">
      {/* <Header /> */}

        {/* Breadcrumb navigation */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <span className="mx-2 text-gray-400"> &gt; </span>
          <Link href="/profile">Profile</Link>
             <span className="mx-2 text-gray-400"> &gt; </span>

          <span className="text-gray-900 font-medium">Help & Feedback</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Help & Feedback</h1>

        {/* Search bar */}
        <div className="flex mb-6">
          <div className="relative flex-grow mr-2">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Search
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'faqs'
                  ? 'text-gray-900 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'text-gray-900 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('contact')}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* FAQs Content */}
        {activeTab === 'faqs' && (
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-gray-800 rounded-md overflow-hidden"
              >
                <button
                  className="w-full px-4 py-3 text-left flex justify-between items-center text-white font-medium"
                  onClick={() => toggleFaq(faq.id)}
                >
                  {faq.question}
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 py-3 bg-white text-gray-600 border border-gray-200 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact Us Content */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Placeholder"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Placeholder"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your message here"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Help Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700">
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      <div className='mt-12'>
        <Footer />
 
        </div>
    </div>
  );
}