"use client";

import { memo } from "react";

interface ButtonsModalProps{
  onClose:()=>void;
  onSubmit?:(e: React.FormEvent)=>void;
}

function ButtonsModal({onClose, onSubmit}: ButtonsModalProps){

  return(
    <div className="flex gap-2 justify-end pt-2">
      <button 
        className="border border-gray-300 px-2 py-1 rounded" 
        onClick={onClose}>
        Cancelar
      </button>
      
      {onSubmit 
        ? (
          <button 
            type="submit" 
            className="bg-(--csecundary) text-(--cprimary) px-2 py-1 rounded" 
            onClick={onSubmit}>
            Salvar
          </button>
        )
        : (
          <button type="submit" className="bg-(--csecundary) text-(--cprimary) px-2 py-1 rounded">
            Salvar
          </button>
        )
      }
    </div>
  )
}

export default memo(ButtonsModal);

