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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state

// Icons
import {
  Home, ChevronRight, Star, Info, Edit, ShoppingCart, AlertCircle, ShieldCheck, // Added AlertCircle, ShieldCheck
  LucideIcon, // Base type
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


  useEffect(() => {
    if (id) {
      const loadAccommodation = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchAccommodationById(id);
          if (!data) {
            // This won't work directly in client component, handle via state/redirect
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
     // TODO: Implement a more user-friendly error display or redirect
     if (error === "Accommodation not found.") {
        // Simulate notFound() behavior for client components if needed,
        // maybe redirect or show a specific "Not Found" component.
        // For now, just display the error.
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

  // --- Calculation placeholders (same as detail page for now) ---
  const nights = 5;
  const subtotal = accommodation.currentPrice * nights;
  const cautionDeposit = 100000;
  const serviceCharge = 30000;
  const vat = 22500;
  const totalCost = subtotal + cautionDeposit + serviceCharge + vat;
  // --- End Calculations ---

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
                 {/* Link back to the specific accommodation detail page */}
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
          {/* <AlertDescription> Optional description </AlertDescription> */}
        </Alert>
        {/* Alert END */}

        <div className="grid grid-cols-3 gap-10">
          {/* --- Left Column (Booking Details & Forms) --- */}
          <div className="col-span-2 flex flex-col gap-8">

            {/* --- Confirm Booking Section --- */}
            <h2 className="text-2xl font-bold text-[#0E2F3C] font-bricolage">Confirm your booking</h2>
            <Card className="border border-[#E0E0E0] rounded-lg shadow-sm">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0E2F3C]">{accommodation.propertyName}</h3>
                    <p className="text-sm text-[#4F4F4F]">You are renting the entire unit</p> {/* Placeholder */}
                  </div>
                  <div className="text-right">
                     <div className="flex items-center gap-1">
                        <Star size={16} className="text-[#E09F3E] fill-[#E09F3E]" />
                        <span className="font-manrope text-sm font-bold text-[#0E2F3C]">{accommodation.rating.toFixed(1)}</span>
                        <span className="font-manrope text-sm text-[#4F4F4F]">({accommodation.reviews} reviews)</span>
                     </div>
                     <span className="text-xs text-green-600 font-semibold">{accommodation.host.title}</span> {/* Placeholder */}
                  </div>
                </div>

                <Separator className="bg-[#E0E0E0]" />

                {/* Dates, Guests, Units */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                   <div>
                      <Label className="font-semibold text-[#0E2F3C] block mb-1">Dates</Label>
                      <p className="text-[#4F4F4F]">Friday, Feb 14 - Monday, Feb 17</p> {/* Placeholder */}
                   </div>
                    <div>
                      <Label className="font-semibold text-[#0E2F3C] block mb-1">No. of Guests</Label>
                      <p className="text-[#4F4F4F]">2 Adults, 3 Children, 1 Infant</p> {/* Placeholder */}
                   </div>
                    <div>
                      <Label className="font-semibold text-[#0E2F3C] block mb-1">No. of Units</Label>
                      <p className="text-[#4F4F4F]">1 Unit</p> {/* Placeholder */}
                   </div>
                   <Button variant="ghost" size="sm" className="text-[#E09F3E] hover:bg-transparent hover:text-[#E09F3E] p-0 justify-self-end col-start-1"><Edit size={14} className="mr-1"/> Edit</Button>
                   <Button variant="ghost" size="sm" className="text-[#E09F3E] hover:bg-transparent hover:text-[#E09F3E] p-0 justify-self-end col-start-2"><Edit size={14} className="mr-1"/> Edit</Button>
                   <Button variant="ghost" size="sm" className="text-[#E09F3E] hover:bg-transparent hover:text-[#E09F3E] p-0 justify-self-end col-start-3"><Edit size={14} className="mr-1"/> Edit</Button>
                </div>

                <Separator className="bg-[#E0E0E0]" />

                {/* Price Details */}
                <div>
                   <h4 className="font-semibold text-[#0E2F3C] mb-2">Price details</h4>
                   <div className="flex flex-col gap-1 font-manrope text-sm text-[#4F4F4F]">
                      <div className="flex justify-between">
                         <span>₦{accommodation.currentPrice.toLocaleString()} x {nights} nights</span>
                         <span>₦{subtotal.toLocaleString()}</span>
                      </div>
                       <div className="flex justify-between">
                         <span>Caution Deposit <Info size={12} className="inline text-[#828282]"/></span>
                         <span>₦{cautionDeposit.toLocaleString()}</span>
                      </div>
                       <div className="flex justify-between">
                         <span>Service charge <Info size={12} className="inline text-[#828282]"/></span>
                         <span>₦{serviceCharge.toLocaleString()}</span>
                      </div>
                       <div className="flex justify-between">
                         <span>VAT <Info size={12} className="inline text-[#828282]"/></span>
                         <span>₦{vat.toLocaleString()}</span>
                      </div>
                   </div>
                </div>

                 {/* Coupon Code */}
                 <div className="flex gap-2 items-center pt-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border-[#828282]"
                    />
                    <Button variant="outline" className="border-[#0E2F3C] text-[#0E2F3C] hover:bg-gray-50">Apply</Button>
                 </div>

                 <Separator className="bg-[#E0E0E0]" />

                 {/* Total */}
                 <div className="flex justify-between items-center font-manrope text-base font-bold text-[#0E2F3C]">
                    <span>Total</span>
                    <div className="flex items-center gap-1">
                       <ShoppingCart size={16}/>
                       <span>₦{totalCost.toLocaleString()}</span>
                    </div>
                 </div>
              </CardContent>
            </Card>
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
             <div>
               <h2 className="text-2xl font-bold text-[#0E2F3C] font-bricolage mb-4">Payment methods</h2>
               <Tabs defaultValue="card" className="w-full">
                  <TabsList className="border-b border-[#E0E0E0] rounded-none justify-start bg-transparent p-0 h-auto mb-6">
                     <TabsTrigger value="card" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold">Card</TabsTrigger>
                     <TabsTrigger value="wallet" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold" disabled>Wallet</TabsTrigger>
                     <TabsTrigger value="bank" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 mr-6 text-[#4F4F4F] font-semibold" disabled>Bank Transfer</TabsTrigger>
                     <TabsTrigger value="third_party" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0E2F3C] data-[state=active]:text-[#0E2F3C] rounded-none pb-2 px-1 text-[#4F4F4F] font-semibold" disabled>Third Party</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="mt-0 pt-4 space-y-6">
                     {/* Saved Card Placeholder */}
                     <div className="flex items-center justify-between border border-[#E0E0E0] rounded-lg p-3 text-sm text-[#4F4F4F]">
                        <span>VISA ****6614</span>
                        <RadioGroup defaultValue="saved_card"> <RadioGroupItem value="saved_card" id="saved_card" /> </RadioGroup>
                     </div>
                     <Button variant="link" className="p-0 h-auto text-[#E09F3E] font-semibold">+ Add New Card</Button>

                     {/* Card Form */}
                     <div className="space-y-4">
                        <div>
                           <Label htmlFor="cardName" className="block text-sm font-medium text-[#4F4F4F] mb-1">Name on Card*</Label>
                           <Input id="cardName" value={cardName} onChange={e => setCardName(e.target.value)} className="border-[#828282]" />
                        </div>
                         <div>
                           <Label htmlFor="cardNumber" className="block text-sm font-medium text-[#4F4F4F] mb-1">Debit/Credit card number*</Label>
                           <Input id="cardNumber" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="border-red-500" /> {/* Example error state */}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           <div>
                              <Label htmlFor="expiryMonth" className="block text-sm font-medium text-[#4F4F4F] mb-1">Expiration date*</Label>
                              <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                                 <SelectTrigger id="expiryMonth" className="border-[#828282]"> <SelectValue placeholder="Month" /> </SelectTrigger>
                                 <SelectContent>
                                    {/* Populate Months */}
                                    {[...Array(12)].map((_, i) => <SelectItem key={i+1} value={String(i+1).padStart(2, '0')}>{(i+1).toString().padStart(2, '0')}</SelectItem>)}
                                 </SelectContent>
                              </Select>
                           </div>
                           <div>
                              <Label htmlFor="expiryYear" className="block text-sm font-medium text-[#4F4F4F] mb-1 invisible">Year</Label> {/* Invisible label for alignment */}
                              <Select value={expiryYear} onValueChange={setExpiryYear}>
                                 <SelectTrigger id="expiryYear" className="border-[#828282]"> <SelectValue placeholder="Year" /> </SelectTrigger>
                                 <SelectContent>
                                    {/* Populate Years */}
                                    {[...Array(10)].map((_, i) => <SelectItem key={i} value={String(new Date().getFullYear() + i)}>{new Date().getFullYear() + i}</SelectItem>)}
                                 </SelectContent>
                              </Select>
                           </div>
                            <div>
                              <Label htmlFor="cvv" className="block text-sm font-medium text-[#4F4F4F] mb-1">CVV/Security code*</Label>
                              <Input id="cvv" value={cvv} onChange={e => setCvv(e.target.value)} className="border-[#828282]" />
                           </div>
                        </div>
                         <div className="flex items-center space-x-2">
                           <Checkbox id="rememberCard" checked={rememberCard} onCheckedChange={(checked) => setRememberCard(Boolean(checked))} />
                           <Label htmlFor="rememberCard" className="text-sm font-medium text-[#4F4F4F] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Remember this card for future use</Label>
                         </div>
                     </div>

                     {/* Billing Address */}
                     <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-semibold text-[#0E2F3C]">Billing Address</h3>
                         <div>
                           <Label htmlFor="streetAddress" className="block text-sm font-medium text-[#4F4F4F] mb-1">Street Address*</Label>
                           <Input id="streetAddress" value={streetAddress} onChange={e => setStreetAddress(e.target.value)} className="border-[#828282]" />
                        </div>
                         <div>
                           <Label htmlFor="aptSuite" className="block text-sm font-medium text-[#4F4F4F] mb-1">Apt. or Suite Number</Label>
                           <Input id="aptSuite" value={aptSuite} onChange={e => setAptSuite(e.target.value)} className="border-[#828282]" />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                               <Label htmlFor="city" className="block text-sm font-medium text-[#4F4F4F] mb-1">City*</Label>
                               <Input id="city" value={city} onChange={e => setCity(e.target.value)} className="border-red-500" /> {/* Example error state */}
                            </div>
                             <div>
                               <Label htmlFor="state" className="block text-sm font-medium text-[#4F4F4F] mb-1">State*</Label>
                               <Input id="state" value={state} onChange={e => setState(e.target.value)} className="border-[#828282]" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                             <div>
                               <Label htmlFor="postcode" className="block text-sm font-medium text-[#4F4F4F] mb-1">Postcode*</Label>
                               <Input id="postcode" value={postcode} onChange={e => setPostcode(e.target.value)} className="border-[#828282]" />
                            </div>
                             <div>
                               <Label htmlFor="country" className="block text-sm font-medium text-[#4F4F4F] mb-1">Country*</Label>
                               <Select value={country} onValueChange={setCountry}>
                                 <SelectTrigger id="country" className="border-[#828282]"> <SelectValue placeholder="Country" /> </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                                    {/* Add other countries */}
                                 </SelectContent>
                              </Select>
                            </div>
                         </div>
                     </div>
                  </TabsContent>
                  {/* Add TabsContent for other payment methods if needed */}
               </Tabs>
            </div>
            {/* --- End Payment Methods --- */}

             {/* --- Who is checking in? --- */}
             <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#0E2F3C] font-bricolage">Who is checking in?</h2>
                 <div>
                   <Label htmlFor="travelerName" className="block text-sm font-medium text-[#4F4F4F] mb-1">Traveler Name*</Label>
                   <Input id="travelerName" value={travelerName} onChange={e => setTravelerName(e.target.value)} className="border-red-500" /> {/* Example error state */}
                </div>
                 <div>
                   <Label htmlFor="emailAddress" className="block text-sm font-medium text-[#4F4F4F] mb-1">Email address*</Label>
                   <Input id="emailAddress" type="email" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} className="border-[#828282]" />
                </div>
                 <div>
                   <Label htmlFor="phoneNumber" className="block text-sm font-medium text-[#4F4F4F] mb-1">Phone number*</Label>
                   <div className="flex gap-2">
                      <Select value={phoneCode} onValueChange={setPhoneCode}>
                         <SelectTrigger id="phoneCode" className="w-[80px] border-[#828282]"> <SelectValue /> </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="+234">+234</SelectItem>
                            {/* Add other codes */}
                         </SelectContent>
                      </Select>
                      <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="border-[#828282] flex-1" />
                   </div>
                </div>
                 <div className="flex items-center space-x-2">
                   <Checkbox id="receiveMessages" checked={receiveMessages} onCheckedChange={(checked) => setReceiveMessages(Boolean(checked))} />
                   <Label htmlFor="receiveMessages" className="text-sm font-medium text-[#4F4F4F] peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Receive text messages about this trip. Messages and data rates apply</Label>
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
                 <Button className="w-full bg-[#0E2F3C] text-white font-manrope font-extrabold hover:bg-[#1c4a5f] py-3 text-base rounded-lg mt-4">
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

          {/* --- Right Column (Ad Banner) --- */}
          <div className="col-span-1">
             <div className="sticky top-6 bg-[#0E2F3C] rounded-lg p-6 text-white text-center">
                <Image src="/images/placeholder-user.jpg" alt="Ad banner image" width={100} height={100} className="mx-auto rounded-full mb-4" /> {/* Placeholder Image */}
                <h3 className="text-lg font-semibold mb-2">Advertise Here!</h3>
                <p className="text-sm mb-4">This is an ad space for vendors who wish to advertise their business/service offerings on our platform</p>
                <p className="text-sm mb-4">You can contact us to advertise your business and service offerings here</p>
                <Button className="bg-[#E09F3E] text-[#0E2F3C] hover:bg-[#d08f2e] font-semibold">Button Sample</Button>
             </div>
          </div>
          {/* --- End Right Column --- */}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
