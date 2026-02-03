"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { useAuth } from "@/lib/auth-context"
import { useEvents } from "@/lib/events-context"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Edit,
  Trash2,
  Share2,
  CheckCircle,
} from "lucide-react"
import { toast } from "sonner"

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-500/10 text-blue-700 border-blue-200",
  Business: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  Music: "bg-pink-500/10 text-pink-700 border-pink-200",
  Sports: "bg-orange-500/10 text-orange-700 border-orange-200",
  Art: "bg-purple-500/10 text-purple-700 border-purple-200",
  Food: "bg-amber-500/10 text-amber-700 border-amber-200",
  Health: "bg-teal-500/10 text-teal-700 border-teal-200",
  Education: "bg-indigo-500/10 text-indigo-700 border-indigo-200",
}

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const { events, rsvpToEvent, deleteEvent } = useEvents()

  const event = events.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground">Event not found</h1>
          <p className="mt-2 text-muted-foreground">
            The event you{"'"}re looking for doesn{"'"}t exist.
          </p>
          <Button asChild className="mt-4">
            <Link href="/events">Browse Events</Link>
          </Button>
        </main>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const isPast = eventDate < new Date()
  const isOrganizer = user?.id === event.organizer.id
  const isAttending = user ? event.attendees.some((a) => a.id === user.id) : false
  const isFull = event.attendees.length >= event.capacity

  const handleRSVP = () => {
    if (!user) {
      router.push("/login")
      return
    }
    rsvpToEvent(event.id)
    if (isAttending) {
      toast.success("You have cancelled your RSVP")
    } else {
      toast.success("You have RSVP'd to this event!")
    }
  }

  const handleDelete = () => {
    deleteEvent(event.id)
    toast.success("Event deleted successfully")
    router.push("/dashboard")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch {
        // User cancelled sharing
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          asChild
          className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/events">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              {isPast && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    Past Event
                  </Badge>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={`${categoryColors[event.category] || "bg-muted text-muted-foreground"} border`}
                >
                  {event.category}
                </Badge>
                {isAttending && (
                  <Badge className="bg-accent text-accent-foreground gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Attending
                  </Badge>
                )}
              </div>

              <h1 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                {event.title}
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {event.organizer.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Organized by {event.organizer.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.organizer.email}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="prose prose-neutral max-w-none">
                <h2 className="text-xl font-semibold text-foreground">About this event</h2>
                <p className="mt-4 whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-foreground">
                        {format(eventDate, "EEEE, MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-medium text-foreground">
                        {event.attendees.length} / {event.capacity} attendees
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  {!isPast && !isOrganizer && (
                    <Button
                      className="w-full"
                      onClick={handleRSVP}
                      disabled={isFull && !isAttending}
                      variant={isAttending ? "outline" : "default"}
                    >
                      {isAttending
                        ? "Cancel RSVP"
                        : isFull
                          ? "Event Full"
                          : "RSVP to Event"}
                    </Button>
                  )}

                  {isOrganizer && (
                    <>
                      <Button asChild className="w-full">
                        <Link href={`/events/${event.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Event
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Event
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this event?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete
                              the event and remove all attendee data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}

                  <Button variant="outline" className="w-full bg-transparent" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Attendees ({event.attendees.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {event.attendees.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No attendees yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {event.attendees.slice(0, 10).map((attendee) => (
                      <Avatar key={attendee.id} className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {attendee.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {event.attendees.length > 10 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        +{event.attendees.length - 10}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
