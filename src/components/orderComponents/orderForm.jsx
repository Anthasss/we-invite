import { useState } from "react";
import GroomInformation from "./orderFormItems/GroomInformation";
import BrideInformation from "./orderFormItems/BrideInformation";
import EventsInformation from "./orderFormItems/EventsInformation";
import MediaFiles from "./orderFormItems/MediaFiles";
import HolyVerseQuote from "./orderFormItems/HolyVerseQuote";
import WeddingGift from "./orderFormItems/WeddingGift";
import AdditionalFields from "./orderFormItems/AdditionalFields";

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define all form steps
  const formSteps = [
    { id: 0, title: "Groom's Information", component: <GroomInformation /> },
    { id: 1, title: "Bride's Information", component: <BrideInformation /> },
    { id: 2, title: "Events Information", component: <EventsInformation /> },
    { id: 3, title: "Media Files", component: <MediaFiles /> },
    { id: 4, title: "Holy Verse/Quote", component: <HolyVerseQuote /> },
    { id: 5, title: "Wedding Gift", component: <WeddingGift /> },
    { id: 6, title: "Additional Info", component: <AdditionalFields /> }
  ];
  
  const currentFormStep = formSteps[currentStep];
  
  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full p-8 pt-0">
      {/* white background */}
      <div className="w-full h-full bg-primary rounded-xl p-4 px-8 grid grid-rows-[auto_auto_1fr_auto] gap-4 min-h-0">
        {/* header */}
        <div className="w-full p-4 pb-0 flex justify-center items-center text-neutral">
          <h1 className="font-great-vibes text-4xl">Order Form</h1>
        </div>

        {/* step indicator */}
        <div className="w-full flex justify-center items-center text-neutral">
          <div className="flex items-center gap-2">
            <span className="text-sm">Step {currentStep + 1} of {formSteps.length}</span>
            <span className="text-lg font-semibold">{currentFormStep.title}</span>
          </div>
        </div>

        {/* current form step */}
        <div className="w-full h-full overflow-auto min-h-0">
          {currentFormStep.component}
        </div>

        {/* navigation buttons */}
        <div className="w-full flex justify-between items-center p-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/80'
            }`}
          >
            Back
          </button>
          
          <div className="flex gap-2">
            {formSteps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-secondary'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentStep === formSteps.length - 1}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              currentStep === formSteps.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/80'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
