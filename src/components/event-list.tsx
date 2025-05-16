// "use client"

// import { useState, useEffect } from "react"
// import { CalendarDays, Clock, MapPin, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import Link from "next/link"
// import Image from "next/image"
// import axios from "axios"
// import { useRouter } from "next/navigation"

// // Type for a single event
// type Event = {
//   _id: string
//   name: string
//   date: string
//   time: string
//   location: string
//   description: string
//   enddate: string
//   participant: string[]
//   startdate: string
//   updatedAt: string
//   club: {
//     _id: string
//     name: string
//   }
//   category: string
//   attendees: number
//   eventphoto: string
// }

// // Format date
// const formatDate = (dateString: string) => {
//   const options: Intl.DateTimeFormatOptions = {
//     weekday: "long",
//     month: "short",
//     day: "numeric",
//   }
//   return new Date(dateString).toLocaleDateString("en-US", options)
// }

// export default function EventsList() {
//   const [events, setEvents] = useState<Event[]>([])
//   const [loading, setLoading] = useState(true)

//   const router = useRouter();
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/getevents`)
//         console.log(response.data.data)
//         setEvents(response.data.data)
//       } catch (error) {
//         console.error("Error fetching events:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchEvents()
//   }, [])

//   const handleJoinEvent = async(event: Event) => {
//     // Handle the join event logic here
//     try { 
//       // Make an API call to join the event 
//       const token = localStorage.getItem("token")

//       if(!token) {
//         console.log("User not logged in")
//         router.push("/login")
//         return
//       }

//         const response = await axios.post("",{
          
//           eventid: event._id
//         })

//         console.log("Event joined successfully:", response.data);

        
      
//     } catch (error) {
      
//     }
//     console.log("Join event clicked")
//   }

//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="bg-gray-100 rounded-xl p-6 h-80 animate-pulse"
//           />
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {events.map((event) => (
//         <div
//           key={event._id}
//           className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
//         >
//           {/* Image section */}
//           <div className="relative h-60 w-full">
//             <Image
//               src={event.eventphoto?.startsWith('http://') ? event.eventphoto.replace('http://', 'https://') : event.eventphoto}
//               alt="Event Image"
//               layout="fill"  // Use `layout="fill"` to fill the parent container.
//               objectFit="cover"  // Ensure the image covers the entire container while maintaining its aspect ratio
//             />
//             <Badge className="absolute top-4 right-4 bg-orange-600 text-white">
//               {event.category}
//             </Badge>
//           </div>

//           {/* Content section */}
//           <div className="mt-6 p-4 space-y-4">
//             <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>

//             {/* Club Name */}
//             {   event?.club?.name &&
//                 <div className="flex items-center text-sm text-gray-500">
//                 <span className="font-medium">Hosted by:</span>
//                 <span className="ml-1">{event?.club?.name}</span>
//               </div>
//             }

//             {/* Location */}
//             <div className="flex items-center text-sm text-gray-500">
//               <MapPin className="h-4 w-4 text-orange-600 mr-1" />
//               <span className="truncate">{event.location}</span>
//             </div>

//             {/* Date and Time */}
//             <div className="flex items-center text-sm text-gray-500">
//               <CalendarDays className="h-4 w-4 text-orange-600 mr-1" />
//               <span>{formatDate(event.startdate)}</span>
//               <span className="mx-2">•</span>
//               <Clock className="h-4 w-4 text-orange-600 mr-1" />
//               <span>{event.startdate.split("T")[1].split(".")[0]}</span>
//             </div>

//             {/* Description */}
//             <div className="text-sm text-gray-700">
//               <p>{event.description}</p>
//             </div>

             

//             {/* Footer */}
//             <div className="pt-3 flex justify-between items-center">
//               <Link href={`/eventsjoin/${event._id}`}>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleJoinEvent(event)}
//                   className="text-orange-600 border-orange-600 hover:bg-orange-50"
//                 >
//                   Join
//                   <ArrowRight className="ml-1 h-4 w-4" />
//                 </Button>
//               </Link>

//                <Link href={`/participants/${event._id}`} >
//                  <Button>
//                    Participants
//                  </Button>
//                 </Link>

                
//               {/* <span className="text-sm text-gray-500">Updated: {formatDate(event.updatedAt)}</span> */}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

 "use client"

import { useState, useEffect } from "react"
import { CalendarDays, Clock, MapPin, ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

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

// Format time to 12-hour format
const formatTime = (timeString: string) => {
  if (!timeString) return "";
  
  const timePart = timeString.split("T")[1]?.split(".")[0];
  if (!timePart) return "";
  
  const [hours, minutes] = timePart.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${ampm}`;
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/event/getevents`)
        setEvents(response.data.data)
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Get unique categories for filtering
  const categories = ["all", ...new Set(events.map(event => event.category))];

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(event => event.category === filter);

  const handleJoinEvent = async(event: Event) => {
    try { 
      const token = localStorage.getItem("token")

      if(!token) {
        console.log("User not logged in")
        router.push("/login")
        return
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/event/join`, {
        eventid: event._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log("Event joined successfully:", response.data);
      // Show success toast/notification here
      
    } catch (error) {
      console.error("Error joining event:", error)
      // Show error toast/notification here
    }
  }

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Button hover effect
  const buttonVariants = {
    hover: { scale: 1.05 }
  };

  // Category button animations
  const categoryVariants = {
    selected: { 
      backgroundColor: "#fb923c", 
      color: "white",
      scale: 1.05
    },
    notSelected: { 
      backgroundColor: "white", 
      color: "#475569",
      scale: 1
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-100 rounded-full animate-pulse"/>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 h-96 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Campus Events
      </motion.h1>
      
      <motion.p 
        className="text-center text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Discover and join exciting events happening on campus
      </motion.p>

      {/* Filter by category */}
      <motion.div 
        className="flex flex-wrap gap-2 justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setFilter(category)}
            className="px-4 py-2 rounded-full text-sm font-medium shadow-sm border"
            variants={categoryVariants}
            initial="notSelected"
            animate={filter === category ? "selected" : "notSelected"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
            whileHover={{ y: -5 }}
          >
            {/* Image section */}
            <div className="relative h-60 w-full overflow-hidden group">
              <Image
                src={event.eventphoto?.startsWith('http://') ? event.eventphoto.replace('http://', 'https://') : event.eventphoto}
                alt={`${event.name} event image`}
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
              <Badge className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-3 py-1">
                {event.category}
              </Badge>
              <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{event.name}</h3>
            </div>

            {/* Content section */}
            <div className="p-5 space-y-4">
              {/* Club Name */}
              {event?.club?.name &&
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Hosted by:</span>
                  <span className="ml-1 font-semibold text-orange-600">{event?.club?.name}</span>
                </div>
              }

              {/* Location */}
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>

              {/* Date and Time */}
              <div className="flex flex-wrap items-center gap-y-2 text-sm text-gray-600">
                <div className="flex items-center mr-4">
                  <CalendarDays className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  <span>{formatDate(event.startdate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                  <span>{formatTime(event.startdate)}</span>
                </div>
              </div>

              {/* Description */}
              <div className="text-sm text-gray-700 line-clamp-2">
                <p>{event.description}</p>
              </div>

              {/* Footer */}
              <div className="pt-4 flex justify-between items-center">
                <Link href={`/eventsjoin/${event._id}`}>
                  <motion.div variants={buttonVariants} whileHover="hover">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleJoinEvent(event)}
                      className="text-orange-600 border-orange-500 hover:bg-orange-50 hover:text-orange-700 font-medium"
                    >
                      Join Event
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>

                <Link href={`/participants/${event._id}`}>
                  <motion.div variants={buttonVariants} whileHover="hover">
                    <Button
                      size="sm"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium"
                    >
                      <Users className="mr-1 h-4 w-4" />
                      Participants
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 text-lg">No events found in this category. Try another filter!</p>
        </motion.div>
      )}
    </div>
  )
}