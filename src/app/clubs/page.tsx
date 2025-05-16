'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

// TypeScript interfaces
interface Admin {
  fullname: string
  email: string
  avatar: string
}

interface Club {
  _id: string
  name: string
  description: string
  clubphoto: string
  sociallink: string[]
  events: string[]
  admin?: Admin
}

const ClubPage = () => {
  const [loading, setLoading] = useState(true)
  const [clubs, setClubs] = useState<Club[]>([])

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/club/getclub` , {
          headers: {
            'Content-Type': 'application/json' , 
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        })
        console.log(response.data.data)
        setClubs(response.data.data)
      } catch (error) {
        console.error("Error fetching clubs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClubs()
  }, [])

  if (loading) return <div className="p-4 text-center">Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {clubs.map((club) => (
        <div
          key={club._id}
          className="bg-white shadow-xl rounded-2xl overflow-hidden p-4 flex flex-col items-center transition-transform hover:scale-105"
        >
          <img
            src={club.clubphoto}
            alt={club.name}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold">{club.name}</h2>
          <p className="text-gray-500 text-sm text-center mb-2">{club.description}</p>

          {club.admin && (
            <div className="flex items-center gap-3 mt-2">
              <img
                src={club.admin.avatar}
                alt="admin avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{club.admin.fullname}</p>
                <p className="text-xs text-gray-400">{club.admin.email}</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {club.sociallink?.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-xs underline"
              >
                Social Link {index + 1}
              </a>
            ))}
          </div>

          <div className="text-xs text-gray-400 mt-4">
            Events: {club.events?.length || 0}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClubPage