import { useEffect, useState } from "react";
import { DownloadProps } from "../types";

const Step4Downloading: React.FC<DownloadProps> = ({
  serverDetails,
  selectedVideo,
  downloadFormat,
  setCurrentStep,
}) => {
  const [status, setStatus] = useState<string>("Downloading...");

  useEffect(() => {
    const startDownload = async () => {
      try {
        const response = await fetch(
          `http://${serverDetails.ip}:${serverDetails.port}/download?id=${selectedVideo.id}&format=${downloadFormat}`
        );

        if (!response.ok) {
          throw new Error("Failed to download");
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
        console.log(error);
        setStatus("Error downloading file.");
      }
    };

    startDownload();
  }, [serverDetails, selectedVideo, downloadFormat, setCurrentStep]);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Downloading...</h1>
      <p className="mt-4">{status}</p>
    </div>
  );
};

export default Step4Downloading;
