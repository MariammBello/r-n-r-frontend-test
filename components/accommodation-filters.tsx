"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

// Placeholder data for filters - replace with actual data source later
const accommodationTypes = ["Room/Bedsitter", "Apartment", "Duplex", "Condo", "Hotel", "Chalet"]
const amenities = ["Ocean view", "Restaurant", "Car parking", "Elevator", "WiFi included", "Kitchen"]
const accessibilityOptions = ["Roll-in shower", "Stair-free entrance", "Accessible bathrooms", "Wheelchair accessible parking"]
const hostLanguages = ["English", "Igbo", "Yoruba", "Pidgin", "Swahili", "Afrikaans"]
const bookingOptions = ["Adults only", "Party friendly", "Family friendly", "Children friendly", "Business friendly"]
const ratingsOptions = ["Guest favourite", "Star rating", "Recommendations"]

export default function AccommodationFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([15000, 300000])

  // TODO: Add state for checkboxes

  return (
    <Card className="w-[348px] border-none shadow-lg rounded-lg"> {/* Width approx from Figma, added shadow */}
      <CardHeader className="p-6 pb-4"> {/* Adjusted padding */}
        <CardTitle className="font-bricolage text-2xl font-bold text-[#0E2F3C]">Filter by</CardTitle>
      </CardHeader>
      <Separator className="bg-[#828282]" />

      {/* Remove padding from CardContent, apply to sections below */}
      <CardContent className="flex flex-col">
        {/* Type of Accommodation */}
        <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding, kept gap-4 */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Type of Accommodation</Label>
          <div className="flex flex-col gap-4 mb-6"> {/* Changed gap-3 to gap-4, kept mb-6 */}
            {accommodationTypes.slice(0, 6).map((type) => ( // Show initial items
              <div key={type} className="flex items-center space-x-3"> {/* Changed space-x-2 to space-x-3 */}
                <Checkbox
                  id={`type-${type}`}
                  className="h-6 w-6 border-[#0E2F3C] data-[state=checked]:bg-white data-[state=checked]:text-[#0E2F3C]" // Added size and color classes
                />
                <Label htmlFor={`type-${type}`} className="font-manrope text-base font-normal text-[#0E2F3C]">
                  {type}
                </Label>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-end self-end"> {/* Added self-end */}
            See more
          </Button>
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

        {/* Price */}
        <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Price</Label>
          <div className="flex gap-5">
            <div className="flex-1">
              <Label htmlFor="min-price" className="font-manrope text-sm font-extrabold text-[#0E2F3C]">Min.</Label>
              <Input
                id="min-price"
                value={`₦${priceRange[0].toLocaleString()}`}
                readOnly
                className="border-[#0E2F3C] mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="max-price" className="font-manrope text-sm font-extrabold text-[#0E2F3C]">Max.</Label>
              <Input
                id="max-price"
                value={`₦${priceRange[1].toLocaleString()}${priceRange[1] >= 300000 ? '+' : ''}`}
                readOnly
                className="border-[#0E2F3C] mt-1"
              />
            </div>
          </div>
          <Slider
            defaultValue={[15000, 300000]}
            min={0}
            max={300000} // Adjust max as needed
            step={1000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="[&>span:first-child]:h-1 [&>span:first-child]:bg-gray-200 [&>span:first-child>span]:bg-[#FF7500] [&>span:nth-child(2)>span]:bg-[#FF7500] [&>span:nth-child(3)>span]:bg-[#FF7500]" // Kept refined track style
          />
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

        {/* Amenities */}
        <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Amenities</Label>
           <div className="flex flex-col gap-4 mb-6"> {/* Changed gap-3 to gap-4, kept mb-6 */}
            {amenities.slice(0, 6).map((item) => ( // Show initial items
              <div key={item} className="flex items-center space-x-3"> {/* Changed space-x-2 to space-x-3 */}
                <Checkbox
                  id={`amenity-${item}`}
                  className="h-6 w-6 border-[#0E2F3C] data-[state=checked]:bg-white data-[state=checked]:text-[#0E2F3C]" // Added size and color classes
                 />
                <Label htmlFor={`amenity-${item}`} className="font-manrope text-base font-normal text-[#0E2F3C]">
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-end self-end"> {/* Added self-end */}
            See more
          </Button>
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

        {/* Accessibility Options */}
         <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Accessibility Options</Label>
           <div className="flex flex-col gap-4 mb-6"> {/* Changed gap-3 to gap-4, kept mb-6 */}
            {accessibilityOptions.slice(0, 4).map((item) => ( // Show initial items
              <div key={item} className="flex items-center space-x-3"> {/* Changed space-x-2 to space-x-3 */}
                <Checkbox
                  id={`access-${item}`}
                  className="h-6 w-6 border-[#0E2F3C] data-[state=checked]:bg-white data-[state=checked]:text-[#0E2F3C]" // Added size and color classes
                />
                <Label htmlFor={`access-${item}`} className="font-manrope text-base font-normal text-[#0E2F3C]">
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-end self-end"> {/* Added self-end */}
            See more
          </Button>
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

         {/* Host Language Options */}
         <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Host Language Options</Label>
           <div className="flex flex-col gap-4 mb-6"> {/* Changed gap-3 to gap-4, kept mb-6 */}
            {hostLanguages.slice(0, 6).map((item) => ( // Show initial items
              <div key={item} className="flex items-center space-x-3"> {/* Changed space-x-2 to space-x-3 */}
                <Checkbox
                  id={`lang-${item}`}
                  className="h-6 w-6 border-[#0E2F3C] data-[state=checked]:bg-white data-[state=checked]:text-[#0E2F3C]" // Added size and color classes
                />
                <Label htmlFor={`lang-${item}`} className="font-manrope text-base font-normal text-[#0E2F3C]">
                  {item}
                </Label>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-end self-end"> {/* Added self-end */}
            See more
          </Button>
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

        {/* Booking Options */}
        <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Booking Options</Label>
           <div className="flex flex-col gap-4 mb-6"> {/* Changed gap-3 to gap-4, kept mb-6 */}
            {bookingOptions.slice(0, 5).map((item) => ( // Show initial items
              <div key={item} className="flex items-center space-x-3"> {/* Changed space-x-2 to space-x-3 */}
                <Checkbox
                  id={`booking-${item}`}
                  className="h-6 w-6 border-[#0E2F3C] data-[state=checked]:bg-white data-[state=checked]:text-[#0E2F3C]" // Added size and color classes
                />
                <Label htmlFor={`booking-${item}`} className="font-manrope text-base font-normal text-[#0E2F3C]">
                  {item}
                </Label>
              </div>
            ))}
          </div>
           <Button variant="link" className="text-[#E09F3E] font-manrope font-extrabold p-0 h-auto justify-end self-end"> {/* Added self-end */}
            See more
          </Button>
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

         {/* Ratings & Reviews */}
        <div className="px-9 py-6 flex flex-col gap-4"> {/* Added px-9 py-6 padding */}
          <Label className="font-manrope text-lg font-extrabold text-[#0E2F3C]">Ratings & Reviews</Label>
           <div className="flex flex-col gap-4"> {/* Changed gap-3 to gap-4 */}
            {ratingsOptions.map((item) => (
              <div key={item} className="flex items-center space-x-3"> {/* Changed space-x-2 to space-x-3 */}
                <Checkbox
                  id={`rating-${item}`}
                  className="h-6 w-6 border-[#0E2F3C] data-[state=checked]:bg-white data-[state=checked]:text-[#0E2F3C]" // Added size and color classes
                />
                <Label htmlFor={`rating-${item}`} className="font-manrope text-base font-normal text-[#0E2F3C]">
                  {item}
                </Label>
              </div>
            ))}
          </div>
          {/* No "See more" for ratings */}
        </div>
        <Separator className="bg-[#828282]" /> {/* Moved Separator back between sections */}

        {/* Action Buttons */}
        <div className="px-9 pt-6 pb-6 flex items-center justify-between"> {/* Added padding */}
           <Button variant="link" className="text-[#0E2F3C] font-manrope font-extrabold p-0 h-auto">
            Clear all Filters
          </Button>
           <Button className="bg-[#0E2F3C] text-white font-manrope font-extrabold hover:bg-[#1c4a5f] px-6 py-3 h-12"> {/* Style from Figma */}
            Apply Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
