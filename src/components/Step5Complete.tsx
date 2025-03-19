import { StepProps } from "../types";

const Step5Complete: React.FC<StepProps> = ({ setCurrentStep }) => (
  <div className="text-center">
    <h1 className="text-2xl font-bold">Download Complete</h1>
    <p className="mt-4">Your file has been downloaded successfully!</p>
    <button
      onClick={() => setCurrentStep(1)}
      className="p-2 mt-4 bg-green-500 text-white"
    >
      Download Another
    </button>
  </div>
);

export default Step5Complete;
