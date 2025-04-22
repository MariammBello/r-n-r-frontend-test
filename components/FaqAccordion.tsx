import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs }) => {
  return (
    <>
      <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-6">Frequently Asked Questions</h3>
      {/* Adjusted Accordion styling */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((faq, index) => (
           <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-5"> {/* Increased padding */}
              <AccordionTrigger className="font-manrope text-base font-semibold text-[#0E2F3C] hover:no-underline py-4 text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="font-manrope text-base text-[#4F4F4F] pb-4 pt-1 leading-relaxed">
                 {faq.a}
              </AccordionContent>
           </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FaqAccordion;
