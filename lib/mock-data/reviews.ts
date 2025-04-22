import { ReviewsData } from "@/types/accommodation";

// Mock data for reviews section on accommodation detail page
export const mockReviewsData: ReviewsData = {
  overallRating: 4.7, // Example
  totalReviews: 47, // Example
  ratingBreakdown: [
    { category: "Location", score: 4.8 },
    { category: "Check-in", score: 4.9 },
    { category: "Cleanliness", score: 4.6 },
    { category: "Communication", score: 4.7 },
    { category: "Amenities", score: 4.5 },
    { category: "Eco-friendliness", score: 4.0 },
  ],
  individualReviews: [
    { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 10, scoreType: "Excellent", date: "August 23, 2024", text: "I came here in August with my husband for our 25th wedding anniversary and we stayed 7 nights. It was the best experience ever. The apartment was very neat, clean... We enjoyed our stay here we will be back here again with the whole family.", avatar: "/images/placeholder-user.jpg" },
    { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 6.5, scoreType: "Average", date: "August 23, 2024", text: "I enjoyed my stay here. The only major problem encountered was finding my way to the location which I eventually did. It was a bit too remote then I would have liked, but I would love to come...", avatar: "/images/placeholder-user.jpg" },
    { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 4, scoreType: "Poor", date: "August 23, 2024", text: "My husband and I did not enjoy our stay here at all. The apartment was in a very noisy environment and hold parties every night which prevented us from getting any rest at all. We also had a problem accessing local amenities as we had to go a distance to get ...", avatar: "/images/placeholder-user.jpg" },
    { name: "Tina Rugby", location: "Atlanta, Georgia", rating: 10, scoreType: "Excellent", date: "August 23, 2024", text: "I came here in August with my husband for our 25th wedding anniversary and we stayed 7 nights. It was the best experience ever. The apartment was very neat, clean... We enjoyed our stay here we will be back here again with the whole family.", avatar: "/images/placeholder-user.jpg" },
  ]
};
