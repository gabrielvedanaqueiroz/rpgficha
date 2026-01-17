import { ReactNode } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ModalBaseProps{
  title: string,
  children: ReactNode,
  view?: boolean,
  onClose?:()=>void,
}

export default function ModalBase({title, children, view, onClose}: ModalBaseProps){

  return(
    <section className="z-50 relative">
  
      <div className="fixed inset-0 z-30 bg-black/40"/>
      
      <div className="w-screen flex flex-col h-screen fixed top-0 left-0 z-50 gap-2 py-10 px-4"> 
        
        <div className="flex flex-col w-full bg-white shadow-lg rounded-lg">

          <div className="flex justify-between items-center bg-black rounded-t-lg text-white p-2 w-full">
            <strong className="w-full">{title}</strong>
            {view ? <IoMdCloseCircleOutline size={18} onClick={onClose} /> :<></>}
          </div>
          
          <div className="flex px-2 py-4">
            {children}
          </div>

        </div>
      </div>      
    </section>
  )
}