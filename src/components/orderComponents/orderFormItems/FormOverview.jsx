import OrderFormItem from "../orderFormItem";

export default function FormOverview({ onContinue }) {
  // Form modules
  const modules = [
    { id: "groom", title: "Groom's Information", description: "Full name, nickname, parents' names, birth order" },
    { id: "bride", title: "Bride's Information", description: "Full name, nickname, parents' names, birth order" },
    { id: "events", title: "Events Information", description: "Wedding events with title, date, time, location, and address" },
    { id: "media", title: "Media Files", description: "Background sound and photo gallery" },
    { id: "invitedPeople", title: "Invited People List", description: "Upload CSV/Excel file with guest list" }
  ];

  return (
    <div className="w-full">
      <OrderFormItem label="Order Form Overview">
        <div className="w-full space-y-6">
          
          {/* Introduction */}
          <div className="w-full bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to the Wedding Invitation Order Form!</h3>
            <p className="text-sm text-blue-800">
              This form will guide you through creating your personalized wedding invitation. 
              Review the modules below to see what information you'll need to provide.
            </p>
          </div>

          {/* Modules List */}
          <div className="w-full">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
              <h3 className="text-xl font-bold text-green-900 mb-3 flex items-center gap-2">
                <span>✓</span>
                <span>Form Modules</span>
              </h3>
              <p className="text-sm text-green-800 mb-4">
                The following modules are required for your wedding invitation.
              </p>
              
              <div className="space-y-3">
                {modules.map((module) => (
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

          {/* Summary */}
          <div className="w-full bg-gray-50 border border-gray-300 rounded-md p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Total Modules:</strong> {modules.length}
              </p>
              <p>
                <strong>Estimated Time:</strong> ~{modules.length * 2} minutes
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
