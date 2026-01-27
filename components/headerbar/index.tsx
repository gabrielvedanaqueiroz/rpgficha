import { memo } from "react";
import { FaDiceD20 } from "react-icons/fa";

function HeaderBar(){
  return(
    <header id="router-header" className="flex bg-(--cprimary) h-12 p-2 text-white items-center gap-2 shadow-lg">
      <FaDiceD20 size={32}/>  
      <strong className="text-2xl">RPGFicha</strong>
    </header>
  )
}

export default memo(HeaderBar);