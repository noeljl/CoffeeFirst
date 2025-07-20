import React, { useEffect, useState } from "react";
import { fetchReviewSummary } from "../../apis/review";
import ReviewSummarySection from "./ReviewSummarySection";
import '../../pages/styles/CafePage.css'

const mapSummaryToRatings = (summary) => {
  console.log("Raw summary data:", summary); // Debug log to see raw data
  
  // Helper function to format boolean values
  const formatBoolean = (value) => {
    console.log("formatBoolean called with:", value, "type:", typeof value); // Debug log
    if (value === true || value === "true") return "Yes";
    if (value === false || value === "false") return "No";
    if (value === "split") return "🌓 Split";
    if (value === null || value === undefined) return "-";
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

  const mappedData = {
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
  
  console.log("Mapped data:", mappedData); // Debug log to see formatted data
  return mappedData;
};

const ReviewSummaryContainer = ({ coffeeShopId, refreshTrigger }) => {
  const [ratings, setRatings] = useState(null);

  const fetchSummary = () => {
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
  };

  useEffect(() => {
    fetchSummary();
  }, [coffeeShopId]);

  // Refresh when review is submitted
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      console.log("ReviewSummaryContainer: Refreshing summary due to review submission");
      fetchSummary();
    }
  }, [refreshTrigger, coffeeShopId]);

  if (!ratings) return <div>Loading review summary...</div>;

  return <ReviewSummarySection ratings={ratings} />;
};

export default ReviewSummaryContainer;
