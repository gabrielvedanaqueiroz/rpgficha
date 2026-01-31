import { ReactNode } from "react"


interface CardProps{
  children?:ReactNode
  color?: number
}

export default function CardFlag({children, color = 1}:CardProps){

  return(
    <div
      className={`flex justify-center items-center w-fit h-fit pb-2 ${color === 1? 'bg-(--csecundary)': 'bg-(--cprimary) ' }`}
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
      }}
    >
      {children}
    </div>
  )
}