"use client"

import { useState, useMemo } from "react"
import { useEvents } from "@/lib/events-context"
import { Navbar } from "@/components/navbar"
import { EventCard } from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, X } from "lucide-react"

const categories = [
  "All",
  "Technology",
  "Business",
  "Music",
  "Sports",
  "Art",
  "Food",
  "Health",
  "Education",
]

export default function EventsPage() {
  const { events } = useEvents()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("date-asc")
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = useMemo(() => {
    let filtered = events.filter((event) => new Date(event.date) >= new Date())

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "attendees":
          return b.attendees.length - a.attendees.length
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [events, searchQuery, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortBy("date-asc")
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || sortBy !== "date-asc"

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Browse Events</h1>
          <p className="mt-1 text-muted-foreground">
            Discover upcoming events in your area
          </p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  !
                </span>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-foreground">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-asc">Date (Earliest first)</SelectItem>
                    <SelectItem value="date-desc">Date (Latest first)</SelectItem>
                    <SelectItem value="attendees">Most popular</SelectItem>
                    <SelectItem value="title">Title (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
        </div>

        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-semibold">No events found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
