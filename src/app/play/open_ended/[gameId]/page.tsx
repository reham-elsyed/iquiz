import OpenEndedQuiz from '@/components/OpenEndedQuiz/OpenEndedQuiz';
import prisma from '@/lib/db';
import { getAuthSession } from '@/lib/nextAuth';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params: Promise<{
        gameId: string;
    }>;
}

const OpenEndedPage = async({params}: Props) => {
    const awaitedParams = await params;
    const {gameId} = awaitedParams;
    const session = await getAuthSession()
    if(!session){
        return redirect('/');
    }

const game = await prisma.game.findUnique(
   { where: {
        id: gameId,
    },
    include:{
        questions:{
            select:{
                id: true,
                question:true,
                answer:true,
            },
        },
    },
});
console.log(game)
if (!game || game.gameType !== 'open_ended'){
return redirect('/quiz')
}
  return (
 <OpenEndedQuiz game={game}/>
  )
}

export default OpenEndedPage;