import Link from "next/link"; // Keep Link import if needed for future content

const ThingsToKnowSection: React.FC = () => {
  // Data for this section could be passed as props if it becomes dynamic
  return (
    <div className="py-8">
       <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-6">Things to know</h3>
       {/* Adjusted grid layout and styling */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
          {/* Check-in */}
          <div className="space-y-1.5"> {/* Increased spacing */}
              <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Check-in</h4>
              <p className="font-manrope text-sm text-[#4F4F4F]">Check-in start time: <strong>2:00 PM</strong></p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Check-in end time: <strong>12:00 AM</strong></p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Early check-in is subject to availability</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Express check-in available (No extra cost)</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Minimum check-in age: <strong>18</strong></p>
              <p className="font-manrope text-sm text-red-600 mt-2"><strong>No reservations and deposits are non-refundable*</strong></p>
          </div>
          {/* Check-out */}
           <div className="space-y-1.5">
              <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Check-out</h4>
              <p className="font-manrope text-sm text-[#4F4F4F]">Check-out before noon</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Late check-out subject to availability</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">(Comes at an extra cost of <strong>NGN 5,000</strong> per hour)</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Express check-out available</p>
          </div>
          {/* Access Methods */}
           <div className="space-y-1.5">
              <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Access methods</h4>
              <p className="font-manrope text-sm text-[#4F4F4F]">Access code needed, front desk (limited hours)</p>
          </div>
          {/* Pets */}
           <div className="space-y-1.5">
              <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Pets</h4>
              <p className="font-manrope text-sm text-[#4F4F4F]">Pets allowed for an extra charge of <strong>NGN 5,000.00</strong> per pet, per day</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Service animals are welcome, and are exempt from fees</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Welcoming dogs and cats only</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">2 total (up to 75 lbs per pet)</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Pets cannot be left unattended to</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Specific rooms only; pet-friendly rooms can be requested by contacting the host by sending a message with your request</p>
          </div>
          {/* Children */}
           <div className="space-y-1.5">
              <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-1">Children and extra beds</h4>
              <p className="font-manrope text-sm text-[#4F4F4F]">Children are welcome</p>
              <p className="font-manrope text-sm text-[#4F4F4F]">Rollaway/extra beds are available for <strong>NGN 5,000.00</strong> per stay</p>
          </div>
       </div>
    </div>
  );
};

export default ThingsToKnowSection;
