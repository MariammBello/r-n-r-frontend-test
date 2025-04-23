import Link from "next/link";

interface PoliciesListProps {
  policies: string[];
}

const PoliciesList: React.FC<PoliciesListProps> = ({ policies }) => {
  return (
    <>
      <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Policies</h3>
      {/* Adjusted list styling */}
      <ul className="list-disc pl-6 space-y-2.5 font-manrope text-base text-[#4F4F4F] leading-relaxed">
        {policies.map((policy, index) => (
           <li key={index} dangerouslySetInnerHTML={{ __html: policy.replace(/Refunds & Dispute Policy/g, '<a href="#" class="text-[#E09F3E] underline font-semibold">Refunds & Dispute Policy</a>').replace(/Host Policy/g, '<a href="#" class="text-[#E09F3E] underline font-semibold">Host Policy</a>') }}></li>
        ))}
      </ul>
    </>
  );
};

export default PoliciesList;
