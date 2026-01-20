"use client";

import CaracteristicaProps from "@/classes/caracteristica";
import { db } from "@/services/firebaseConnection";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useCaracteristicaGet(aIDPersonagem: string) {
  const [data, setData] = useState<CaracteristicaProps[]>([]);
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
      const q = query(collection(db, "tb_caracteristica"), where("ca_idpersonagem", "==", aIDPersonagem.trim()));

      const querySnapshot = await getDocs(q);
      const lista: CaracteristicaProps[] = [];

      querySnapshot.forEach((doc) => {
        lista.push({
          ca_id: doc.id.trim(),
          ca_nome: doc.data().ca_nome.trim(),
          ca_descricao: doc.data().ca_descricao.trim(),
        });
      });

      lista.sort((a, b)=>  a.ca_nome.localeCompare(b.ca_nome, 'pt-BR', { sensitivity: 'base' }));

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