import { EventsDTO } from "../model/Events";
import api from "./api";

export const getAllEvents = async (): Promise<EventsDTO> => {
    const response = await api.get(`/events/public_events`)
    return response.data;
}