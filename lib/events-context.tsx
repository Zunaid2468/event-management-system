"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import {
  Event,
  getEvents as getMockEvents,
  getEventById as getMockEventById,
  getUserEvents as getMockUserEvents,
  getUserRsvpedEvents as getMockUserRsvpedEvents,
  createEvent as createMockEvent,
  updateEvent as updateMockEvent,
  deleteEvent as deleteMockEvent,
  toggleRsvp as toggleMockRsvp,
} from "./mock-data"

interface EventsContextType {
  events: Event[]
  refreshEvents: () => void
  getEventById: (id: string) => Event | undefined
  getUserEvents: (userId: string) => Event[]
  getUserRsvpedEvents: () => Event[]
  createEvent: (event: Omit<Event, "id" | "attendees" | "isRsvped">) => Event
  updateEvent: (id: string, updates: Partial<Event>) => Event | undefined
  deleteEvent: (id: string) => boolean
  toggleRsvp: (eventId: string) => boolean
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(() => getMockEvents())

  const refreshEvents = useCallback(() => {
    setEvents(getMockEvents())
  }, [])

  const getEventById = useCallback((id: string) => {
    return getMockEventById(id)
  }, [])

  const getUserEvents = useCallback((userId: string) => {
    return getMockUserEvents(userId)
  }, [])

  const getUserRsvpedEvents = useCallback(() => {
    return getMockUserRsvpedEvents()
  }, [])

  const createEvent = useCallback((event: Omit<Event, "id" | "attendees" | "isRsvped">) => {
    const newEvent = createMockEvent(event)
    refreshEvents()
    return newEvent
  }, [refreshEvents])

  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    const updated = updateMockEvent(id, updates)
    refreshEvents()
    return updated
  }, [refreshEvents])

  const deleteEvent = useCallback((id: string) => {
    const deleted = deleteMockEvent(id)
    refreshEvents()
    return deleted
  }, [refreshEvents])

  const toggleRsvp = useCallback((eventId: string) => {
    const result = toggleMockRsvp(eventId)
    refreshEvents()
    return result
  }, [refreshEvents])

  return (
    <EventsContext.Provider
      value={{
        events,
        refreshEvents,
        getEventById,
        getUserEvents,
        getUserRsvpedEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        toggleRsvp,
      }}
    >
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventsContext)
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider")
  }
  return context
}
