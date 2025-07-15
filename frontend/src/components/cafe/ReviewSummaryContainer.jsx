import React, { useEffect, useState } from "react";
import { fetchReviewSummary } from "../../apis/review";
import ReviewSummarySection from "./ReviewSummarySection";

const mapSummaryToRatings = (summary) => {
  // Helper function to format boolean values
  const formatBoolean = (value) => {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return value || "-";
  };

  // Helper function to format vibe
  const formatVibe = (value) => {
    if (value === "cozy") return "Cozy";
    if (value === "vibrant") return "Vibrant";
    return value || "-";
  };

  // Helper function to format numeric values
  const formatNumber = (value) => {
    if (value === null || value === undefined) return "-";
    return value.toString();
  };

  return {
    average: formatNumber(summary.overallRating),
    total: summary.count || 0,
    coffeeQuality: {
      taste: formatNumber(summary.avgTaste),
      presentation: formatNumber(summary.avgPresentation),
      temperature: formatBoolean(summary.temperature),
    },
    experience: {
      vibe: formatVibe(summary.vibe),
      aesthetics: formatBoolean(summary.aesthetics),
      friendliness: formatNumber(summary.avgServiceFriendliness),
      pricing: summary.pricing || "-",
    },
    sustainability: {
      ecoPackaging: formatBoolean(summary.ecoFriendly),
      veganFriendly: formatBoolean(summary.veganFriendly),
    },
    tags: {
      socialMedia: formatBoolean(summary.instagram),
      goodForStudying: formatBoolean(summary.greatForStudying),
      dateSpot: formatBoolean(summary.dateSpot),
      petFriendly: formatBoolean(summary.petFriendly),
    },
  };
};

const ReviewSummaryContainer = ({ coffeeShopId }) => {
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    console.log("ReviewSummaryContainer: coffeeShopId =", coffeeShopId); // Debug log
    if (coffeeShopId) {
      console.log("ReviewSummaryContainer: Fetching summary for", coffeeShopId); // Debug log
      fetchReviewSummary(coffeeShopId)
        .then((summary) => {
          console.log("ReviewSummaryContainer: Received summary", summary); // Debug log
          setRatings(mapSummaryToRatings(summary));
        })
        .catch((error) => {
          console.error("ReviewSummaryContainer: Error fetching summary", error); // Debug log
        });
    }
  }, [coffeeShopId]);

  if (!ratings) return <div>Loading review summary...</div>;

  return <ReviewSummarySection ratings={ratings} />;
};

export default ReviewSummaryContainer;
