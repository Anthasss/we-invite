import OrderFormItem from "../orderFormItem";
import { useState } from "react";

export default function FormOverview({ onContinue, selectedModules, setSelectedModules }) {
  // Mandatory modules - always included
  const mandatoryModules = [
    { id: "groom", title: "Groom's Information", description: "Full name, nickname, parents' names, birth order" },
    { id: "bride", title: "Bride's Information", description: "Full name, nickname, parents' names, birth order" },
    { id: "events", title: "Events Information", description: "Wedding events with title, date, time, location, and address" },
    { id: "media", title: "Media Files", description: "Background sound and photo gallery" },
    { id: "invitedPeople", title: "Invited People List", description: "Upload CSV/Excel file with guest list" }
  ];

  // Additional modules - user can select
  const additionalModules = [
    { id: "holyVerse", title: "Holy Verse / Quote", description: "Add a meaningful verse or quote with source" },
    { id: "weddingGift", title: "Wedding Gift Information", description: "Bank account details for monetary gifts" },
    { id: "additional", title: "Additional Information", description: "Livestream link and couple's notes" }
  ];

  const handleModuleToggle = (moduleId) => {
    if (selectedModules.includes(moduleId)) {
      setSelectedModules(selectedModules.filter(id => id !== moduleId));
    } else {
      setSelectedModules([...selectedModules, moduleId]);
    }
  };

  return (
    <div className="w-full">
      <OrderFormItem label="Order Form Overview">
        <div className="w-full space-y-6">
          
          {/* Introduction */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to the Wedding Invitation Order Form!</h3>
            <p className="text-sm text-blue-800">
              This form will guide you through creating your personalized wedding invitation. 
              Review the modules below and select the additional features you'd like to include.
            </p>
          </div>

          {/* Modules Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Mandatory Modules - Left Side */}
            <div className="w-full">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                  <span>✓</span>
                  <span>Mandatory Modules</span>
                </h3>
                <p className="text-sm text-green-800 mb-4">
                  These modules are required for your wedding invitation.
                </p>
                
                <div className="space-y-3">
                  {mandatoryModules.map((module) => (
                    <div 
                      key={module.id}
                      className="bg-white border border-green-300 rounded-md p-3 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Modules - Right Side */}
            <div className="w-full">
              <div className="bg-purple-50 border-2 border-purple-500 rounded-lg p-4">
                <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center gap-2">
                  <span>+</span>
                  <span>Additional Modules</span>
                </h3>
                <p className="text-sm text-purple-800 mb-4">
                  Select the additional features you'd like to include (optional).
                </p>
                
                <div className="space-y-3">
                  {additionalModules.map((module) => (
                    <div 
                      key={module.id}
                      className={`bg-white border-2 rounded-md p-3 shadow-sm cursor-pointer transition-all ${
                        selectedModules.includes(module.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-300'
                      }`}
                      onClick={() => handleModuleToggle(module.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedModules.includes(module.id)
                              ? 'bg-purple-500 border-purple-500'
                              : 'bg-white border-gray-400'
                          }`}>
                            {selectedModules.includes(module.id) && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="w-full bg-gray-50 border border-gray-300 rounded-md p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Total Modules:</strong> {mandatoryModules.length + selectedModules.length} 
                <span className="text-gray-500 ml-1">
                  ({mandatoryModules.length} mandatory + {selectedModules.length} additional)
                </span>
              </p>
              <p>
                <strong>Estimated Time:</strong> ~{(mandatoryModules.length + selectedModules.length) * 2} minutes
              </p>
            </div>
          </div>

          {/* Continue Button */}
          <div className="w-full flex justify-center pt-4">
            <button
              onClick={onContinue}
              className="px-8 py-3 bg-secondary text-white rounded-md font-semibold text-lg hover:bg-secondary/80 transition-colors shadow-md"
            >
              Continue to Form →
            </button>
          </div>

        </div>
      </OrderFormItem>
    </div>
  );
}
