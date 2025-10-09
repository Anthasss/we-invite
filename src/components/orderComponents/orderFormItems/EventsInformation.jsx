import OrderFormItem from "../orderFormItem";
import FormField from "../FormField";
import { OrderContext } from "../../../contexts/orderContext";
import { useContext } from "react";

export default function EventsInformation() {
  const { 
    events,
    addEvent,
    updateEvent,
    removeEvent
  } = useContext(OrderContext);

  return (
    <OrderFormItem label="Events Information">
      {/* Add Event Button */}
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={addEvent}
          className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/80 transition-colors"
        >
          + Add Event
        </button>
      </div>

      {/* Display all events */}
      {events.length === 0 ? (
        <div className="w-full text-center text-gray-500 py-8">
          <p>No events added yet. Click "Add Event" to get started.</p>
        </div>
      ) : (
        <div className="w-full space-y-6">
          {events.map((event, index) => (
            <div key={event.id} className="w-full border border-gray-300 rounded-lg p-4 space-y-4">
              {/* Event Header */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-neutral">
                  Event {index + 1}
                </h3>
                {events.length > 1 && (
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Event Fields */}
              <FormField
                label="Title:"
                value={event.title}
                setvalue={(value) => updateEvent(event.id, 'title', value)}
                type="text"
              />
              
              <FormField
                label="Date:"
                value={event.date}
                setvalue={(value) => updateEvent(event.id, 'date', value)}
                type="date"
              />
              
              <FormField
                label="Time:"
                value={event.time}
                setvalue={(value) => updateEvent(event.id, 'time', value)}
                type="time"
              />
              
              <FormField
                label="Location:"
                value={event.location}
                setvalue={(value) => updateEvent(event.id, 'location', value)}
                type="text"
              />
              
              <FormField
                label="Location Address:"
                value={event.locationAddress}
                setvalue={(value) => updateEvent(event.id, 'locationAddress', value)}
                type="text"
              />
            </div>
          ))}
        </div>
      )}
    </OrderFormItem>
  );
}