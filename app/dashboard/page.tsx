"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useEvents } from "@/lib/events-context"
import { Navbar } from "@/components/navbar"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, Users, Ticket } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { events } = useEvents()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const myEvents = events.filter((event) => event.organizer.id === user.id)
  const attendingEvents = events.filter(
    (event) =>
      event.attendees.some((a) => a.id === user.id) &&
      event.organizer.id !== user.id
  )

  const upcomingMyEvents = myEvents.filter(
    (event) => new Date(event.date) >= new Date()
  )
  const pastMyEvents = myEvents.filter(
    (event) => new Date(event.date) < new Date()
  )
  const upcomingAttending = attendingEvents.filter(
    (event) => new Date(event.date) >= new Date()
  )

  const totalAttendees = myEvents.reduce(
    (sum, event) => sum + event.attendees.length,
    0
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              Welcome back, {user.name}! Manage your events here.
            </p>
          </div>
          <Button asChild>
            <Link href="/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                My Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{myEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingMyEvents.length} upcoming
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Attendees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAttendees}</div>
              <p className="text-xs text-muted-foreground">
                Across all your events
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Events Attending
              </CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{attendingEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                {upcomingAttending.length} upcoming
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Past Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastMyEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                Events you{"'"}ve hosted
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-events" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="attending">Attending</TabsTrigger>
          </TabsList>

          <TabsContent value="my-events" className="space-y-6">
            {myEvents.length === 0 ? (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">No events yet</h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    You haven{"'"}t created any events yet. Start by creating your
                    first event!
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/events/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {myEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="attending" className="space-y-6">
            {attendingEvents.length === 0 ? (
              <Card className="py-12">
                <CardContent className="flex flex-col items-center justify-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-4">
                    <Ticket className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Not attending any events</h3>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    You haven{"'"}t RSVP{"'"}d to any events yet. Browse events to find
                    something interesting!
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/events">Browse Events</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {attendingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
