export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image: string
  organizer: {
    id: string
    name: string
    avatar: string
  }
  attendees: number
  maxAttendees: number
  price: number
  isRsvped?: boolean
}

export const CATEGORIES = [
  "Technology",
  "Music",
  "Art",
  "Sports",
  "Food",
  "Business",
  "Health",
  "Education",
]

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Tech Innovation Summit 2026",
    description: "Join industry leaders and innovators for a full day of insights into the future of technology. Featuring keynote speeches, panel discussions, and networking opportunities with top tech professionals.",
    date: "2026-03-15",
    time: "09:00",
    location: "San Francisco Convention Center",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    organizer: { id: "1", name: "John Doe", avatar: "JD" },
    attendees: 245,
    maxAttendees: 500,
    price: 149,
  },
  {
    id: "2",
    title: "Jazz Night Under the Stars",
    description: "An evening of smooth jazz performances in a beautiful outdoor setting. Enjoy world-class musicians while sipping on craft cocktails and gourmet bites.",
    date: "2026-03-20",
    time: "19:00",
    location: "Central Park Amphitheater",
    category: "Music",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop",
    organizer: { id: "2", name: "Jane Smith", avatar: "JS" },
    attendees: 180,
    maxAttendees: 300,
    price: 75,
  },
  {
    id: "3",
    title: "Modern Art Exhibition Opening",
    description: "Be the first to experience our new collection featuring emerging artists from around the world. Wine and hors d'oeuvres will be served.",
    date: "2026-03-25",
    time: "18:00",
    location: "Metropolitan Gallery",
    category: "Art",
    image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&auto=format&fit=crop",
    organizer: { id: "1", name: "John Doe", avatar: "JD" },
    attendees: 89,
    maxAttendees: 150,
    price: 25,
  },
  {
    id: "4",
    title: "Marathon Training Workshop",
    description: "Professional coaches will guide you through training techniques, nutrition advice, and race strategy for your upcoming marathon.",
    date: "2026-04-01",
    time: "07:00",
    location: "City Sports Complex",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop",
    organizer: { id: "2", name: "Jane Smith", avatar: "JS" },
    attendees: 45,
    maxAttendees: 100,
    price: 50,
  },
  {
    id: "5",
    title: "Culinary Masterclass: Italian Cuisine",
    description: "Learn authentic Italian cooking techniques from Chef Marco Rossi. Includes hands-on pasta making and a full meal tasting.",
    date: "2026-04-05",
    time: "14:00",
    location: "Downtown Culinary School",
    category: "Food",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop",
    organizer: { id: "1", name: "John Doe", avatar: "JD" },
    attendees: 18,
    maxAttendees: 24,
    price: 120,
  },
  {
    id: "6",
    title: "Startup Pitch Competition",
    description: "Watch the most promising startups pitch their ideas to a panel of venture capitalists. Network with founders and investors.",
    date: "2026-04-10",
    time: "10:00",
    location: "Innovation Hub",
    category: "Business",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop",
    organizer: { id: "2", name: "Jane Smith", avatar: "JS" },
    attendees: 156,
    maxAttendees: 200,
    price: 0,
  },
  {
    id: "7",
    title: "Yoga & Meditation Retreat",
    description: "A day-long retreat focused on mindfulness, yoga practice, and inner peace. All experience levels welcome.",
    date: "2026-04-15",
    time: "08:00",
    location: "Serenity Wellness Center",
    category: "Health",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop",
    organizer: { id: "1", name: "John Doe", avatar: "JD" },
    attendees: 32,
    maxAttendees: 40,
    price: 85,
  },
  {
    id: "8",
    title: "AI & Machine Learning Conference",
    description: "Deep dive into the latest advancements in artificial intelligence and machine learning with expert researchers and practitioners.",
    date: "2026-04-20",
    time: "09:00",
    location: "Tech Campus Auditorium",
    category: "Education",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
    organizer: { id: "2", name: "Jane Smith", avatar: "JS" },
    attendees: 320,
    maxAttendees: 400,
    price: 199,
  },
]

// Event store for managing state
let events = [...MOCK_EVENTS]
let userRsvps: string[] = []

export function getEvents(): Event[] {
  return events.map(e => ({
    ...e,
    isRsvped: userRsvps.includes(e.id)
  }))
}

export function getEventById(id: string): Event | undefined {
  const event = events.find((e) => e.id === id)
  if (event) {
    return { ...event, isRsvped: userRsvps.includes(event.id) }
  }
  return undefined
}

export function getUserEvents(userId: string): Event[] {
  return events
    .filter((e) => e.organizer.id === userId)
    .map(e => ({ ...e, isRsvped: userRsvps.includes(e.id) }))
}

export function getUserRsvpedEvents(): Event[] {
  return events
    .filter((e) => userRsvps.includes(e.id))
    .map(e => ({ ...e, isRsvped: true }))
}

export function createEvent(event: Omit<Event, "id" | "attendees" | "isRsvped">): Event {
  const newEvent: Event = {
    ...event,
    id: String(Date.now()),
    attendees: 0,
  }
  events = [newEvent, ...events]
  return newEvent
}

export function updateEvent(id: string, updates: Partial<Event>): Event | undefined {
  const index = events.findIndex((e) => e.id === id)
  if (index !== -1) {
    events[index] = { ...events[index], ...updates }
    return events[index]
  }
  return undefined
}

export function deleteEvent(id: string): boolean {
  const initialLength = events.length
  events = events.filter((e) => e.id !== id)
  return events.length < initialLength
}

export function toggleRsvp(eventId: string): boolean {
  const event = events.find((e) => e.id === eventId)
  if (!event) return false
  
  const isRsvped = userRsvps.includes(eventId)
  if (isRsvped) {
    userRsvps = userRsvps.filter(id => id !== eventId)
    event.attendees = Math.max(0, event.attendees - 1)
  } else {
    if (event.attendees >= event.maxAttendees) return false
    userRsvps.push(eventId)
    event.attendees += 1
  }
  return true
}
