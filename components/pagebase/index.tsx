import { memo, ReactNode } from "react";
import Footebar from "../footerbar";
import Headerbar from "../headerbar";
import Leftbar from "../leftbar";

interface PagebaseProps{
  title: string,
  children: ReactNode,
}

export default function PageBase({title, children}: PagebaseProps){

  const SubHeader = memo(function SubHeader({ title }: { title: string }) {
    return (
      <header className="flex bg-(--cprimary) h-12 p-2 text-white items-center gap-2 shadow-lg">
        <strong className="text-2xl">{title}</strong>
      </header>
    );
  });

  return(
    <main className="flex  flex-col">
      <Headerbar/>
      
      {<SubHeader title={title}/>}
            
      <section className="flex w-full gap-0.5 min-h-svh">
        
        <Leftbar/>

        <section className="flex-1 flex-col gap-1 h-fit pb-14 pt-2 px-4 w-full">
          {children}
        </section>      

        <Footebar/>
      </section>
    </main>
  )
}