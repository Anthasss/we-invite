import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import FormStepper from "./FormStepper";
import Toast from "../shared/Toast";
import { OrderContext } from "../../contexts/orderContext";
import { useMidtransSnap } from "../../hooks/useMidtransSnap";
import { useOrderPayment } from "../../hooks/useOrderPayment";
import { formStepsConfig } from "./formSteps";

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { productId } = useParams();
  const orderContext = useContext(OrderContext);
  
  // Load Midtrans Snap script
  const { snapLoaded } = useMidtransSnap();
  
  // Handle payment processing
  const { isProcessing, handlePayment, toast, clearToast } = useOrderPayment(productId, orderContext, snapLoaded);
  
  const currentFormStep = formStepsConfig[currentStep];
  const CurrentStepComponent = currentFormStep.component;
  
  const handleNext = () => {
    if (currentStep < formStepsConfig.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === formStepsConfig.length - 1;
  
  return (
    <div className="w-full h-full p-4 md:p-8 pt-0 overflow-hidden">
      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
      
      {/* white background */}
      <div className="w-full h-full bg-primary rounded-xl p-2 md:p-4 md:px-8 grid grid-rows-[auto_auto_1fr_auto] gap-1 md:gap-2 overflow-hidden">
        {/* header */}
        <div className="w-full py-1 md:py-2 flex justify-center items-center text-neutral flex-shrink-0">
          <h1 className="font-great-vibes text-2xl md:text-4xl">Order Form</h1>
        </div>

        {/* step indicator */}
        <div className="w-full flex justify-center items-center text-neutral px-2 py-1 flex-shrink-0">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
            <span className="text-xs md:text-sm">
              Step {currentStep + 1} of {formStepsConfig.length}
            </span>
            <span className="text-base md:text-lg font-semibold">
              {currentFormStep.title}
            </span>
          </div>
        </div>

        {/* current form step */}
        <div className="w-full h-full overflow-y-auto overflow-x-hidden min-h-0">
          <CurrentStepComponent />
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
          
          <FormStepper 
            currentStep={currentStep} 
            totalSteps={formStepsConfig.length}
            steps={formStepsConfig}
          />

          <button
            onClick={isLastStep ? handlePayment : handleNext}
            disabled={isProcessing}
            className={`px-3 md:px-6 py-2 rounded-md font-medium text-sm md:text-base transition-colors ${
              isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/80'
            }`}
          >
            {isProcessing ? 'Processing...' : (isLastStep ? 'Finish' : 'Next')}
          </button>
        </div>
      </div>
    </div>
  );
}
