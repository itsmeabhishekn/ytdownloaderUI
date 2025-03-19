import { useState } from "react";
import { StepProps, ServerDetails } from "../types";

interface Props extends StepProps {
  setServerDetails: (details: ServerDetails) => void;
}

const Step1EnterDetails: React.FC<Props> = ({
  setServerDetails,
  setCurrentStep,
}) => {
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState<string>("");

  const handleSearch = () => {
    if (!video.trim()) {
      setError("Please enter a video name.");
      return;
    }
    setError("");
    setServerDetails({ ip: ip || "localhost", port: port || "8000" });
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Enter Server Details
        </h1>

        {/* IP Address Input */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">
            IP Address (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter IP Address"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Port Input */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Port (Optional)</label>
          <input
            type="text"
            placeholder="Enter Port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video Name Input */}
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

        {/* Search Button */}
        <button
          className="w-full p-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-all"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Step1EnterDetails;
