"use client"

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Keep Card import for other sections
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Removed Tabs imports as they are no longer used for payment methods
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import BookingSummaryCard from "@/components/BookingSummaryCard";
import InfoPrompt from "@/components/InfoPrompt";
import PaymentStatusDialog from "@/components/PaymentStatusDialog"; // Import the new component

// Icons
import {
  Home, ChevronRight, Star, Info, Edit, ShoppingCart, AlertCircle, ShieldCheck,
  LucideIcon, // Keep LucideIcon if used elsewhere or in types
} from "lucide-react";

import { fetchAccommodationById } from "@/lib/api/accommodations";
import { Accommodation } from "@/types/accommodation";
import { cn } from '@/lib/utils';

export default function BookingPage() {
  const params = useParams();
  const id = params.id as string;

  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form States (basic placeholders)
  const [couponCode, setCouponCode] = useState("");
  const [paymentOption, setPaymentOption] = useState("pay_now");
  const [paymentMethod, setPaymentMethod] = useState("saved_card"); // State for saved/new card
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [rememberCard, setRememberCard] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [travelerName, setTravelerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("+234");
  const [receiveMessages, setReceiveMessages] = useState(true);
  const [specialRequest, setSpecialRequest] = useState("");

  // State for Payment Status Dialog
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error'>('success');
  const [receiptDetails, setReceiptDetails] = useState<any>(null); // Use 'any' for now, replace with ReceiptDetails type later


  useEffect(() => {
    if (id) {
      const loadAccommodation = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchAccommodationById(id);
          if (!data) {
            setError("Accommodation not found.");
            setAccommodation(null);
          } else {
            setAccommodation(data);
          }
        } catch (err) {
          console.error("Failed to fetch accommodation:", err);
          setError("Failed to load accommodation details.");
          setAccommodation(null);
        } finally {
          setIsLoading(false);
        }
      };
      loadAccommodation();
    } else {
      setError("Accommodation ID is missing.");
      setIsLoading(false);
    }
  }, [id]);

  // Handle case where ID is missing or accommodation not found after fetch attempt
   if (!isLoading && error) {
     if (error === "Accommodation not found.") {
        return <div className="min-h-screen flex items-center justify-center">{error}</div>;
     }
     return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
   }

  // Show loading skeletons while fetching
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="w-[1440px] mx-auto px-[60px] pb-20">
          <Skeleton className="h-8 w-1/2 my-6" /> {/* Breadcrumb Skeleton */}
          <Skeleton className="h-12 w-full mb-6" /> {/* Alert Skeleton */}
          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2 space-y-6">
              <Skeleton className="h-48 w-full" /> {/* Confirmation Card Skeleton */}
              <Skeleton className="h-24 w-full" /> {/* Payment Options Skeleton */}
              <Skeleton className="h-96 w-full" /> {/* Payment Methods Skeleton */}
              <Skeleton className="h-48 w-full" /> {/* Guest Info Skeleton */}
              <Skeleton className="h-32 w-full" /> {/* Special Request Skeleton */}
              <Skeleton className="h-40 w-full" /> {/* Policy Skeleton */}
              <Skeleton className="h-40 w-full" /> {/* Important Info Skeleton */}
            </div>
            <div className="col-span-1 space-y-6">
               <Skeleton className="h-64 w-full" /> {/* Ad Banner Skeleton */}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Should not happen if error handling above is correct, but satisfy TS
  if (!accommodation) {
     return <div className="min-h-screen flex items-center justify-center">Something went wrong.</div>;
   }

   // --- Calculation placeholders ---
   const nights = 5; // Example
   const subtotal = accommodation.currentPrice * nights;
   const cautionDeposit = 100000; // Example
   const serviceCharge = 10000; // Example from Figma summary card
   const vat = 22500; // Example
   const totalCost = subtotal + cautionDeposit + serviceCharge + vat;
   // --- End Calculations ---

   // --- Placeholder Submit Handler ---
   const handleSendRequest = () => {
     // Simulate API call & response
     console.log("Sending booking request...");
     // Example: Set state for success dialog
     setReceiptDetails({
       amount: totalCost,
       refNumber: '000085752257', // Example
       vendorName: accommodation.host.name, // Example
       paymentMethod: 'Debit card', // Example
       paymentTime: new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'medium' }), // Example
       sender: 'Sarah Philips' // Example - get from auth context later
     });
     setPaymentStatus('success');
     setIsStatusDialogOpen(true);

     // Example for error state (uncomment to test)
     // setPaymentStatus('error');
     // setIsStatusDialogOpen(true);
   };
   // --- End Placeholder Submit Handler ---


   return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-[1440px] mx-auto px-[60px] pb-20">
        {/* Breadcrumbs START */}
        <Breadcrumb className="py-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center text-[#828282] hover:text-[#0e2f3c]">
                  <Home className="mr-2 h-4 w-4" /> Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4 text-[#828282]" /></BreadcrumbSeparator>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                 <Link href="/accommodation" className="text-[#828282] hover:text-[#0e2f3c]">Accommodation</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
             <BreadcrumbSeparator><ChevronRight className="h-4 w-4 text-[#828282]" /></BreadcrumbSeparator>
             <BreadcrumbItem>
               <BreadcrumbLink asChild>
                 <Link href={`/accommodation/${id}`} className="text-[#828282] hover:text-[#0e2f3c]">
                   {accommodation.propertyName}
                 </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator><ChevronRight className="h-4 w-4 text-[#828282]" /></BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-extrabold text-[#0e2f3c]">Payment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* Breadcrumbs END */}

        {/* Alert START */}
        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">To complete your booking, please fill all compulsory fields with the correct details</AlertTitle>
        </Alert>
        {/* Alert END */}

        <div className="grid grid-cols-3 gap-10">
          {/* --- Left Column (Booking Details & Forms) --- */}
          <div className="col-span-2 flex flex-col gap-8">

            {/* --- Confirm Booking Section --- */}
            <h2 className="text-2xl font-bold text-[#0E2F3C] font-bricolage">Confirm your booking</h2>
            <BookingSummaryCard
              accommodation={accommodation}
              couponCode={couponCode}
              onCouponChange={setCouponCode}
              onApplyCoupon={() => { /* Placeholder */ alert("Apply Coupon Clicked"); }}
            />
            {/* --- End Confirm Booking Section --- */}

            {/* --- Payment Options --- */}
            <div>
               <h2 className="text-2xl font-bold text-[#0E2F3C] font-bricolage mb-4">Select your payment options</h2>
               <RadioGroup value={paymentOption} onValueChange={setPaymentOption} className="space-y-3">
                  <Label htmlFor="pay_now" className="flex items-center justify-between border border-[#828282] rounded-lg p-4 cursor-pointer has-[:checked]:border-[#E09F3E] has-[:checked]:border-2">
                     <span>Pay <strong>₦{totalCost.toLocaleString()}</strong> now</span>
                     <RadioGroupItem value="pay_now" id="pay_now" />
                  </Label>
                   <Label htmlFor="pay_later" className="flex items-center justify-between border border-[#E0E0E0] rounded-lg p-4 cursor-not-allowed bg-gray-50 text-gray-400">
                     <span>This property does not offer reservations</span>
                     <RadioGroupItem value="pay_later" id="pay_later" disabled />
                  </Label>
               </RadioGroup>
            </div>
            {/* --- End Payment Options --- */}

            {/* --- Payment Methods --- */}
            <div className="border border-[#BDBDBD] rounded-lg p-[48px_60px] space-y-8"> {/* Container styles */}
              <h2 className="text-2xl font-bold text-[#0E2F3C] font-bricolage">Payment methods</h2>

              {/* Saved Card / Add New Card Selection */}
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-6">
                {/* Saved Card Option */}
                <Label htmlFor="saved_card" className="flex items-center justify-between border border-[#E0E0E0] rounded-lg p-4 cursor-pointer has-[:checked]:border-[#E09F3E] has-[:checked]:border-2">
                  <div className="flex items-center gap-3">
                    {/* Placeholder for VISA logo */}
                    <span className="font-bold text-blue-700">VISA</span>
                    <span className="font-manrope text-base text-[#282828]">****6614</span>
                  </div>
                  <RadioGroupItem value="saved_card" id="saved_card" />
                </Label>

                {/* Add New Card Option */}
                <Label htmlFor="add_new_card" className="flex items-center gap-3 cursor-pointer">
                   <RadioGroupItem value="add_new_card" id="add_new_card" />
                   <span className="font-manrope text-base text-[#282828]">Add New Card</span>
                </Label>
              </RadioGroup>

              {/* Conditional Card Form */}
              {paymentMethod === 'add_new_card' && (
                <div className="space-y-8 pt-4"> {/* Card Form */}
                  {/* Name on Card */}
                  <div>
                    <Label htmlFor="cardName" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Name on Card*</Label>
                    <Input id="cardName" value={cardName} onChange={e => setCardName(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base placeholder:text-[#828282]" placeholder="Sarah Philips"/>
                  </div>
                  {/* Card Number */}
                  <div>
                    <Label htmlFor="cardNumber" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Debit/Credit card number*</Label>
                    <Input id="cardNumber" placeholder="0000  0000  0000  0000" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base placeholder:text-[#828282]" />
                  </div>
                  {/* Expiry & CVV Row */}
                  <div className="flex items-end gap-8">
                    {/* Expiry Date */}
                    <div className="flex-1">
                       <Label htmlFor="expiryMonth" className="block font-manrope text-xl font-extrabold text-[#EB5757] mb-2">Expiration date*</Label>
                       <div className="flex gap-2">
                          <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                             <SelectTrigger id="expiryMonth" className="border-[#BDBDBD] rounded p-3 h-auto text-base text-[#828282]"> <SelectValue placeholder="Month" /> </SelectTrigger>
                             <SelectContent>
                                {[...Array(12)].map((_, i) => <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>{(i+1).toString().padStart(2, '0')}</SelectItem>)}
                             </SelectContent>
                          </Select>
                          <Select value={expiryYear} onValueChange={setExpiryYear}>
                             <SelectTrigger id="expiryYear" className="border-[#BDBDBD] rounded p-3 h-auto text-base text-[#828282]"> <SelectValue placeholder="Year" /> </SelectTrigger>
                             <SelectContent>
                                {[...Array(10)].map((_, i) => <SelectItem key={i} value={String(new Date().getFullYear() + i)}>{new Date().getFullYear() + i}</SelectItem>)}
                             </SelectContent>
                          </Select>
                       </div>
                    </div>
                    {/* CVV */}
                    <div className="w-[206px]">
                       <Label htmlFor="cvv" className="block font-manrope text-xl font-extrabold text-[#EB5757] mb-2">CVV/Security code*</Label>
                       <Input id="cvv" value={cvv} onChange={e => setCvv(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                    </div>
                  </div>
                  {/* Remember Card */}
                  <div className="flex items-center gap-2">
                    <Checkbox id="rememberCard" checked={rememberCard} onCheckedChange={(checked) => setRememberCard(Boolean(checked))} className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600" />
                    <Label htmlFor="rememberCard" className="font-manrope text-base text-[#0E2F3C] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Remember this card for future use</Label>
                  </div>
                </div>
              )}

              {/* Billing Address */}
              <div className="space-y-8 pt-4">
                 <h3 className="font-bricolage text-3xl font-bold text-[#0E2F3C]">Billing Address</h3>
                 {/* Street Address */}
                 <div>
                   <Label htmlFor="streetAddress" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Street Address*</Label>
                   <Input id="streetAddress" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                 </div>
                 {/* Apt/Suite */}
                 <div>
                   <Label htmlFor="aptSuite" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Apt. or Suite Number</Label>
                   <Input id="aptSuite" value={aptSuite} onChange={e => setAptSuite(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                 </div>
                 {/* City/State Row */}
                 <div className="flex items-center gap-[88px]">
                     <div className="flex-1">
                       <Label htmlFor="city" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">City*</Label>
                       <Input id="city" value={city} onChange={e => setCity(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                    </div>
                     <div className="flex-1">
                       <Label htmlFor="state" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">State*</Label>
                       <Input id="state" value={state} onChange={e => setState(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                    </div>
                 </div>
                 {/* Postcode/Country Row */}
                 <div className="flex items-center gap-[88px]">
                     <div className="flex-1">
                       <Label htmlFor="postcode" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Postcode*</Label>
                       <Input id="postcode" value={postcode} onChange={e => setPostcode(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                    </div>
                     <div className="flex-1">
                       <Label htmlFor="country" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Country*</Label>
                       <Select value={country} onValueChange={setCountry}>
                         <SelectTrigger id="country" className="border-[#BDBDBD] rounded p-3 h-auto text-base text-[#828282]"> <SelectValue placeholder="Country" /> </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            {/* Add other countries */}
                         </SelectContent>
                      </Select>
                    </div>
                 </div>
              </div>
            </div>
            {/* --- End Payment Methods --- */}


             {/* --- Who is checking in? --- */}
             {/* Added border, padding, adjusted spacing */}
             <div className="border border-[#BDBDBD] rounded-lg p-[40px_60px] space-y-6">
                {/* Heading style updated */}
                <h2 className="text-3xl font-bold text-[#0E2F3C] font-bricolage">Who is checking in?</h2>
                 {/* Form fields with updated styles */}
                 <div className="space-y-6"> {/* Inner div for form field spacing */}
                   <div>
                     <Label htmlFor="travelerName" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Traveler Name*</Label>
                     <Input id="travelerName" value={travelerName} onChange={e => setTravelerName(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base placeholder:text-[#828282]" placeholder="Sarah Philips"/>
                   </div>
                   <div>
                     <Label htmlFor="emailAddress" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Email address*</Label>
                     <Input id="emailAddress" type="email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base" />
                   </div>
                   <div>
                     <Label htmlFor="phoneNumber" className="block font-manrope text-xl font-extrabold text-[#0E2F3C] mb-2">Phone number*</Label>
                     <div className="flex gap-6"> {/* Match Figma gap */}
                        <Select value={phoneCode} onValueChange={setPhoneCode}>
                           {/* Adjusted width and styles */}
                           <SelectTrigger id="phoneCode" className="w-[159px] border-[#BDBDBD] rounded p-3 h-auto text-base text-[#828282]"> <SelectValue /> </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="+234">+234</SelectItem>
                              {/* Add other codes */}
                           </SelectContent>
                        </Select>
                        {/* Adjusted width and styles */}
                        <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="border-[#BDBDBD] rounded p-3 h-auto text-base flex-1" />
                     </div>
                   </div>
                   <div className="flex items-center gap-2"> {/* Match Figma gap */}
                     <Checkbox id="receiveMessages" checked={receiveMessages} onCheckedChange={(checked) => setReceiveMessages(Boolean(checked))} className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600" /> {/* Green check */}
                     {/* Match Figma text style */}
                     <Label htmlFor="receiveMessages" className="font-manrope text-base text-[#0E2F3C] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Receive text messages about this trip. Messages and data rates apply</Label>
                   </div>
                 </div>
             </div>
             {/* --- End Who is checking in? --- */}

             {/* --- Special request to host --- */}
             <div className="space-y-2">
                 <Label htmlFor="specialRequest" className="text-2xl font-bold text-[#0E2F3C] font-bricolage flex items-center gap-1">
                    Special request to host <Info size={16} className="text-[#828282]"/>
                 </Label>
                 <Textarea
                    id="specialRequest"
                    placeholder="Example: Hi Eniola, I would love to let you know that I would be coming with two of my pets. They are cute dogs and won't be a bother. Would you be able to provide dog potties and a dog kennel?"
                    value={specialRequest}
                    onChange={e => setSpecialRequest(e.target.value)}
                    className="border-[#828282] min-h-[100px]"
                 />
             </div>
             {/* --- End Special request to host --- */}

             {/* --- Cancellation policy --- */}
             <div className="space-y-2 border border-[#E0E0E0] rounded-lg p-6">
                 <h3 className="text-lg font-semibold text-[#0E2F3C]">Cancellation policy</h3>
                 <ul className="list-disc pl-5 space-y-1 font-manrope text-sm text-[#4F4F4F]">
                    <li>You will get a 100% refund of all you paid if you cancel <strong>72 hours</strong> before your check-in date.</li>
                    <li>Cancellations or no-shows made after 6pm (local time) of the <strong>72 hours</strong> grace period, but before check-in will result in a 50% partial refund due to late cancellations.</li>
                    <li>Cancellations after check-in will not be refunded.</li>
                    <li>This policy applies fully to full payments and reservation payments.</li>
                 </ul>
                 <Link href="#" className="block font-manrope text-sm text-[#4F4F4F] underline pt-2">Learn more about our cancellation policies</Link>
             </div>
             {/* --- End Cancellation policy --- */}

             {/* --- Important Information --- */}
             <div className="space-y-4 border border-[#E0E0E0] rounded-lg p-6">
                 <h3 className="text-lg font-semibold text-[#0E2F3C]">Important Information</h3>
                 <div className="grid grid-cols-2 gap-4 font-manrope text-sm text-[#4F4F4F]">
                    <p><strong>Check-in:</strong> Fri, Feb 14, 2:00 PM</p> {/* Placeholder */}
                    <p><strong>Check-out:</strong> Mon, Feb 17, 12:00 noon (3-night stay)</p> {/* Placeholder */}
                 </div>
                 <p className="font-manrope text-sm text-[#4F4F4F]">We ask every guest to remember a few simple things about what makes a great guest:</p>
                 <ul className="list-disc pl-5 space-y-1 font-manrope text-sm text-[#4F4F4F]">
                    <li>Follow the house rules</li>
                    <li>Treat your Host's home like your own</li>
                 </ul>
                 <p className="font-manrope text-sm text-[#4F4F4F]">
                    By clicking on the button below, I acknowledge that I have reviewed the <Link href="#" className="underline text-[#E09F3E]">Privacy Statement</Link> and <Link href="#" className="underline text-[#E09F3E]">Host policy</Link> and have reviewed and accept the Roots 'n' Routes <Link href="#" className="underline text-[#E09F3E]">Refund Policy</Link> and <Link href="#" className="underline text-[#E09F3E]">Terms of Use</Link>.
                 </p>
                 <p className="font-manrope text-sm text-[#4F4F4F]">
                    I also agree that Roots 'n' Routes can charge my payment method if I am responsible for any damage and I agree to pay the total amount shown if the Host accepts my booking request.
                 </p>
                 {/* Updated Button to trigger dialog */}
                 <Button
                   onClick={handleSendRequest}
                   className="w-full bg-[#0E2F3C] text-white font-manrope font-extrabold hover:bg-[#1c4a5f] py-3 text-base rounded-lg mt-4"
                 >
                    Send Request
                 </Button>
                 <ul className="list-disc pl-5 space-y-1 font-manrope text-xs text-[#828282] pt-2">
                    <li>We use secure transmission and encrypted storage to protect your personal information.</li>
                    <li>Payments are processed in the country where the service provider resides, in which case your card issuer may charge a foreign transaction fee.</li>
                 </ul>
             </div>
             {/* --- End Important Information --- */}

          </div>
          {/* --- End Left Column --- */}

          {/* --- Right Column (Info Prompts) --- */}
          <div className="col-span-1">
             <div className="sticky top-6 space-y-4"> {/* Add spacing between prompts */}
                <InfoPrompt text="You have good taste. Pay now before someone else grabs this opportunity." />
                <InfoPrompt text="30% discount applied" />
                {/* Removed Advertise Here banner */}
             </div>
          </div>
          {/* --- End Right Column --- */}

        </div>
      </main>

       {/* Footer */}
       <Footer />

       {/* Payment Status Dialog */}
       {receiptDetails && (
         <PaymentStatusDialog
           isOpen={isStatusDialogOpen}
           onOpenChange={setIsStatusDialogOpen}
           status={paymentStatus}
           details={receiptDetails}
           onDone={() => console.log("Dialog Done")} // Placeholder action
           onRetry={() => console.log("Dialog Retry")} // Placeholder action
         />
       )}
     </div>
   );
}
