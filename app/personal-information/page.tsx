// pages/index.tsx
"use client";
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { User, MapPin, Edit2, MessageCircle, Save, X, CheckCircle, Upload } from 'lucide-react';
import Header from '@/components/header';
import Footer from "@/components/footer"
interface PersonalInfo {
  name: string;
  email: string;
  title: string;
  dob: string;
  country: string;
  nationality: string;
  gender: string;
  languages: string;
  petOwner: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  phone: string;
  emergency: string;
  visited: string;
  wantToVisit: string;
  hobbies: string;
  about: string;
}

interface VerificationInfo {
  docType: string;
  idNumber: string;
  file: File | null;
  isVerified: boolean;
}

export default function Home() {
  const [viewStyle, setViewStyle] = useState<'normal' | 'dotted'>('normal');

  // Original personal info state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: 'Sarah Philips',
    email: 'sarah@xyz.com',
    title: 'Certified Wanderer',
    dob: '24 Dec 1992',
    country: 'United States of America',
    nationality: 'American',
    gender: 'Female',
    languages: 'English, French, Portuguese',
    petOwner: 'Yes',
    address: '1623 Ocean Ave',
    state: 'California',
    city: 'San Francisco',
    zipcode: 'LA23456',
    phone: '+23481234567890',
    emergency: '+2348012345678',
    visited: 'Nigeria, Ghana, South Africa, Mali, Egypt',
    wantToVisit: 'Tanzania, France, Vancouver',
    hobbies: 'Skating, Hiking, Cooking, Animals, Photography',
    about: `Hi, I'm Sarah Philips! 👋🌎

By day, I'm a business traveler, hopping from one meeting to another, sealing deals and chasing success. But once the work is done? I trade boardrooms for bustling markets, skyscrapers for safari plains, and conference calls for cultural deep dives!

Africa is my playground—I've sipped coffee in Ethiopia, danced to Afrobeat in Lagos, hiked the Table Mountain in Cape Town, and bargained like a pro in Marrakech. Every trip is a new story, every destination a fresh adventure.

I don't just travel; I collect experiences, flavors, and friendships. Who says business and pleasure don't mix? 🤩`,
  });
  
  // Keep track of original values for cancel functionality
  const [originalInfo, setOriginalInfo] = useState<PersonalInfo>({...personalInfo});
  
  // Verification info state
  const [verificationInfo, setVerificationInfo] = useState<VerificationInfo>({
    docType: 'International Passport',
    idNumber: '',
    file: null,
    isVerified: true
  });
  
  // State for tracking changes and UI states
  const [isEditing, setIsEditing] = useState(false);
  const [isInfoChanged, setIsInfoChanged] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setPersonalInfo(prev => {
      const updated = { ...prev, [name]: value };
      // Check if anything has changed compared to original
      setIsInfoChanged(JSON.stringify(updated) !== JSON.stringify(originalInfo));
      return updated;
    });
  }

  function handleVerificationChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setVerificationInfo(prev => ({
      ...prev,
      [name]: value
    }));
    setIsInfoChanged(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setVerificationInfo(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
      setIsInfoChanged(true);
    }
  }

  function handleEditClick() {
    // Save current state before editing in case user cancels
    setOriginalInfo({...personalInfo});
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
    // Update original info with the new values
    setOriginalInfo({...personalInfo});
    setIsInfoChanged(false);
    // Show success message
    handleSaveSuccess();
  }

  function handleCancel() {
    // Revert to original values
    setPersonalInfo({...originalInfo});
    setIsEditing(false);
    setIsInfoChanged(false);
  }

  function handleVerify() {
    // Mock verification process
    if (verificationInfo.idNumber && verificationInfo.docType) {
      setVerificationInfo(prev => ({
        ...prev,
        isVerified: true
      }));
      setIsInfoChanged(true);
    }
  }

  function handleSaveChanges() {
    // Save both personal info and verification info
    setOriginalInfo({...personalInfo});
    setIsInfoChanged(false);
    handleSaveSuccess();
    
    // Here you would typically make an API call to save the data
    console.log("Saving data:", { personalInfo, verificationInfo });
  }
  
  function handleSaveSuccess() {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
  <div className='mb-12'>
        <Header />
 
        </div>
<div className={`py-3 px-4 flex items-center border-b ${viewStyle === 'dotted' ? 'border-blue-100' : 'border-gray-100'}`}>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
        
                  <Home size={18} />
        
                </Link>
                <span className="text-sm text-gray-500 hover:text-black cursor-pointer">Home</span>
        
                <span className="mx-2 text-gray-400">&gt;</span>
                <Link href="/profile" className="text-gray-500 hover:text-black">
                  <span className="text-sm">Profile</span>
                </Link>
                <span className="mx-2 text-gray-400">&gt;</span>
                <span className="text-sm font-medium">Reservations & Trips</span>
              </div>

      <Head>
        
        <title>Personal Information</title>
        <meta name="description" content="Personal information profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-8">Personal Information</h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <div className="w-24 h-24 rounded-full bg-yellow-200 flex items-center justify-center overflow-hidden">
                <span className="text-4xl">👩🏽</span>
              </div>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1 flex justify-between">
                <div>
                  {isEditing ? (
                    <input
                      name="name"
                      value={personalInfo.name}
                      onChange={handleChange}
                      className="border p-2 rounded w-full text-xl font-semibold"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-slate-800">{personalInfo.name}</h2>
                  )}
                  {isEditing ? (
                    <input
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handleChange}
                      className="border p-1 rounded w-full text-sm text-slate-500"
                    />
                  ) : (
                    <p className="text-sm text-slate-500">{personalInfo.email}</p>
                  )}
                  {isEditing ? (
                    <input
                      name="title"
                      value={personalInfo.title}
                      onChange={handleChange}
                      className="border p-1 rounded w-full text-sm text-amber-500"
                    />
                  ) : (
                    <p className="text-sm text-amber-500">{personalInfo.title}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>  
                      <button
                        onClick={handleSave}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm bg-green-600 text-white hover:bg-green-500"
                      >
                        <Save className="w-4 h-4 mr-2" /> Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-500"
                      >
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditClick}
                      className="inline-flex items-center py-1 px-11 rounded-md text-sm font-bold bg-slate-800 text-white hover:bg-amber-500"
                    >
                      <Edit2 className="w-8 h-4 mr-2" /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(personalInfo).filter(([key]) => [
              'dob','country','nationality','gender','languages','petOwner','address',
              'state','city','zipcode','phone','emergency','visited','wantToVisit'
            ].includes(key)).map(([key, value]) => (
              <InfoItem
                key={key}
                label={formatLabel(key)}
                name={key}
                value={value}
                editing={isEditing}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Hobbies & Interests</h3>
            {isEditing ? (
              <input
                name="hobbies"
                value={personalInfo.hobbies}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p className="text-slate-600">{personalInfo.hobbies}</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                name="about"
                value={personalInfo.about}
                onChange={handleChange}
                rows={6}
                className="border p-2 rounded w-full whitespace-pre-wrap"
              />
            ) : (
              <div className="text-slate-600 whitespace-pre-wrap">
                {personalInfo.about}
              </div>
            )}
          </div>

          {/* Identity Verification Section */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <div className="mb-6 relative">
              {saveSuccess && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-100 bg-opacity-75 rounded-md">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Changes saved successfully!</span>
                  </div>
                </div>
              )}
              <button 
                onClick={handleSaveChanges}
                disabled={!isInfoChanged}
                className={`w-full py-3 px-4 ${
                  isInfoChanged 
                    ? 'bg-amber-500 hover:bg-amber-600 cursor-pointer' 
                    : 'bg-amber-300 cursor-not-allowed'
                } text-white font-medium rounded-md transition-colors`}
              >
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label htmlFor="docType" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification
                  </label>
                  <div className="relative">
                    <select
                      id="docType"
                      name="docType"
                      value={verificationInfo.docType}
                      onChange={handleVerificationChange}
                      className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none pr-10"
                    >
                      <option value="International Passport">International Passport</option>
                      <option value="Driver's License">Driver's License</option>
                      <option value="National ID">National ID</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Number
                  </label>
                  <input
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    value={verificationInfo.idNumber}
                    onChange={handleVerificationChange}
                    placeholder="Placeholder"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">Status</p>
                </div>

                <button
                  onClick={handleVerify}
                  className="w-full py-2 px-4 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 transition-colors"
                >
                  Verify
                </button>
              </div>

              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-full">
                      <p className="text-sm font-medium text-right text-gray-700">
                        {verificationInfo.file ? verificationInfo.file.name : 'No file selected'}
                      </p>
                      <p className="text-xs text-right text-gray-500">File must be .jpg or .pdf and not more than 5MB</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                      Browse
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-8 flex items-center">
                  <div className="flex-1 text-right">
                    <p className="font-medium">Identity Verified</p>
                  </div>
                  <div className="ml-2 text-amber-500">
                    <div className="relative">
                      <CheckCircle className="w-6 h-6 fill-current" />
                      <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border border-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button 
          className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-800"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function formatLabel(key: string) {
  const map: Record<string,string> = {
    dob: 'Date of Birth', country: 'Country of Residence', nationality: 'Nationality',
    gender: 'Gender', languages: 'Spoken Languages', petOwner: 'Pet Owner',
    address: 'Address', state: 'State', city: 'City', zipcode: 'Zip Code',
    phone: 'Phone Number', emergency: 'Emergency Contact', visited: 'Countries Visited',
    wantToVisit: "Where you'd like to visit",
  };
  return map[key] || key;
}

interface InfoItemProps {
  label: string;
  name: string;
  value: string;
  editing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InfoItem = ({ label, name, value, editing, onChange }: InfoItemProps) => (
  <div>
    <h3 className="text-sm font-medium text-slate-500 mb-1">{label}</h3>
    {editing ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full text-slate-700"
      />
    ) : (
      <p className="text-slate-700">{value}</p>
    )}
      <div className='mt-12'>
            <Footer />
     
            </div>
  </div>
  
);