'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
type TakeQuizButtonProps = {
    text: string;
    id: string;
    gameType: string;
}
const TakeQuizButton = ({ text, id, gameType }: TakeQuizButtonProps) => {
    const router = useRouter()
    async function handleResetGameTime() {
        const data = await axios.post('/api/resetStartTime', { gameId: id })
        if (data.status === 200) {
            router.push(`/play/${gameType}/${id}`)
        }
    }
    return (
        <>
            <Button
                className="app-button"
                onClick={handleResetGameTime}
            >
                {text}
            </Button>
        </>
    )
}

export default TakeQuizButton