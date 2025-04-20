// pages/index.tsx
import { useState } from 'react';
import Head from 'next/head';
import { User, MapPin, Edit2, MessageCircle } from 'lucide-react';
import { Home, FileText, MessageCircle } from 'lucide-react';

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

export default function Home() {
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
    about: "Hi, I'm Sarah Philips! 👋🌎\n\nBy day, I'm a business traveler, hopping from one meeting to another, sealing deals and chasing success. But once the work is done? I trade boardrooms for bustling markets, skyscrapers for safari plains, and conference calls for cultural deep dives!\n\nAfrica is my playground—I've sipped coffee in Ethiopia, danced to Afrobeat in Lagos, hiked the Table Mountain in Cape Town, and bargained like a pro in Marrakech. Every trip is a new story, every destination a fresh adventure.\n\nI don't just travel; I collect experiences, flavors, and friendships. Who says business and pleasure don't mix? 🤩"
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
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
                  <h2 className="text-xl font-semibold text-slate-800">{personalInfo.name}</h2>
                  <p className="text-sm text-slate-500">{personalInfo.email}</p>
                  <p className="text-sm text-amber-500">{personalInfo.title}</p>
                </div>
                <button className="inline-flex items-center px-4 py-2 rounded-md text-sm bg-slate-800 text-white hover:bg-slate-700">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <InfoItem label="Date of Birth" value={personalInfo.dob} />
            <InfoItem label="Country of Residence" value={personalInfo.country} />
            <InfoItem label="Nationality" value={personalInfo.nationality} />
            <InfoItem label="Gender" value={personalInfo.gender} />
            <InfoItem label="Spoken Languages" value={personalInfo.languages} />
            <InfoItem label="Pet Owner" value={personalInfo.petOwner} />
            <InfoItem label="Address" value={personalInfo.address} />
            <InfoItem label="State" value={personalInfo.state} />
            <InfoItem label="City" value={personalInfo.city} />
            <InfoItem label="Zip code" value={personalInfo.zipcode} />
            <InfoItem label="Phone Number" value={personalInfo.phone} />
            <InfoItem label="Emergency Contact" value={personalInfo.emergency} />
            <InfoItem label="Countries Visited" value={personalInfo.visited} />
            <InfoItem label="Where you'd like to visit" value={personalInfo.wantToVisit} />
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Hobbies & Interests</h3>
            <p className="text-slate-600">{personalInfo.hobbies}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4">About Me</h2>
            <div className="text-slate-600 whitespace-pre-wrap">
              {personalInfo.about}
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

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h3 className="text-sm font-medium text-slate-500 mb-1">{label}</h3>
    <p className="text-slate-700">{value}</p>
  </div>
);