// Removed Calendar import as it's handled by the search bar component
import AccommodationSearchBar from "./AccommodationSearchBar"; // Import the reusable component

export default function BookingSection() {
  return (
    <section className="w-full my-[72px]">
      <div className="w-full mx-auto px-[60px]">
        {/* Heading */}
        <h2 className="text-[#0e2f3c] text-4xl font-bold mb-8 text-center">
          Your Next Naija Destination is Here: BOOK NOW!
        </h2>

        {/* Use the reusable search bar component */}
        {/* Wrap in a div if specific styling/layout needed for this section */}
        <div className="bg-white p-6 rounded-lg shadow-sm flex justify-center">
           <AccommodationSearchBar />
        </div>
      </div>
    </section>
  );
}
