 'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

const Page: React.FC = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/registeruser`,   {
         fullname,
         email,
         password
      })

      console.log("response here", response.data);
      

      if (response.data.message === 'User registered successfully') {
        router.push('/login')
      }
    } catch (error) {
      console.error("Error creating admin:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleClick}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" onChange={(e) => setFullname(e.target.value)} placeholder="Enter your name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" />
              </div>
            </div>
            <CardFooter className="pt-4 px-0">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </Button>
            </CardFooter>
          </form>
          <Link href='/login'>
            <p className='text-center text-black text-md mt-2 underline'>
              Already have an account? Login
            </p>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page