import { Video, SearchProps } from "../types";

interface Step2SearchResultsProps extends SearchProps {
  setSelectedVideo: (video: Video) => void;
}

const Step2SearchResults: React.FC<Step2SearchResultsProps> = ({
  searchResults,
  setCurrentStep,
  setSelectedVideo,
}) => {
  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video); // Store selected video
    setCurrentStep(3); // Move to Step 3 (Select Format)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Search Results</h1>

        {/* No Results Message */}
        {searchResults.length === 0 ? (
          <p className="text-center text-gray-400">No results found.</p>
        ) : (
          <div className="space-y-2">
            {searchResults.map((video) => (
              <div
                key={video.id}
                className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-all flex items-center space-x-3"
                onClick={() => handleSelectVideo(video)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 truncate">
                  <p className="truncate">{video.title}</p>
                </div>
                <button className="px-3 py-1 bg-green-500 text-white text-sm rounded">
                  Select
                </button>
              </div>
            ))}
          </div>
        )}

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
