import React from 'react'
import { SVGProps, memo } from "react"

type SVGComponentProps = {
  svg?: React.ReactNode;
};

const SVGGeneric = ({ svg }: SVGComponentProps) => {
  return (
    svg ? (
      svg
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#0D0D0D"
            viewBox="0 0 24 24"
        >
            <path
            d="M19 18.5H9a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h1v5L12 6l2 1.5v-5h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Zm-2 2v2H5a2 2 0 0 1-2-2v-14h2v14h12Z"
            />
        </svg>
        )
  )
}
const Memo= memo(SVGGeneric)
export default Memo