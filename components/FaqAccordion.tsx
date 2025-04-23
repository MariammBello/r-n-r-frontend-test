import React from 'react'; // Import React
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, Minus } from 'lucide-react'; // Import icons

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  // State to track the open item for icon switching (optional, can use CSS group state)
  // const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className="pt-6"> {/* Added padding top matching other tabs */}
      <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-6">Frequently Asked Questions</h3>
      {/* Remove space-y-3, apply styles directly to items */}
      <Accordion type="single" collapsible className="w-full border border-[#BDBDBD] rounded-lg overflow-hidden">
        {faqs.map((faq, index) => (
           <AccordionItem
             key={index}
             value={`item-${index}`}
             className="border-b border-[#BDBDBD] last:border-b-0 group" // Add group class
             // onClick={() => setOpenItem(openItem === `item-${index}` ? null : `item-${index}`)} // Optional state update
           >
              {/* Apply conditional styles based on data state */}
              <AccordionTrigger className="font-manrope text-base font-semibold hover:no-underline p-4 text-left flex justify-between items-center data-[state=closed]:text-[#0E2F3C] data-[state=open]:bg-[#0E2F3C] data-[state=open]:text-white">
                {faq.q}
                {/* Use custom icons based on state */}
                <Minus className="h-5 w-5 shrink-0 text-white transition-transform duration-200 hidden group-data-[state=open]:block" />
                <ChevronDown className="h-5 w-5 shrink-0 text-[#BDBDBD] transition-transform duration-200 group-data-[state=closed]:block hidden" />
              </AccordionTrigger>
              {/* Apply conditional styles */}
              <AccordionContent className="font-manrope text-base text-[#4F4F4F] leading-relaxed p-4 data-[state=open]:bg-[#E0E0E0]">
                 {faq.a}
              </AccordionContent>
           </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
