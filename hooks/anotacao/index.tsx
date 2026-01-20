"use client";

import { AnotacaoProps } from "@/classes/anotacao";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useAnotacaoGet(aIDPersonagem: string) {
  const [data, setData] = useState<AnotacaoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function refetch() {
    if (!aIDPersonagem){      
      setIsLoading(false);
      setIsError(false);
      return;
    }      

    setIsLoading(true);
    setIsError(false);

    try {
      const q = query(collection(db, "tb_anotacao"), where("an_idpersonagem", "==", aIDPersonagem.trim()));

      const querySnapshot = await getDocs(q);
      const lista: AnotacaoProps[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          an_id: doc.id.trim(),
          an_titulo: doc.data().an_titulo.trim(),
          an_descricao: doc.data().an_descricao.trim(),
          an_data: doc.data().an_data,
        });
      });

      lista.sort((a, b)=> {

        const dataA = new Date(a.an_data).getTime();
        const dataB = new Date(b.an_data).getTime();

        if (dataA !== dataB) {
          return dataB - dataA; // mais recente primeiro
        }

        return a.an_titulo.localeCompare(b.an_titulo);

      });

      setData(lista);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [aIDPersonagem]);

  return { data, isLoading, isError, refetch };
}