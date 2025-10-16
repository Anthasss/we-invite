import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // MANDATORY FIELDS
  
  // Bride & Groom Info
  const [groomFullName, setGroomFullName] = useState("");
  const [groomNickname, setGroomNickname] = useState("");
  const [groomFatherName, setGroomFatherName] = useState("");
  const [groomMotherName, setGroomMotherName] = useState("");
  const [groomChildNumber, setGroomChildNumber] = useState("");
  const [groomTotalChildren, setGroomTotalChildren] = useState("");
  
  const [brideFullName, setBrideFullName] = useState("");
  const [brideNickname, setBrideNickname] = useState("");
  const [brideFatherName, setBrideFatherName] = useState("");
  const [brideMotherName, setBrideMotherName] = useState("");
  const [brideChildNumber, setBrideChildNumber] = useState("");
  const [brideTotalChildren, setBrideTotalChildren] = useState("");
  
  // Events (multiple events can be added)
  const [events, setEvents] = useState([]);
  
  // Helper function to add a new event
  const addEvent = () => {
    const newEvent = {
      id: Date.now(), // simple ID generation
      title: "",
      date: "",
      time: "",
      location: "",
      locationAddress: ""
    };
    setEvents([...events, newEvent]);
  };
  
  // Helper function to update a specific event
  const updateEvent = (eventId, field, value) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, [field]: value } : event
    ));
  };
  
  // Helper function to remove an event
  const removeEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };
  
  // Media Files
  const [backSound, setBackSound] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [invitedPeopleList, setInvitedPeopleList] = useState(null);
  
  // ADDITIONAL FIELDS
  
  // Holy Verse / Quote
  const [holyVerseText, setHolyVerseText] = useState("");
  const [holyVerseSource, setHolyVerseSource] = useState("");
  
  // Wedding Gift
  const [weddingGiftBankNumber, setWeddingGiftBankNumber] = useState("");
  const [weddingGiftRecipient, setWeddingGiftRecipient] = useState("");
  
  // Other Additional Fields
  const [livestreamLink, setLivestreamLink] = useState("");
  const [couplesNotes, setCouplesNotes] = useState("");
  
  // Helper function to reset all form data
  const resetForm = () => {
    // Reset Bride & Groom Info
    setGroomFullName("");
    setGroomNickname("");
    setGroomFatherName("");
    setGroomMotherName("");
    setGroomChildNumber("");
    setGroomTotalChildren("");
    setBrideFullName("");
    setBrideNickname("");
    setBrideFatherName("");
    setBrideMotherName("");
    setBrideChildNumber("");
    setBrideTotalChildren("");
    
    // Reset Events
    setEvents([]);
    
    // Reset Media
    setBackSound(null);
    setGallery([]);
    setInvitedPeopleList(null);
    
    // Reset Additional Fields
    setHolyVerseText("");
    setHolyVerseSource("");
    setWeddingGiftBankNumber("");
    setWeddingGiftRecipient("");
    setLivestreamLink("");
    setCouplesNotes("");
  };
  
  // Values to be provided in the context
  const value = {
    // Groom Info
    groomFullName,
    setGroomFullName,
    groomNickname,
    setGroomNickname,
    groomFatherName,
    setGroomFatherName,
    groomMotherName,
    setGroomMotherName,
    groomChildNumber,
    setGroomChildNumber,
    groomTotalChildren,
    setGroomTotalChildren,
    
    // Bride Info
    brideFullName,
    setBrideFullName,
    brideNickname,
    setBrideNickname,
    brideFatherName,
    setBrideFatherName,
    brideMotherName,
    setBrideMotherName,
    brideChildNumber,
    setBrideChildNumber,
    brideTotalChildren,
    setBrideTotalChildren,
    
    // Events
    events,
    setEvents,
    addEvent,
    updateEvent,
    removeEvent,
    
    // Media Files
    backSound,
    setBackSound,
    gallery,
    setGallery,
    invitedPeopleList,
    setInvitedPeopleList,
    
    // Additional Fields
    holyVerseText,
    setHolyVerseText,
    holyVerseSource,
    setHolyVerseSource,
    weddingGiftBankNumber,
    setWeddingGiftBankNumber,
    weddingGiftRecipient,
    setWeddingGiftRecipient,
    livestreamLink,
    setLivestreamLink,
    couplesNotes,
    setCouplesNotes,
    
    // Utility functions
    resetForm,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};