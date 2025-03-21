export interface ServerDetails {
  ip: string;
  port: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

export interface StepProps {
  setCurrentStep: (step: number) => void;
  // setSelectedVideo: (video: Video) => void;
}

export interface SearchProps extends StepProps {
  // serverDetails: ServerDetails;
  searchResults: Video[]; // Add this
  setSearchResults: (results: Video[]) => void;
  setSelectedVideo: (video: Video) => void;
}

export interface FormatProps extends StepProps {
  selectedVideo: Video;
  setDownloadFormat: (format: string) => void;
}

export interface DownloadProps extends StepProps {
  // serverDetails: ServerDetails;
  selectedVideo: Video;
  downloadFormat: string;
}
