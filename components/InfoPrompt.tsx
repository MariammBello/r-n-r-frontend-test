import React from 'react';
import { ShieldCheck } from 'lucide-react'; // Using ShieldCheck for the green checkmark

interface InfoPromptProps {
  text: string;
  className?: string; // Allow passing additional classes
}

const InfoPrompt: React.FC<InfoPromptProps> = ({ text, className }) => {
  return (
    // Style based on Figma rectangle and screenshot
    <div className={`bg-[#EFEFEF] rounded-lg p-4 flex items-center gap-3 ${className}`}>
      <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
      <p className="font-manrope text-sm text-[#4F4F4F]">{text}</p>
    </div>
  );
};

export default InfoPrompt;
