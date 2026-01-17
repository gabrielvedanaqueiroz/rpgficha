import { ReactNode } from "react"

interface CardProps{
  children?:ReactNode
}

export default function Card({children}:CardProps){

  return(
    <div className="flex w-full bg-white rounded-lg shadow-lg p-2">
      {children}
    </div>
  )
}