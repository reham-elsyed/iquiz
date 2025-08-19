import * as React from "react"
import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg 
     xmlns="http://www.w3.org/2000/svg"
    fill={props.fill}
    {...props}
    viewBox="0 0 20 20">
  <path
   
    d="M2.6 0A2.6 2.6 0 0 0 0 2.6v4.8A2.6 2.6 0 0 0 2.6 10h2.8A2.6 2.6 0 0 0 8 7.4V2.6A2.6 2.6 0 0 0 5.4 0H2.6Zm0 12A2.6 2.6 0 0 0 0 14.6v2.8A2.6 2.6 0 0 0 2.6 20h2.8A2.6 2.6 0 0 0 8 17.4v-2.8A2.6 2.6 0 0 0 5.4 12H2.6Zm10-12A2.6 2.6 0 0 0 10 2.6v2.8A2.6 2.6 0 0 0 12.6 8h2.8A2.6 2.6 0 0 0 18 5.4V2.6A2.601 2.601 0 0 0 15.4 0h-2.8Zm0 10a2.6 2.6 0 0 0-2.6 2.6v4.8a2.6 2.6 0 0 0 2.6 2.6h2.8a2.602 2.602 0 0 0 2.6-2.6v-4.8a2.602 2.602 0 0 0-2.6-2.6h-2.8Z"
  />
  </svg>
)
const Memo = memo(SvgComponent)
export default Memo
