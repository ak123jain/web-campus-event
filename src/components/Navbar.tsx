'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export default function CurvedNavbar() {
  return (
    <header className="w-full  flex justify-center">
      <div className="bg-orange-100 text-black px-8 py-4 rounded-full shadow-lg flex justify-between items-center w-[90%] max-w-5xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-xl font-bold">
          <span className="text-black">Campus</span>
          <span className="text-orange-400">Events</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-orange-400 border-b-2 border-orange-400 pb-1">Home</Link>
          {/* <Link href="/events" className="hover:text-orange-400">Events</Link> */}
          <Link href="/clubs" className="hover:text-orange-400">Clubs</Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link href="/signup">
            <Button className="bg-gradient-to-r cursor-pointer from-orange-500 to-orange-600 text-white font-medium px-4">
              Get Started
            </Button>
          </Link>
        </div>
        
      </div>
    </header>
  )
}
