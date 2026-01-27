"use client";

import { useContext, useState } from "react";
import { FaDiceD20, FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import {AuthContext} from "@/utils/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Login(){

  const [exibirSenha, setExibirSenha] = useState<boolean>(false);
  
  const [email, setEmail]    = useState<string>('');
  const [senha, setSenha]    = useState<string>('');

  const {onSingIn, loadingAuth} = useContext(AuthContext);
  const router = useRouter();

  async function onLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let lemail = email;
    let lsenha = senha;
        
    if((lemail.trim() !== '') && (lsenha.trim() !== '')){
      await onSingIn(lemail.trim(), lsenha.trim()).then((resultado)=>{
        if(resultado){
          router.replace('/');
        }
      });
    }
    else
      toast.error('Preencha todos os campos'); 

  }

  return(
    <main className="flex flex-col justify-center items-center bg-(--cprimary) h-screen gap-2 p-12 md:p-96">

      <div className="w-full flex justify-center items-center gap-2">
        <FaDiceD20 size={32} />
        <strong className="text-4xl">RPGFicha</strong>
      </div>
      <strong className="text-xl">Login</strong>

      <form className="flex flex-col gap-2 w-full my-2" >

        <input 
          className="flex w-full bg-white p-2 rounded" placeholder="Usuário"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        
        <div className="flex gap-1">
          <input
              type={exibirSenha ? "text" : "password"}
              className="flex w-full bg-white p-2 rounded"
              value={senha}
              onChange={(e)=>{setSenha(e.target.value)}}
              placeholder="Senha"
            />
          <button type="button" className="bg-(--csecundary) p-2 rounded" 
          onClick={()=>{setExibirSenha(!exibirSenha)}}>
            {exibirSenha ? <FaRegEyeSlash size={18} />: <FaRegEye size={18} />}
          </button>
        </div>

        <button type="submit" className="flex bg-(--csecundary) text-white py-2 px-3 rounded justify-center items-center" 
        onClick={onLogin}>
          {
            loadingAuth
            ? <div className="flex gap-2 justify-center items-center">
                <AiOutlineLoading3Quarters size={18} className="animate-spin"/> 
                <label>Acessando...</label>  
              </div> 
            : 'Acessar'
          }
        </button>
      </form>

      <button 
        onClick={()=>{router.push('/registrar')}}
        className="text-(--csecundary) text-xs">Não possui uma conta? Cadastre-se</button>

    </main>
  )
}