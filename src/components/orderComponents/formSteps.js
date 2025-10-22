import GroomInformation from "./orderFormItems/GroomInformation";
import BrideInformation from "./orderFormItems/BrideInformation";
import EventsInformation from "./orderFormItems/EventsInformation";
import MediaFiles from "./orderFormItems/MediaFiles";
import InvitedPeopleList from "./orderFormItems/InvitedPeopleList";

/**
 * Configuration for all order form steps
 */
export const formStepsConfig = [
  { 
    id: "groom", 
    title: "Groom's Information", 
    component: GroomInformation 
  },
  { 
    id: "bride", 
    title: "Bride's Information", 
    component: BrideInformation 
  },
  { 
    id: "events", 
    title: "Events Information", 
    component: EventsInformation 
  },
  { 
    id: "media", 
    title: "Media Files", 
    component: MediaFiles 
  },
  { 
    id: "invitedPeople", 
    title: "Invited People List", 
    component: InvitedPeopleList 
  }
];
