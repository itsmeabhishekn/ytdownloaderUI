import { FormatProps } from "../types";

const Step3SelectFormat: React.FC<FormatProps> = ({
  selectedVideo,
  setDownloadFormat,
  setCurrentStep,
}) => {
  const selectFormat = (format: string) => {
    setDownloadFormat(format);
    setCurrentStep(4); // Move to Step 4
  };

  // Handle case when selectedVideo is missing
  if (!selectedVideo) {
    return (
      <div className="text-center text-red-500">
        <p>Error: No video selected.</p>
        <button
          onClick={() => setCurrentStep(2)}
          className="p-2 mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Select Format</h1>
        <p className="mb-4 text-center text-gray-300">
          <strong>Video:</strong> {selectedVideo.title}
        </p>

        {/* Format Selection Buttons */}
        <div className="flex flex-col space-y-3">
          {/* {["1080p", "max", "mp3", "flac"].map((format) => ( */}
          {["flac"].map((format) => (
            <button
              key={format}
              onClick={() => selectFormat(format)}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-all"
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => setCurrentStep(2)}
          className="w-full p-2 mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step3SelectFormat;
