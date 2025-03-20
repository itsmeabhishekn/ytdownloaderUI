import { useEffect, useState } from "react";
import { DownloadProps } from "../types";
import { API_URL } from "../config";

const Step4Downloading: React.FC<DownloadProps> = ({
  selectedVideo,
  downloadFormat,
  setCurrentStep,
}) => {
  const [status, setStatus] = useState<string>("Downloading...");
  const [error, setError] = useState<boolean>(false);

  const startDownload = async () => {
    setError(false);
    setStatus("Downloading...");

    try {
      const response = await fetch(
        `${API_URL}/api/download?id=${selectedVideo.id}&format=${downloadFormat}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to download");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `video_${selectedVideo.id}.${
        downloadFormat === "mp3" ? "mp3" : "mp4"
      }`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setStatus("Download complete!");
      setTimeout(() => setCurrentStep(5), 2000);
    } catch (error) {
      console.error("❌ Error:", error);
      setStatus("Error downloading file.");
      setError(true);
    }
  };

  useEffect(() => {
    startDownload();
  }, [selectedVideo.id, downloadFormat, setCurrentStep]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Downloading...</h1>
      <p className="mt-4">{status}</p>
      {error && (
        <div className="mt-4">
          <button
            onClick={startDownload}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => setCurrentStep(1)}
            className="p-2 ml-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition-all"
          >
            Go Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Step4Downloading;
