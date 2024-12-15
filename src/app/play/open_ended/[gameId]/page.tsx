import React from 'react'

type Props = {
    params: {
        gameId: string;
    },
};

const  OpenEnded= ({params:{gameId}}: Props) => {
  return (
    <div>{gameId}</div>
  )
}

export default OpenEnded