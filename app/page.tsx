"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Calendar, Users, MapPin, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                <Calendar className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Eventify</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                Browse Events
              </Link>
              {!isLoading && (
                user ? (
                  <Link href="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login">
                      <Button variant="ghost">Sign in</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                )
              )}
            </nav>
            <div className="md:hidden flex items-center gap-2">
              {!isLoading && !user && (
                <Link href="/login">
                  <Button size="sm">Sign in</Button>
                </Link>
              )}
              {!isLoading && user && (
                <Link href="/dashboard">
                  <Button size="sm">Dashboard</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Your events, simplified
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Create and manage events that people love
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
              Eventify makes it easy to discover amazing events, connect with like-minded people, 
              and create memorable experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/events">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Events
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Create Your Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to manage events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From small meetups to large conferences, Eventify has the tools you need.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Easy Event Creation</h3>
              <p className="text-muted-foreground">
                Create beautiful event pages in minutes with our intuitive event builder.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Attendee Management</h3>
              <p className="text-muted-foreground">
                Track RSVPs, manage capacity, and communicate with your attendees easily.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Discover Local Events</h3>
              <p className="text-muted-foreground">
                Find events happening near you and connect with your local community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Events Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Cities Worldwide</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9</div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why choose Eventify?
              </h2>
              <div className="space-y-4">
                {[
                  "Free to create and manage events",
                  "Real-time RSVP tracking",
                  "Beautiful, customizable event pages",
                  "Easy attendee communication",
                  "Mobile-friendly experience",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/signup">
                  <Button size="lg">
                    Start for Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <Calendar className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">Your next great event starts here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Eventify</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/events" className="hover:text-foreground transition-colors">Events</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Sign in</Link>
              <Link href="/signup" className="hover:text-foreground transition-colors">Sign up</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with v0 by Vercel
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
