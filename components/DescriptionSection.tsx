import Link from "next/link"; // Keep Link import if needed for future content

// --- Copied Interfaces from ThingsToKnowSection ---
interface CheckInOutInfo {
  startTime?: string;
  endTime?: string;
  earlyCheckin?: string;
  expressCheckin?: string;
  minAge?: number;
  nonRefundableNote?: string;
  checkoutTime?: string;
  lateCheckout?: string;
  expressCheckout?: string;
}

interface AccessMethodsInfo {
  details?: string;
}

interface PetPolicy {
  allowed?: boolean;
  extraCharge?: string;
  serviceAnimals?: string;
  allowedTypes?: string;
  maxNumber?: number;
  maxWeight?: string; // e.g., "75 lbs"
  unattendedPolicy?: string;
  roomPolicy?: string;
}

interface ChildPolicy {
  allowed?: boolean;
  extraBeds?: string;
}
// --- End Copied Interfaces ---

interface DescriptionSectionProps {
  description: string | undefined;
  // Add props for the other sections
  checkInOut?: CheckInOutInfo;
  accessMethods?: AccessMethodsInfo;
  petPolicy?: PetPolicy;
  childPolicy?: ChildPolicy;
}


const defaultDescription = "This great place is anything but usual. A stylish and contemporary 4 bedroom bungalow with a BQ, nestled in the heart of Lekki Phase 1 with easy access to the road and other local amenities.";

const defaultCheckInOut: CheckInOutInfo = {
  startTime: "2:00 PM",
  endTime: "12:00 AM",
  earlyCheckin: "Early check-in is subject to availability",
  expressCheckin: "Express check-in available (No extra cost)",
  minAge: 18,
  nonRefundableNote: "No reservations and deposits are non-refundable*",
  checkoutTime: "Check-out before noon",
  lateCheckout: "Late check-out subject to availability (Comes at an extra cost of NGN5,000 per hour)",
  expressCheckout: "Express check-out available",
};

const defaultAccessMethods: AccessMethodsInfo = {
  details: "Access code needed, front desk (limited hours)",
};

const defaultPetPolicy: PetPolicy = {
  allowed: true,
  extraCharge: "NGN 5,000.00 per pet, per day",
  serviceAnimals: "Service animals are welcome, and are exempt from fees",
  allowedTypes: "Welcoming dogs and cats only",
  maxNumber: 2,
  maxWeight: "up to 75 lbs per pet",
  unattendedPolicy: "Pets cannot be left unattended to",
  roomPolicy: "Specific rooms only; pet-friendly rooms can be requested by contacting the host by sending a message with your request",
};

const defaultChildPolicy: ChildPolicy = {
  allowed: true,
  extraBeds: "Rollaway/extra beds are available for NGN 5,000.00 per stay",
};
// --- End Copied Default Data ---


const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
  checkInOut = defaultCheckInOut, // Use default data if props not provided
  accessMethods = defaultAccessMethods,
  petPolicy = defaultPetPolicy,
  childPolicy = defaultChildPolicy,
}) => {

  return (
    // Removed py-8 from outer div, will apply spacing between sections
    <div>
      <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Description</h3>
      <p className="font-manrope text-base text-[#4F4F4F] whitespace-pre-line leading-relaxed mb-6"> {/* Added margin-bottom */}
        {description || defaultDescription}
      </p>

      {/* --- Check-in --- */}
      <div className="mb-6"> {/* Added margin-bottom for spacing */}
          <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-2">Check-in</h4>
          <div className="space-y-1.5 font-manrope text-sm text-[#4F4F4F]">
            {checkInOut.startTime && checkInOut.endTime && <p>Check-in start time: <strong>{checkInOut.startTime}</strong>; Check-in end time: <strong>{checkInOut.endTime}</strong></p>}
            {checkInOut.earlyCheckin && <p>{checkInOut.earlyCheckin}</p>}
            {checkInOut.expressCheckin && <p>{checkInOut.expressCheckin}</p>}
            {checkInOut.minAge && <p>Minimum check-in age: <strong>{checkInOut.minAge}</strong></p>}
            {checkInOut.nonRefundableNote && <p className="text-red-600 mt-2"><strong>{checkInOut.nonRefundableNote}</strong></p>}
          </div>
      </div>

      {/* --- Check-out --- */}
       <div className="mb-6"> {/* Added margin-bottom for spacing */}
          <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-2">Check-out</h4>
          <div className="space-y-1.5 font-manrope text-sm text-[#4F4F4F]">
            {checkInOut.checkoutTime && <p>{checkInOut.checkoutTime}</p>}
            {checkInOut.lateCheckout && <p>{checkInOut.lateCheckout}</p>}
            {checkInOut.expressCheckout && <p>{checkInOut.expressCheckout}</p>}
          </div>
      </div>

      {/* --- Access methods --- */}
       <div className="mb-6"> {/* Added margin-bottom for spacing */}
          <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-2">Access methods</h4>
           <div className="space-y-1.5 font-manrope text-sm text-[#4F4F4F]">
             {accessMethods.details && <p>{accessMethods.details}</p>}
           </div>
      </div>

      {/* --- Pets --- */}
       <div className="mb-6"> {/* Added margin-bottom for spacing */}
          <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-2">Pets</h4>
           <div className="space-y-1.5 font-manrope text-sm text-[#4F4F4F]">
            {petPolicy.allowed && petPolicy.extraCharge && <p>Pets allowed for an extra charge of <strong>{petPolicy.extraCharge}</strong></p>}
            {petPolicy.serviceAnimals && <p>{petPolicy.serviceAnimals}</p>}
            {petPolicy.allowedTypes && <p>{petPolicy.allowedTypes}</p>}
            {petPolicy.maxNumber && petPolicy.maxWeight && <p>{petPolicy.maxNumber} total ({petPolicy.maxWeight})</p>}
            {petPolicy.unattendedPolicy && <p>{petPolicy.unattendedPolicy}</p>}
            {petPolicy.roomPolicy && <p>{petPolicy.roomPolicy}</p>}
           </div>
      </div>

      {/* --- Children and extra beds --- */}
       <div> {/* No margin-bottom on the last item */}
          <h4 className="font-manrope text-base font-semibold text-[#0E2F3C] mb-2">Children and extra beds</h4>
           <div className="space-y-1.5 font-manrope text-sm text-[#4F4F4F]">
            {childPolicy.allowed && <p>Children are welcome</p>}
            {childPolicy.extraBeds && <p>{childPolicy.extraBeds}</p>}
           </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
