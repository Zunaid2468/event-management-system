"use client"

import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/mock-data"

interface EventCardProps {
  event: Event
  showActions?: boolean
}

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

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)
  const isPast = eventDate < new Date()

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isPast && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary" className="text-sm">
                Past Event
              </Badge>
            </div>
          )}
          <div className="absolute left-3 top-3">
            <Badge
              variant="outline"
              className={`${categoryColors[event.category] || "bg-muted text-muted-foreground"} border`}
            >
              {event.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 border-t border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(eventDate, "EEE, MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{event.time}</span>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{event.attendees.length}/{event.capacity}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
