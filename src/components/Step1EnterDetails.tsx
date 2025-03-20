import { useState } from "react";
import { StepProps } from "../types";
import { API_URL } from "../config";
import Step2SearchResults from "./Step2SearchResults";

interface Props extends StepProps {
  setSelectedVideo: (video: any) => void; // Add this line
}

const Step1EnterDetails: React.FC<Props> = ({
  setCurrentStep,
  setSelectedVideo,
}) => {
  const [video, setVideo] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!video.trim()) {
      setError("Please enter a video name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: video }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch video data");
      }

      const data = await response.json();
      setSearchResults(data); // Store results in state
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(err.message || "Error searching for video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {searchResults.length > 0 ? (
        <Step2SearchResults
          // serverDetails={serverDetails}
          searchResults={searchResults} // Make sure this exists
          setSearchResults={setSearchResults}
          setSelectedVideo={setSelectedVideo}
          setCurrentStep={setCurrentStep}
        />
      ) : (
        <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-4">
            Search for a Video
          </h1>

          <div className="mb-4">
            <label className="block text-gray-400 mb-1">Video Name</label>
            <input
              type="text"
              placeholder="Enter video name"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <button
            className="w-full p-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-all disabled:bg-gray-600"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1EnterDetails;
