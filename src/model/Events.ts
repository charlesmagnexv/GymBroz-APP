export interface EventsDTO {
  events: Event[]
  count: number
}

export interface Event {
  id: number;
  title: string;
  description: string;
  eventTypeId: number
  eventDate: string;
  isPublic: boolean;
  hasLimit: boolean;
  limitCount?: number;
  isActive: boolean;
  geocode: number[];
  address: string;
  adminId: number;
  eventType: EventType;
}

export interface EventType {
  id: number;
  title: string;
  eventTypeIconUrl: string;
}

export interface Categories {
  id: number
  title: string
  eventTypeIconUrl: string
}

export interface EventTypeDTO {
  eventTypes: Categories[]
}