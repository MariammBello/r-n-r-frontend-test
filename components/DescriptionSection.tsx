interface DescriptionSectionProps {
  description: string | undefined; // Allow description to be undefined
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  const defaultDescription = "This great place is anything but usual. A stylish and contemporary 4 bedroom bungalow with a BQ, nestled in the heart of Lekki Phase 1 with easy access to the road and other local amenities.";

  return (
    <div className="py-8">
      <h3 className="font-bricolage text-2xl font-bold text-[#0E2F3C] mb-4">Description</h3>
      <p className="font-manrope text-base text-[#4F4F4F] whitespace-pre-line leading-relaxed">
        {description || defaultDescription}
      </p>
    </div>
  );
};

export default DescriptionSection;
