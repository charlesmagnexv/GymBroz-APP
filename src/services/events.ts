import { AxiosResponse } from "axios";
import { EventTypeDTO, EventsDTO } from "../model/Events";
import api from "./api";

export const getAllEvents = async (): Promise<EventsDTO> => {
    const response = await api.get(`/events/public_events`)
    return response.data;
}

export const getEventsByTypes = async (idEvent: number): Promise<EventsDTO> => {
    const response = await api.get(`/events/public_events?eventTypeId=${idEvent}`)
    return response.data;
}

export const getEventsTypes = async (): Promise<AxiosResponse<EventTypeDTO>> => {
    const response = await api.get(`/event_types/event_types`)
    return response
}