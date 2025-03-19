import { FormatProps } from "../types";

const Step3SelectFormat: React.FC<FormatProps> = ({
  selectedVideo,
  setDownloadFormat,
  setCurrentStep,
}) => {
  const selectFormat = (format: string) => {
    setDownloadFormat(format);
    setCurrentStep(4);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Select Format</h1>
      <p className="mb-4">Video: {selectedVideo.title}</p>
      <button
        onClick={() => selectFormat("1080p")}
        className="p-2 bg-gray-500 m-2"
      >
        1080p
      </button>
      <button
        onClick={() => selectFormat("max")}
        className="p-2 bg-gray-500 m-2"
      >
        Max Quality
      </button>
      <button
        onClick={() => selectFormat("mp3")}
        className="p-2 bg-gray-500 m-2"
      >
        MP3 Audio
      </button>
      <button
        onClick={() => selectFormat("flac")}
        className="p-2 bg-gray-500 m-2"
      >
        FLAC Audio
      </button>
    </div>
  );
};

export default Step3SelectFormat;
