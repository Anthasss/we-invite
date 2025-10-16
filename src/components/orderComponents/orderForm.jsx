import { useState, useMemo } from "react";
import FormOverview from "./orderFormItems/FormOverview";
import GroomInformation from "./orderFormItems/GroomInformation";
import BrideInformation from "./orderFormItems/BrideInformation";
import EventsInformation from "./orderFormItems/EventsInformation";
import MediaFiles from "./orderFormItems/MediaFiles";
import InvitedPeopleList from "./orderFormItems/InvitedPeopleList";
import HolyVerseQuote from "./orderFormItems/HolyVerseQuote";
import WeddingGift from "./orderFormItems/WeddingGift";
import AdditionalFields from "./orderFormItems/AdditionalFields";

export default function OrderForm() {
  const [showOverview, setShowOverview] = useState(true);
  const [selectedModules, setSelectedModules] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define all form steps (mandatory + optional)
  const allFormSteps = useMemo(() => {
    const mandatory = [
      { id: "groom", title: "Groom's Information", component: <GroomInformation />, type: "mandatory" },
      { id: "bride", title: "Bride's Information", component: <BrideInformation />, type: "mandatory" },
      { id: "events", title: "Events Information", component: <EventsInformation />, type: "mandatory" },
      { id: "media", title: "Media Files", component: <MediaFiles />, type: "mandatory" },
      { id: "invitedPeople", title: "Invited People List", component: <InvitedPeopleList />, type: "mandatory" }
    ];
    
    const optional = [
      { id: "holyVerse", title: "Holy Verse/Quote", component: <HolyVerseQuote />, type: "optional" },
      { id: "weddingGift", title: "Wedding Gift", component: <WeddingGift />, type: "optional" },
      { id: "additional", title: "Additional Info", component: <AdditionalFields />, type: "optional" }
    ];
    
    // Include mandatory steps and selected optional steps
    const selectedOptional = optional.filter(step => selectedModules.includes(step.id));
    return [...mandatory, ...selectedOptional];
  }, [selectedModules]);
  
  const currentFormStep = allFormSteps[currentStep];
  
  const handleNext = () => {
    if (currentStep < allFormSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleContinueFromOverview = () => {
    setShowOverview(false);
    setCurrentStep(0);
  };
  
  const handleBackToOverview = () => {
    setShowOverview(true);
    setCurrentStep(0);
  };
  
  // If showing overview, render the overview screen
  if (showOverview) {
    return (
      <div className="w-full h-full p-4 md:p-8 pt-0 overflow-hidden">
        <div className="w-full h-full bg-primary rounded-xl p-2 md:p-4 md:px-8 grid grid-rows-[auto_1fr] gap-1 md:gap-2 overflow-hidden">
          <div className="w-full py-1 md:py-2 flex justify-center items-center text-neutral flex-shrink-0">
            <h1 className="font-great-vibes text-2xl md:text-4xl">Order Form</h1>
          </div>
          <div className="w-full h-full overflow-y-auto overflow-x-hidden min-h-0">
            <FormOverview 
              onContinue={handleContinueFromOverview}
              selectedModules={selectedModules}
              setSelectedModules={setSelectedModules}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 md:p-8 pt-0 overflow-hidden">
      {/* white background */}
      <div className="w-full h-full bg-primary rounded-xl p-2 md:p-4 md:px-8 grid grid-rows-[auto_auto_1fr_auto] gap-1 md:gap-2 overflow-hidden">
        {/* header */}
        <div className="w-full py-1 md:py-2 flex justify-center items-center text-neutral flex-shrink-0">
          <h1 className="font-great-vibes text-2xl md:text-4xl">Order Form</h1>
        </div>

        {/* step indicator */}
        <div className="w-full flex justify-between items-center text-neutral px-2 py-1 flex-shrink-0">
          <button
            onClick={handleBackToOverview}
            className="text-xs md:text-sm text-secondary hover:text-secondary/80 underline"
          >
            ← Back to Overview
          </button>
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
            <span className="text-xs md:text-sm">Step {currentStep + 1} of {allFormSteps.length}</span>
            <span className="text-base md:text-lg font-semibold">{currentFormStep.title}</span>
          </div>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* current form step */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden min-h-0">
          {currentFormStep.component}
        </div>

        {/* navigation buttons */}
        <div className="w-full flex justify-between items-center p-2 md:p-4 flex-shrink-0">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-3 md:px-6 py-2 rounded-md font-medium text-sm md:text-base transition-colors ${
              currentStep === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/80'
            }`}
          >
            Back
          </button>
          
          <div className="flex gap-1 md:gap-2">
            {allFormSteps.map((step, index) => (
              <div
                key={step.id}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
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
            disabled={currentStep === allFormSteps.length - 1}
            className={`px-3 md:px-6 py-2 rounded-md font-medium text-sm md:text-base transition-colors ${
              currentStep === allFormSteps.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/80'
            }`}
          >
            {currentStep === allFormSteps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
