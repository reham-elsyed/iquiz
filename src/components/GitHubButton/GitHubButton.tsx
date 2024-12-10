'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signIn } from 'next-auth/react'
import { GitFork } from 'lucide-react'

function GitHubButton() {
  return (
    <Button
    onClick={()=>{signIn('github'), { callbackUrl: '/home' }}}
    variant='outline'
    size="icon"
    >
  <GitFork 
  className="w-4 h-4"/>
    </Button>
  )
}

export default GitHubButton