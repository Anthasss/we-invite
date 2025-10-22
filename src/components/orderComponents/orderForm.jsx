import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import GroomInformation from "./orderFormItems/GroomInformation";
import BrideInformation from "./orderFormItems/BrideInformation";
import EventsInformation from "./orderFormItems/EventsInformation";
import MediaFiles from "./orderFormItems/MediaFiles";
import InvitedPeopleList from "./orderFormItems/InvitedPeopleList";
import FormStepper from "./FormStepper";
import { OrderContext } from "../../contexts/orderContext";
import { createMidtransTransaction } from "../../services/api";

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [snapLoaded, setSnapLoaded] = useState(false);
  const { productId } = useParams();
  const { user, isAuthenticated } = useAuth0();
  const orderContext = useContext(OrderContext);

  // Load Midtrans Snap script dynamically
  useEffect(() => {
    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    const snapScriptUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js';

    if (!midtransClientKey) {
      console.error('Midtrans client key is not configured');
      return;
    }

    // Check if script is already loaded
    if (window.snap) {
      setSnapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = snapScriptUrl;
    script.setAttribute('data-client-key', midtransClientKey);
    script.onload = () => {
      setSnapLoaded(true);
      console.log('Midtrans Snap loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load Midtrans Snap script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  
  // Define all form steps
  const allFormSteps = [
    { id: "groom", title: "Groom's Information", component: <GroomInformation /> },
    { id: "bride", title: "Bride's Information", component: <BrideInformation /> },
    { id: "events", title: "Events Information", component: <EventsInformation /> },
    { id: "media", title: "Media Files", component: <MediaFiles /> },
    { id: "invitedPeople", title: "Invited People List", component: <InvitedPeopleList /> }
  ];
  
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

  const handleFinish = async () => {
    if (!isAuthenticated) {
      alert("Please log in to complete your order");
      return;
    }

    if (!snapLoaded) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare wedding info from context
      const weddingInfo = {
        groom: {
          fullName: orderContext.groomFullName,
          nickname: orderContext.groomNickname,
          fatherName: orderContext.groomFatherName,
          motherName: orderContext.groomMotherName,
          childNumber: orderContext.groomChildNumber,
          totalChildren: orderContext.groomTotalChildren,
        },
        bride: {
          fullName: orderContext.brideFullName,
          nickname: orderContext.brideNickname,
          fatherName: orderContext.brideFatherName,
          motherName: orderContext.brideMotherName,
          childNumber: orderContext.brideChildNumber,
          totalChildren: orderContext.brideTotalChildren,
        },
        events: orderContext.events,
        media: {
          backSound: orderContext.backSound,
          gallery: orderContext.gallery,
          invitedPeopleList: orderContext.invitedPeopleList,
        },
        additional: {
          holyVerseText: orderContext.holyVerseText,
          holyVerseSource: orderContext.holyVerseSource,
          weddingGiftBankNumber: orderContext.weddingGiftBankNumber,
          weddingGiftRecipient: orderContext.weddingGiftRecipient,
          livestreamLink: orderContext.livestreamLink,
          couplesNotes: orderContext.couplesNotes,
        },
      };

      // Prepare payload
      const payload = {
        orderId: `ORDER-${Date.now()}`, // Generate unique order ID
        productId: productId,
        userId: user.sub,
        weddingInfo: weddingInfo,
      };

      // Call the backend API
      const response = await createMidtransTransaction(payload);

      // Extract token from transaction object
      const snapToken = response.transaction?.token;

      if (!snapToken) {
        throw new Error("No Snap token received from server");
      }

      // Load Midtrans Snap and open payment page
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function (result) {
            console.log("Payment success:", result);
            alert("Payment successful!");
            // Optionally reset form or redirect
            orderContext.resetForm();
          },
          onPending: function (result) {
            console.log("Payment pending:", result);
            alert("Payment is pending. Please complete your payment.");
          },
          onError: function (result) {
            console.log("Payment error:", result);
            alert("Payment failed. Please try again.");
          },
          onClose: function () {
            console.log("Payment popup closed");
          },
        });
      } else {
        throw new Error("Midtrans Snap is not loaded");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="w-full h-full p-4 md:p-8 pt-0 overflow-hidden">
      {/* white background */}
      <div className="w-full h-full bg-primary rounded-xl p-2 md:p-4 md:px-8 grid grid-rows-[auto_auto_1fr_auto] gap-1 md:gap-2 overflow-hidden">
        {/* header */}
        <div className="w-full py-1 md:py-2 flex justify-center items-center text-neutral flex-shrink-0">
          <h1 className="font-great-vibes text-2xl md:text-4xl">Order Form</h1>
        </div>

        {/* step indicator */}
        <div className="w-full flex justify-center items-center text-neutral px-2 py-1 flex-shrink-0">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-center">
            <span className="text-xs md:text-sm">Step {currentStep + 1} of {allFormSteps.length}</span>
            <span className="text-base md:text-lg font-semibold">{currentFormStep.title}</span>
          </div>
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
          
          <FormStepper 
            currentStep={currentStep} 
            totalSteps={allFormSteps.length}
            steps={allFormSteps}
          />

          <button
            onClick={currentStep === allFormSteps.length - 1 ? handleFinish : handleNext}
            disabled={isProcessing}
            className={`px-3 md:px-6 py-2 rounded-md font-medium text-sm md:text-base transition-colors ${
              isProcessing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/80'
            }`}
          >
            {isProcessing ? 'Processing...' : (currentStep === allFormSteps.length - 1 ? 'Finish' : 'Next')}
          </button>
        </div>
      </div>
    </div>
  );
}
