import { useState } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Step1EnterDetails from "./components/Step1EnterDetails";
import Step2SearchResults from "./components/Step2SearchResults";
import Step3SelectFormat from "./components/Step3SelectFormat";
import Step4Downloading from "./components/Step4Downloading";
import Step5Complete from "./components/Step5Complete";
import { ServerDetails, Video } from "./types";

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [serverDetails, setServerDetails] = useState<ServerDetails>({
    ip: "localhost",
    port: "8000",
  });
  const [searchResults, setSearchResults] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [downloadFormat, setDownloadFormat] = useState<string>("");

  return (
    <div className="dark-theme min-h-screen p-6 text-white">
      <ThemeSwitcher />
      {currentStep === 1 && (
        <Step1EnterDetails
          setServerDetails={setServerDetails}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 2 && (
        <Step2SearchResults
          serverDetails={serverDetails}
          setSearchResults={setSearchResults}
          setSelectedVideo={setSelectedVideo}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 3 && selectedVideo && (
        <Step3SelectFormat
          selectedVideo={selectedVideo}
          setDownloadFormat={setDownloadFormat}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 4 && selectedVideo && (
        <Step4Downloading
          serverDetails={serverDetails}
          selectedVideo={selectedVideo}
          downloadFormat={downloadFormat}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 5 && <Step5Complete setCurrentStep={setCurrentStep} />}
    </div>
  );
}

export default App;
