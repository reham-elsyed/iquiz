import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
type TakeQuizButtonProps = {
    text: string;
    id: string;
    gameType: string;
}
const TakeQuizButton = ({ text, id, gameType }: TakeQuizButtonProps) => {
    return (
        <>
            <Button
                asChild
                className="app-button"
            >
                {gameType === "mcq" ? <Link href={`/play/mcq/${id}`}>{text}</Link> :
                    <Link href={`/play/open_ended/${id}`}>{text}</Link>}
            </Button>
        </>
    )
}

export default TakeQuizButton