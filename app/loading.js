import { FaDiceD20 } from "react-icons/fa";


export default function Loading(){
  return(
      <main className="flex justify-center items-center w-full h-screen gap-2">
        <FaDiceD20 size={50} className="animate-spin"/> 
        Rolando os dados, aguarde um momento!
      </main>
    )
}