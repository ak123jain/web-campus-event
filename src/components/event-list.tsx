"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"

// Type for a single event
type Event = {
  _id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  enddate: string
  participant: string[]
  startdate: string
  updatedAt: string
  club: {
    _id: string
    name: string
  }
  category: string
  attendees: number
  eventphoto: string
}

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  const router = useRouter();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/getevents`)
        console.log(response.data.data)
        setEvents(response.data.data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleJoinEvent = async(event: Event) => {
    // Handle the join event logic here
    try { 
      // Make an API call to join the event 
      const token = localStorage.getItem("token")

      if(!token) {
        console.log("User not logged in")
        router.push("/login")
        return
      }

        const response = await axios.post("",{
          
          eventid: event._id
        })

        console.log("Event joined successfully:", response.data);

        
      
    } catch (error) {
      
    }
    console.log("Join event clicked")
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl p-6 h-80 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
        >
          {/* Image section */}
          <div className="relative h-60 w-full">
            <Image
              src={event.eventphoto?.startsWith('http://') ? event.eventphoto.replace('http://', 'https://') : event.eventphoto}
              alt="Event Image"
              layout="fill"  // Use `layout="fill"` to fill the parent container.
              objectFit="cover"  // Ensure the image covers the entire container while maintaining its aspect ratio
            />
            <Badge className="absolute top-4 right-4 bg-orange-600 text-white">
              {event.category}
            </Badge>
          </div>

          {/* Content section */}
          <div className="mt-6 p-4 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>

            {/* Club Name */}
            {   event?.club?.name &&
                <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Hosted by:</span>
                <span className="ml-1">{event?.club?.name}</span>
              </div>
            }

            {/* Location */}
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-orange-600 mr-1" />
              <span className="truncate">{event.location}</span>
            </div>

            {/* Date and Time */}
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDays className="h-4 w-4 text-orange-600 mr-1" />
              <span>{formatDate(event.startdate)}</span>
              <span className="mx-2">•</span>
              <Clock className="h-4 w-4 text-orange-600 mr-1" />
              <span>{event.startdate.split("T")[1].split(".")[0]}</span>
            </div>

            {/* Description */}
            <div className="text-sm text-gray-700">
              <p>{event.description}</p>
            </div>

             

            {/* Footer */}
            <div className="pt-3 flex justify-between items-center">
              <Link href={`/eventsjoin/${event._id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleJoinEvent(event)}
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  Join
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>

               <Link href={`/participants/${event._id}`} >
                 <Button>
                   Participants
                 </Button>
                </Link>

                
              {/* <span className="text-sm text-gray-500">Updated: {formatDate(event.updatedAt)}</span> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

  