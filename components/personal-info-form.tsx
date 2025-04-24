"use client";

import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from "@/components/ui/calendar"; // Import Calendar
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Import Popover components
import { Calendar as CalendarIcon } from "lucide-react"; // Import Calendar icon
import { format } from "date-fns"; // Import date-fns format
import { cn } from "@/lib/utils"; // Import cn utility
// Import Badge later

// Define the shape of the form data expected as props
// Align this with the actual user profile data structure from the backend (user_model.js)
interface PersonalInfoFormData {
  // Fields likely directly from User context/model
  name?: string;
  email?: string; // Usually not editable directly here
  status?: string; // Derived from role?
  avatarUrl?: string;
  verificationStatus?: 'Verified' | 'Pending' | 'Not Verified'; // Derived from user.verified

  // Fields likely specific to the detailed profile fetched from backend
  dob?: string; // Stored as ISO string or Date? Keep as string for form input.
  country?: string;
  nationality?: string;
  gender?: string;
  languages?: string[]; // How is this stored/edited? Tags? Multi-select?
  petOwner?: 'Yes' | 'No'; // Use specific values if applicable
  address?: string;
  state?: string;
  city?: string;
  zipcode?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  emergencyCountryCode?: string;
  emergencyNumber?: string;
  countriesVisited?: string[]; // Tags?
  countriesToVisit?: string[]; // Tags?
  about?: string;
  verificationType?: 'International Passport' | "Driver's License" | 'National ID'; // Use specific values
  idNumber?: string;
  // idFile?: File | null; // File upload state might be handled separately
}

