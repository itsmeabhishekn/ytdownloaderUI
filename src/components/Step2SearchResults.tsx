import { useState } from "react";
import { SearchProps, Video } from "../types";

const Step2SearchResults: React.FC<SearchProps> = ({
  serverDetails,
  setSearchResults,
  setSelectedVideo,
  setCurrentStep,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);

  const fetchResults = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `http://${serverDetails.ip}:${serverDetails.port}/search?q=test`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch results");
      }

      const data: Video[] = await res.json();
      setVideos(data);
      setSearchResults(data);
    } catch (err) {
      setError("Could not fetch results. Please check the server connection.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
    setCurrentStep(3); // Move to Step 3 (Select Format)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Search Results</h1>

        {/* Load Results Button */}
        <button
          onClick={fetchResults}
          className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-all mb-4"
        >
          {loading ? "Loading..." : "Load Results"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}

        {/* Search Results List */}
        <div className="space-y-2">
          {videos.map((video) => (
            <div
              key={video.id}
              className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-all flex justify-between items-center"
              onClick={() => handleSelectVideo(video)}
            >
              <span className="truncate">{video.title}</span>
              <button className="px-3 py-1 bg-green-500 text-white text-sm rounded">
                Select
              </button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => setCurrentStep(1)}
          className="w-full p-2 mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step2SearchResults;
