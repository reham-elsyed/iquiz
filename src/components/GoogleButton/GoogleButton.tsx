'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { GitFork } from 'lucide-react'

function GoogleButton() {
  return (
    <Button
    onClick={()=>{signIn('google'), { callbackUrl: '/home' }}}
     variant='outline'
     size="icon"
     >
   <GitFork
   className="w-4 h-4"/>
    google </Button>
  )
}

export default GoogleButton