import { ReactNode } from "react"


interface CardProps{
  children?:ReactNode
}

export default function CardFlag({children}:CardProps){

  return(
    <div
      className={"flex justify-center items-center w-fit h-fit pb-2 bg-(--csecundary)"}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)', }}
    >
      {children}
    </div>
  )
}