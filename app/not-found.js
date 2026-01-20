import { GiDiceTwentyFacesOne } from "react-icons/gi";

export default function NotFound(){
  
  return(
    <main className="flex justify-center items-center w-full h-screen gap-2">
      <GiDiceTwentyFacesOne size={50} className="rotate-12"/> 
      Página não encontrada!
    </main> 
  )
}