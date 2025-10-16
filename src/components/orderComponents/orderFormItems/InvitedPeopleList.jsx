import OrderFormItem from "../orderFormItem";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function InvitedPeopleList() {
  const { 
    invitedPeopleList,
    setInvitedPeopleList
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Invited People List">
      <div className="w-full space-y-6">
        
        {/* File Upload Section */}
        <div className="w-full px-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-4">
            <div className="w-full">
              <span className="text-neutral w-full font-medium">Upload List File:</span>
            </div>
            <div className="w-full">
              <input
                type="file"
                accept=".csv,.xlsx,.xls,.txt"
                onChange={(e) => setInvitedPeopleList(e.target.files)}
                className="input input-neutral w-full"
              />
            </div>
          </div>
          {invitedPeopleList && invitedPeopleList.length > 0 && (
            <div className="mt-2 text-sm text-gray-600 px-4 md:px-0 md:ml-[50%]">
              Selected: {invitedPeopleList[0].name}
            </div>
          )}
        </div>

        {/* File Format Instructions */}
        <div className="w-full bg-purple-50 border border-purple-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-purple-800 mb-2">Accepted File Formats:</h4>
          <ul className="text-sm text-purple-700 space-y-1 mb-4">
            <li>• CSV (.csv)</li>
            <li>• Excel (.xlsx, .xls)</li>
            <li>• Text file (.txt)</li>
          </ul>
          
          <h4 className="text-sm font-medium text-purple-800 mb-2">Required Format:</h4>
          <p className="text-sm text-purple-700 mb-2">
            Your file should contain the following columns (in this order):
          </p>
          <div className="bg-white border border-purple-300 rounded p-3 text-sm font-mono">
            <div className="font-bold text-purple-900 mb-1">Name, Email, Phone, Address</div>
            <div className="text-gray-600">John Doe, john@example.com, +1234567890, 123 Main St</div>
            <div className="text-gray-600">Jane Smith, jane@example.com, +0987654321, 456 Oak Ave</div>
          </div>
        </div>

        {/* Example Template Download */}
        <div className="w-full bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Need a Template?</h4>
          <p className="text-sm text-blue-700 mb-3">
            Download our sample template to ensure your file is formatted correctly:
          </p>
          <button
            onClick={() => {
              // Create a sample CSV content
              const csvContent = "Name,Email,Phone,Address\nJohn Doe,john@example.com,+1234567890,123 Main Street\nJane Smith,jane@example.com,+0987654321,456 Oak Avenue";
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'invited_people_template.csv';
              a.click();
              window.URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Download Sample Template (CSV)
          </button>
        </div>

        {/* Tips Section */}
        <div className="w-full bg-green-50 border border-green-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">Tips:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Make sure there are no empty rows in your file</li>
            <li>• Include column headers in the first row</li>
            <li>• Use UTF-8 encoding for special characters</li>
            <li>• Maximum file size: 5MB</li>
            <li>• You can edit your file in Excel, Google Sheets, or any text editor</li>
          </ul>
        </div>

      </div>
    </OrderFormItem>
  );
}
