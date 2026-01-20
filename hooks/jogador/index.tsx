"use client";

import { JogadorProps } from "@/classes/jogador";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useJogadorGet(aIDLogin: string) {
  const [data, setData]           = useState<JogadorProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError]     = useState(false);

  async function refetch() {

    if (!aIDLogin) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const q = query( collection(db, "tb_jogador"),  where("jo_idlogin", "==", aIDLogin.trim()) );
      
      const querySnapshot = await getDocs(q);
      const lista: JogadorProps[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          jo_id: doc.id,
          jo_nome: doc.data().jo_nome.trim(),
          jo_idlogin: doc.data().jo_idlogin.trim(),
          // jo_email: doc.data().jo_email.trim(),
        });
      });

      setData(lista[0]);

    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [aIDLogin]);

  return { data, isLoading, isError, refetch };
}
