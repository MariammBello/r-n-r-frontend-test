import React from 'react';

interface AboutHostSectionProps {
  hostName: string; // Pass host name for dynamic text
  // Add prop for the actual description text if it comes from API
  aboutText?: string;
}

const AboutHostSection: React.FC<AboutHostSectionProps> = ({ hostName, aboutText }) => {
  // Default text matching Figma, incorporating hostName
  const defaultAboutText = `${hostName} is a Superhost who she is known for offering a great stay experience to guests. Her apartment comes highly recommended`;
  const displayAboutText = aboutText || defaultAboutText;

  return (
    // Added margin-top based on Figma spacing (32px)
    <div className="mt-8">
      <h4 className="font-manrope text-lg font-bold text-[#0E2F3C] mb-2">About your Host</h4>
      <p className="font-manrope text-base text-[#4F4F4F] leading-relaxed">
        {displayAboutText}
      </p>
    </div>
  );
};

export default AboutHostSection;
