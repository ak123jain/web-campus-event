import { CalendarDays, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import EventsList from "@/components/event-list"
import CurvedNavbar from "@/components/Navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
    
      {/* Hero Section */}
      <section
       className="bg-gradient-to-b  from-orange-50 to-white">
         <div className="p-8">
         <CurvedNavbar />
         </div>

        <div 
        
        className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Campus <span className="text-orange-600">Events</span> That Matter
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Connect with clubs, discover exciting events, and engage with your campus community all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-6">Browse Events</Button>
                <Link href='https://dashboard.itsakash.site'>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-6">
                  For Club Organizers
                </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/herobg.png"
                  alt="Campus events"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <CalendarDays className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">This Week</p>
                    <p className="text-xs text-gray-500">42 New Events</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-orange-100">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Campus Wide</p>
                    <p className="text-xs text-gray-500">15 Locations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/events" className="flex items-center text-orange-600 hover:text-orange-700 font-medium">
              View all events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <EventsList />

          <div className="mt-12 text-center">
            <Button className="bg-orange-600 hover:bg-orange-700 px-8">More Events Coming Soon</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-600 mb-4">CampusEvents</h3>
              <p className="text-gray-600 mb-4">Connecting students with campus activities and clubs.</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-orange-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-orange-600">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/events" className="text-gray-600 hover:text-orange-600">
                    All Events
                  </Link>
                </li>
                <li>
                  <Link href="/clubs" className="text-gray-600 hover:text-orange-600">
                    Clubs Directory
                  </Link>
                </li>
                <li>
                  <Link href="/calendar" className="text-gray-600 hover:text-orange-600">
                    Event Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-orange-600">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">For Clubs</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/create-club" className="text-gray-600 hover:text-orange-600">
                    Create a Club
                  </Link>
                </li>
                <li>
                  <Link href="/create-event" className="text-gray-600 hover:text-orange-600">
                    Post an Event
                  </Link>
                </li>
                <li>
                  <Link href="/club-dashboard" className="text-gray-600 hover:text-orange-600">
                    Club Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-600 hover:text-orange-600">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-orange-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-orange-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-orange-600">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-orange-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} CampusEvents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
