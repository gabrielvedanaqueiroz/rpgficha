"use client";

import { JogadorProps } from "@/classes/jogador";
import { db } from "@/services/firebaseConnection";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
          jo_nome: doc.data().jo_email.trim(),
          jo_idlogin: doc.data().jo_idlogin.trim(),
          jo_email: doc.data().jo_email.trim(),
        });
      });

      setData(lista[0]);

      // const ref = doc(db, "tb_jogador", aIDLogin.trim());
      // const snapshot = await getDoc(ref);
      // let item: JogadorProps ;
      // if (snapshot.exists()) {
      //   item = {
      //     jo_id: snapshot.id,
      //     jo_nome: snapshot.data().jo_email.trim(),
      //     jo_idlogin: snapshot.data().jo_idlogin.trim(),
      //     jo_email: snapshot.data().jo_email.trim(),
      //   };

      //   setData(item);
      // }

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