interface PersonalInfoFormProps {
  formData: PersonalInfoFormData;
  isEditing: boolean;
  onFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function PersonalInfoForm({
  formData,
  isEditing,
  onFormDataChange,
}: PersonalInfoFormProps) {
  // State for the Calendar date picker
  const [date, setDate] = React.useState<Date | undefined>(
    formData.dob ? new Date(formData.dob) : undefined
  );

  // Update local date state if formData.dob changes from parent
  React.useEffect(() => {
    // Attempt to parse only if formData.dob exists and is different from current date state formatted
    const currentFormattedDate = date ? format(date, "dd MMM yyyy") : '';
    if (formData.dob && formData.dob !== currentFormattedDate) {
        try {
            const parsedDate = new Date(formData.dob);
            // Check if parsedDate is valid before setting
            if (!isNaN(parsedDate.getTime())) {
                 setDate(parsedDate);
            } else {
                 // Handle invalid date string in formData if necessary
                 console.warn("Invalid date string received in formData.dob:", formData.dob);
                 setDate(undefined); // Reset local state if formData date is invalid
            }
        } catch (error) {
            console.error("Error parsing date:", error);
            setDate(undefined); // Reset on error
        }
    } else if (!formData.dob) {
        setDate(undefined); // Clear local state if formData.dob is cleared
    }
  }, [formData.dob]); // Rerun effect when formData.dob changes


  const handleAvatarEdit = () => {
    console.log("Edit avatar clicked");
  };

  const handleSelectChange = (name: keyof PersonalInfoFormData, value: string) => {
    const simulatedEvent = {
      target: { name, value }
    } as React.ChangeEvent<HTMLSelectElement>;
    onFormDataChange(simulatedEvent);
  };

  // Handler for Calendar date select - updates local state and calls parent handler
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const formattedDate = selectedDate ? format(selectedDate, "dd MMM yyyy") : '';
    const simulatedEvent = {
      target: { name: 'dob', value: formattedDate }
    } as React.ChangeEvent<HTMLInputElement>;
    onFormDataChange(simulatedEvent);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Top section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative">
          <Image
            src={formData.avatarUrl || "/images/avatar-placeholder.png"}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full object-cover border-4 border-white shadow-md"
          />
          {isEditing && (
            <Button type="button" variant="outline" size="icon" className="absolute bottom-0 right-0 bg-white rounded-full w-8 h-8 border shadow" onClick={handleAvatarEdit} aria-label="Edit avatar">
              <FaEdit className="w-4 h-4 text-gray-600" />
            </Button>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="mb-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={onFormDataChange} className="text-xl font-semibold" />
            </div>
          ) : (
            <h2 className="text-xl font-semibold text-[#0e2f3c] mb-1">
              {formData.name || 'User Name'} {formData.email && <FaCheckCircle className="inline text-green-500 ml-1" />}
            </h2>
          )}
          {isEditing ? (
             <div className="mb-2">
               <Label htmlFor="email">Email</Label>
               <Input id="email" name="email" type="email" value={formData.email || ''} onChange={onFormDataChange} className="text-sm" />
             </div>
          ) : (
            <p className="text-sm text-gray-500 mb-1">{formData.email || 'user@example.com'}</p>
          )}
          <p className="text-sm text-amber-600 font-medium">{formData.status || 'User Status'}</p>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Date of Birth */}
         <div>
           <Label htmlFor="dob-calendar">Date of Birth</Label> {/* Changed ID slightly for clarity */}
           {isEditing ? (
             <Popover>
               <PopoverTrigger asChild>
                 <Button
                   id="dob-calendar" // Match label's htmlFor
                   variant={"outline"}
                   className={cn(
                     "w-full justify-start text-left font-normal",
                     !date && "text-muted-foreground"
                   )}
                 >
                   <CalendarIcon className="mr-2 h-4 w-4" />
                   {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
                 </Button>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0">
                 <Calendar
                   mode="single"
                   selected={date}
                   onSelect={handleDateSelect} // Use the new handler
                   captionLayout="dropdown-buttons" // Enable year/month dropdowns
                   fromYear={1900} // Example range start
                   toYear={new Date().getFullYear()} // Example range end (current year)
                   initialFocus
                 />
               </PopoverContent>
             </Popover>
           ) : (
             <p className="mt-1 text-base text-gray-900">
               {/* Ensure dob exists and is valid before formatting */}
               {formData.dob && !isNaN(new Date(formData.dob).getTime()) ? format(new Date(formData.dob), "dd MMM yyyy") : '-'}
             </p>
           )}
         </div>

        {/* Country of Residence */}
        <div>
          <Label htmlFor="country">Country of Residence</Label>
          {isEditing ? (
            <Select name="country" value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
              <SelectTrigger id="country"><SelectValue placeholder="Select country" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="United States of America">United States of America</SelectItem>
                <SelectItem value="Nigeria">Nigeria</SelectItem>
                <SelectItem value="Ghana">Ghana</SelectItem>
              </SelectContent>
            </Select>
          ) : (<p className="mt-1 text-base text-gray-900">{formData.country || '-'}</p>)}
        </div>

        {/* Nationality */}
        <div>
          <Label htmlFor="nationality">Nationality</Label>
          {isEditing ? (
            <Select name="nationality" value={formData.nationality} onValueChange={(value) => handleSelectChange('nationality', value)}>
              <SelectTrigger id="nationality"><SelectValue placeholder="Select nationality" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="American">American</SelectItem>
                <SelectItem value="Nigerian">Nigerian</SelectItem>
                <SelectItem value="Ghanaian">Ghanaian</SelectItem>
              </SelectContent>
            </Select>
          ) : (<p className="mt-1 text-base text-gray-900">{formData.nationality || '-'}</p>)}
        </div>

        {/* Gender */}
        <div>
          <Label htmlFor="gender">Gender</Label>
          {isEditing ? (
             <Select name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
              <SelectTrigger id="gender"><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          ) : (<p className="mt-1 text-base text-gray-900">{formData.gender || '-'}</p>)}
        </div>

        {/* Spoken Languages */}
        <div>
           <Label htmlFor="languages">Spoken Languages</Label>
           {isEditing ? (
             <Input id="languages" name="languages" value={formData.languages?.join(', ') || ''} onChange={onFormDataChange} placeholder="e.g., English, French" />
           ) : (<p className="mt-1 text-base text-gray-900">{formData.languages?.join(', ') || '-'}</p>)}
         </div>

         {/* Pet Owner */}
         <div>
           <Label htmlFor="petOwner">Pet Owner</Label>
           {isEditing ? (
             <Select name="petOwner" value={formData.petOwner} onValueChange={(value) => handleSelectChange('petOwner', value)}>
               <SelectTrigger id="petOwner"><SelectValue placeholder="Select option" /></SelectTrigger>
               <SelectContent>
                 <SelectItem value="Yes">Yes</SelectItem>
                 <SelectItem value="No">No</SelectItem>
               </SelectContent>
             </Select>
           ) : (<p className="mt-1 text-base text-gray-900">{formData.petOwner || '-'}</p>)}
         </div>

        {/* Address of Residence */}
        <div className="md:col-span-2 lg:col-span-3">
          <Label htmlFor="address">Address of Residence</Label>
          {isEditing ? (
            <Input id="address" name="address" value={formData.address || ''} onChange={onFormDataChange} placeholder="Street Address" />
          ) : (<p className="mt-1 text-base text-gray-900">{formData.address || '-'}</p>)}
        </div>

        {/* State */}
        <div>
          <Label htmlFor="state">State</Label>
          {isEditing ? (
            <Select name="state" value={formData.state} onValueChange={(value) => handleSelectChange('state', value)}>
              <SelectTrigger id="state"><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Accra">Accra</SelectItem>
              </SelectContent>
            </Select>
          ) : (<p className="mt-1 text-base text-gray-900">{formData.state || '-'}</p>)}
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">City</Label>
          {isEditing ? (
             <Select name="city" value={formData.city} onValueChange={(value) => handleSelectChange('city', value)}>
              <SelectTrigger id="city"><SelectValue placeholder="Select city" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="Ikeja">Ikeja</SelectItem>
                <SelectItem value="Accra Central">Accra Central</SelectItem>
              </SelectContent>
            </Select>
          ) : (<p className="mt-1 text-base text-gray-900">{formData.city || '-'}</p>)}
        </div>

        {/* Zip code */}
        <div>
          <Label htmlFor="zipcode">Zip code</Label>
          {isEditing ? (
            <Input id="zipcode" name="zipcode" value={formData.zipcode || ''} onChange={onFormDataChange} placeholder="Zip code" />
          ) : (<p className="mt-1 text-base text-gray-900">{formData.zipcode || '-'}</p>)}
        </div>

        {/* Phone Number */}
        <div className="md:col-span-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="flex items-center mt-1">
            {isEditing ? (
              <>
                <Select name="phoneCountryCode" value={formData.phoneCountryCode || '+234'} onValueChange={(value) => handleSelectChange('phoneCountryCode', value)}>
                  <SelectTrigger id="phoneCountryCode" className="w-[80px] rounded-r-none"><SelectValue placeholder="Code" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+234">+234</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber || ''} onChange={onFormDataChange} placeholder="812 345 6789" className="rounded-l-none flex-1" />
              </>
            ) : (<p className="text-base text-gray-900">{`${formData.phoneCountryCode || ''} ${formData.phoneNumber || '-'}`}</p>)}
          </div>
        </div>

        {/* Emergency Contact */}
         <div className="md:col-span-2">
          <Label htmlFor="emergencyNumber">Emergency Contact</Label>
          <div className="flex items-center mt-1">
            {isEditing ? (
              <>
                <Select name="emergencyCountryCode" value={formData.emergencyCountryCode || '+234'} onValueChange={(value) => handleSelectChange('emergencyCountryCode', value)}>
                  <SelectTrigger id="emergencyCountryCode" className="w-[80px] rounded-r-none"><SelectValue placeholder="Code" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+234">+234</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input id="emergencyNumber" name="emergencyNumber" type="tel" value={formData.emergencyNumber || ''} onChange={onFormDataChange} placeholder="801 234 5678" className="rounded-l-none flex-1" />
              </>
            ) : (<p className="text-base text-gray-900">{`${formData.emergencyCountryCode || ''} ${formData.emergencyNumber || '-'}`}</p>)}
          </div>
        </div>

        {/* Countries Visited */}
        <div className="md:col-span-2 lg:col-span-3">
           <Label htmlFor="countriesVisited">Countries Visited</Label>
           {isEditing ? (
             <Input id="countriesVisited" name="countriesVisited" value={formData.countriesVisited?.join(', ') || ''} onChange={onFormDataChange} placeholder="e.g., Nigeria, Ghana, South Africa" />
           ) : (<p className="mt-1 text-base text-gray-900">{formData.countriesVisited?.join(', ') || '-'}</p>)}
         </div>

         {/* Where you'd like to visit */}
         <div className="md:col-span-2 lg:col-span-3">
           <Label htmlFor="countriesToVisit">Where you'd like to visit</Label>
           {isEditing ? (
             <Input id="countriesToVisit" name="countriesToVisit" value={formData.countriesToVisit?.join(', ') || ''} onChange={onFormDataChange} placeholder="e.g., Tanzania, France, Canada" />
           ) : (<p className="mt-1 text-base text-gray-900">{formData.countriesToVisit?.join(', ') || '-'}</p>)}
         </div>
      </div>

      {/* About Me Section */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-semibold text-[#0e2f3c] mb-4">About Me</h3>
        {isEditing ? (
          <Textarea id="about" name="about" value={formData.about || ''} onChange={onFormDataChange} placeholder="Tell us a bit about yourself..." rows={5} className="min-h-[100px]" />
        ) : (<p className="text-base text-gray-700 whitespace-pre-wrap">{formData.about || 'No information provided.'}</p>)}
      </div>

      {/* Verification Section */}
      <div className="mt-8 pt-6 border-t">
         <h3 className="text-lg font-semibold text-[#0e2f3c] mb-4">Verification</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Verification Type */}
            <div>
               <Label htmlFor="verificationType">Verification</Label>
               {isEditing ? (
                 <Select name="verificationType" value={formData.verificationType} onValueChange={(value) => handleSelectChange('verificationType', value)}>
                   <SelectTrigger id="verificationType"><SelectValue placeholder="Select ID Type" /></SelectTrigger>
                   <SelectContent>
                     <SelectItem value="International Passport">International Passport</SelectItem>
                     <SelectItem value="Driver's License">Driver's License</SelectItem>
                     <SelectItem value="National ID">National ID</SelectItem>
                   </SelectContent>
                 </Select>
               ) : (<p className="mt-1 text-base text-gray-900">{formData.verificationType || '-'}</p>)}
            </div>

            {/* ID Number */}
            <div>
               <Label htmlFor="idNumber">ID Number</Label>
               {isEditing ? (
                 <Input id="idNumber" name="idNumber" value={formData.idNumber || ''} onChange={onFormDataChange} placeholder="Placeholder" />
               ) : (<p className="mt-1 text-base text-gray-900">{formData.idNumber || '-'}</p>)}
            </div>

            {/* ID Upload & Status */}
            <div className="lg:col-span-1">
               <Label htmlFor="idFile">Upload ID</Label>
               {isEditing ? (
                 <div className="flex items-center border rounded-md">
                    <span className="px-3 text-sm text-gray-500 flex-1 truncate">No file selected</span>
                    <Input id="idFile" name="idFile" type="file" className="sr-only" />
                    <Button type="button" variant="outline" className="rounded-l-none" onClick={() => document.getElementById('idFile')?.click()}>Browse</Button>
                 </div>
               ) : (
                 <div className="mt-1 flex items-center gap-2">
                    <span className="text-base text-gray-900">{formData.verificationStatus === 'Verified' ? 'Identity Verified' : 'Not Verified'}</span>
                    {formData.verificationStatus === 'Verified' && (<Image src="/images/avatar-placeholder.png" alt="Verified" width={24} height={24} className="rounded-full" />)}
                 </div>
               )}
               {isEditing && <p className="text-xs text-gray-500 mt-1">File must be .jpg or .pdf and not more than 5MB</p>}
            </div>

            {/* Verify Button (Conditional) */}
            {isEditing && formData.verificationStatus !== 'Verified' && (
               <div className="lg:col-span-3">
                 <Button type="button" variant="secondary" className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800">Verify</Button>
               </div>
            )}
         </div>
      </div>
    </form>
  );
}
