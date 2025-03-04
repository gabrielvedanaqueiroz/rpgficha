
import {db} from '../services/firebaseConnection';
import {doc, getDoc, query, getDocs, collection, where} from 'firebase/firestore';
import Personagem from '../utils/personagem.js'
import {toast} from 'react-toastify';

export function ocultarBarras(){
  let topo    = document.getElementById("router-header");
  let rodape  = document.getElementById("router-footer");

  if(topo !== null)
    topo.style.display = "none";
    
  if(rodape !== null)
    rodape.style.display = "none";
}

export function exibirBarras(){
  let topo    = document.getElementById("router-header");
  let rodape  = document.getElementById("router-footer");

  if(topo !== null)
    topo.style.display = "flex";
    
  if(rodape !== null)
    rodape.style.display = "flex";
}

export const jClasses = [
  {
    "cl_id": 1,
    "cl_idhabilidadeconjuracao": 0, 
    "cl_descricao": "Bárbaro",
    "cl_dado_vida": "d12",
    "cl_vida_nivel_1": 12,
    "cl_cabase": 10,
    "cl_sub": ["Caminho do Berserker", "Caminho do Guerreiro Totêmico"],

    "cl_up2":["Ataque Descuidado", "Sentido de Perigo"],
    "cl_up3":["Caminho Primitivo", {"furia":3}],
    "cl_up4":["Incremento no Valor de Habilidade"],
    "cl_up5":["Ataque Extra", "Movimento Rápido", {"furia":4, "bonusproficiencia": 3}]
  },
  {
    "cl_id": 2,
    "cl_idhabilidadeconjuracao": 6, 
    "cl_descricao": "Bardo",
    "cl_dado_vida": "d8",
    "cl_vida_nivel_1": 8,
    "cl_cabase": 11,
    "cl_sub": ["Colégio do Conhecimento", "Colégio do Valor"]
  },
  {
    "cl_id": 3,
    "cl_idhabilidadeconjuracao": 6, 
    "cl_descricao": "Bruxo",
    "cl_dado_vida": "d8",
    "cl_vida_nivel_1": 8,
    "cl_cabase": 11,
    "cl_sub": ["Arquifada", "O Grande Antigo", "O Senhor Imortal"]
  },
  {
    "cl_id": 4,
    "cl_idhabilidadeconjuracao": 5, 
    "cl_descricao": "Clérigo",
    "cl_dado_vida": "d8",
    "cl_vida_nivel_1": 8,
    "cl_cabase": 16,
    "cl_sub": [
      "Domínio da Vida",
      "Domínio do Conhecimento",
      "Domínio da Luz",
      "Domínio da Natureza",
      "Domínio da Tempestade",
      "Domínio do Engano",
      "Domínio da Guerra"
    ]
  },
  {
    "cl_id": 5,
    "cl_idhabilidadeconjuracao": 5, 
    "cl_descricao": "Druida",
    "cl_dado_vida": "d8",
    "cl_vida_nivel_1": 8,
    "cl_cabase": 12,
    "cl_sub": ["Círculo da Terra", "Círculo da Lua"]
  },
  {
    "cl_id": 6,
    "cl_idhabilidadeconjuracao": 6, 
    "cl_descricao": "Feiticeiro",
    "cl_dado_vida": "d6",
    "cl_vida_nivel_1": 6,
    "cl_cabase": 10,
    "cl_sub": ["Linhagem Dracônica", "Magia Selvagem"]
  },
  {
    "cl_id": 7,
    "cl_idhabilidadeconjuracao": 4, 
    "cl_descricao": "Guerreiro",
    "cl_dado_vida": "d10",
    "cl_vida_nivel_1": 10,
    "cl_cabase": 16,
    "cl_sub": [
      "Arquétipo do Campeão",
      "Arquétipo do Mestre de Batalha",
      "Arquétipo do Cavaleiro Arcano"
    ]
  },
  {
    "cl_id": 8,
    "cl_idhabilidadeconjuracao": 4, 
    "cl_descricao": "Ladino",
    "cl_dado_vida": "d8",
    "cl_vida_nivel_1": 8,
    "cl_cabase": 11,
    "cl_sub": [
      "Tradição do Ladrão",
      "Tradição do Assassino",
      "Tradição do Trapaceiro Arcano"
    ]
  },
  {
    "cl_id": 9,
    "cl_idhabilidadeconjuracao": 4, 
    "cl_descricao": "Mago",
    "cl_dado_vida": "d6",
    "cl_vida_nivel_1": 6,
    "cl_cabase": 10,
    "cl_sub": [
      "Escola de Abjuração",
      "Escola de Adivinhação",
      "Escola de Evocação",
      "Escola de Ilusão",
      "Escola de Necromancia",
      "Escola de Transmutação",
      "Escola de Conjuração",
      "Escola de Encantamento"
    ]
  },
  {
    "cl_id": 10,
    "cl_idhabilidadeconjuracao": 0, 
    "cl_descricao": "Monge",
    "cl_dado_vida": "d8",
    "cl_vida_nivel_1": 8,
    "cl_cabase": 10,
    "cl_sub": [
      "Caminho da Mão Aberta",
      "Caminho da Sombra",
      "Caminho dos Quatro Elementos"
    ]
  },
  {
    "cl_id": 11,
    "cl_idhabilidadeconjuracao": 6, 
    "cl_descricao": "Paladino",
    "cl_dado_vida": "d10",
    "cl_vida_nivel_1": 10,
    "cl_cabase": 16,
    "cl_sub": [
      "Juramento de Devoção",
      "Juramento dos Anciões",
      "Juramento da Vingança"
    ]
  },
  {
    "cl_id": 12,
    "cl_idhabilidadeconjuracao": 5, 
    "cl_descricao": "Patrulheiro",
    "cl_dado_vida": "d10",
    "cl_vida_nivel_1": 10,
    "cl_cabase": 14,
    "cl_sub": ["Conclave do Caçador", "Conclave Mestre das Feras"]
  }
];

export const jRacas = [
  {
    "rc_id": 1,
    "rc_descricao": "Anão",
    "rc_movimento": 5,
    "rc_sub": [
        "da Colina",
        "da Montanha"
    ]
  },
  {
    "rc_id": 2,
    "rc_descricao": "Elfo",
    "rc_movimento": 6,
    "rc_sub": [
        "Alto Elfo",
        "Elfo da Floresta",
        "Elfo Negro (Drow)"
    ]
  },
  {
    "rc_id": 3,
    "rc_descricao": "Halfling",
    "rc_movimento": 5,
    "rc_sub": [
        "Pés-Leves",
        "Robusto"
    ]
  },
  {
    "rc_id": 4,
    "rc_descricao": "Humano",
    "rc_movimento": 6,
    "rc_sub": [
        "Padrão",
        "Variante"
    ]
  },
  {
    "rc_id": 5,
    "rc_descricao": "Draconato",
    "rc_movimento": 6,
    "rc_sub": [
        "Azul",
        "Branco",
        "Bronze",
        "Cobre",
        "Latão",
        "Negro",
        "Ouro",
        "Prata",
        "Verde",
        "Vermelho",
    ]
  },
  {
    "rc_id": 6,
    "rc_descricao": "Gnomo",
    "rc_movimento": 5,
    "rc_sub": [
        "Gnomo da Floresta",
        "Gnomo das Rochas"
    ]
  },
  {
    "rc_id": 7,
    "rc_descricao": "Meio-Elfo",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 8,
    "rc_descricao": "Meio-Orc",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 9,
    "rc_descricao": "Tiefling",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },

  {
    "rc_id": 10,
    "rc_descricao": "Aasimar",
    "rc_movimento": 6,
    "rc_sub": [
        "Protetor",
        "Flagelador",
		    "Caído"
    ]
  },
  {
    "rc_id": 11,
    "rc_descricao": "Firbolg",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 12,
    "rc_descricao": "Golias",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 13,
    "rc_descricao": "Kenku",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 14,
    "rc_descricao": "Povo Lagarto",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 15,
    "rc_descricao": "Tabaxi",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 16,
    "rc_descricao": "Tritão",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 17,
    "rc_descricao": "Bugbear",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 18,
    "rc_descricao": "Goblin",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 19,
    "rc_descricao": "Hobgoblin",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 20,
    "rc_descricao": "Kobolds",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 21,
    "rc_descricao": "Orc",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  },
  {
    "rc_id": 22,
    "rc_descricao": "Yuan-ti Puro Sangue",
    "rc_movimento": 6,
    "rc_sub": [
        "Sem sub-raças"
    ]
  }
];

export async function buscarPersonagemAtivo(aID){

  let LPersonagem = null;
  const q = query(collection(db, "tb_personagem"), 
    where("pe_idjogador", "==", aID.trim()),
    where("pe_ativo", "==", true)
  );
  const querySnapshot = await getDocs(q); 
  try {
    querySnapshot.forEach((snapshot)=>{
      LPersonagem = new Personagem(
        snapshot.id.trim(),                    //id do documento fica separado no nodo do documento
        snapshot.data().pe_nome.trim(),        //pegar dados, ficam armazenados em data()
        snapshot.data().pe_subclasse.trim(), 
        snapshot.data().pe_classe.trim(), 
        snapshot.data().pe_raca.trim(), 
        snapshot.data().pe_subraca.trim(), 
        snapshot.data().pe_nivel, 
        snapshot.data().pe_antecedente.trim(), 
        snapshot.data().pe_tendencia.trim(), 
        snapshot.data().pe_vidabase, 
        snapshot.data().pe_vidaatual, 
        snapshot.data().pe_vidatemp, 
        snapshot.data().pe_experiencia, 
        snapshot.data().pe_bproficiencia, 
        snapshot.data().pe_forca, 
        snapshot.data().pe_destreza, 
        snapshot.data().pe_constituicao, 
        snapshot.data().pe_inteligencia, 
        snapshot.data().pe_sabedoria, 
        snapshot.data().pe_carisma, 
        snapshot.data().pe_cabase, 
        snapshot.data().pe_catotal, 
        snapshot.data().pe_movimento,
        snapshot.data().pe_idclasse,
        snapshot.data().pe_idraca,
        snapshot.data().pe_vidadado,
        snapshot.data().pe_vidadadousado,
        snapshot.data().pe_tcmfalha1,
        snapshot.data().pe_tcmfalha2,
        snapshot.data().pe_tcmfalha3,
        snapshot.data().pe_tcmsucesso1,
        snapshot.data().pe_tcmsucesso2,
        snapshot.data().pe_tcmsucesso3,
        snapshot.data().pe_sgforca,
        snapshot.data().pe_sgdestreza,
        snapshot.data().pe_sgconstituicao,
        snapshot.data().pe_sginteligencia,
        snapshot.data().pe_sgsabedoria,
        snapshot.data().pe_sgcarisma,
        snapshot.data().pe_proacrobacia,
        snapshot.data().pe_proarcanismo,
        snapshot.data().pe_proatletismo,
        snapshot.data().pe_proatuacao,
        snapshot.data().pe_problefar,
        snapshot.data().pe_profurtividade,
        snapshot.data().pe_prohistoria,
        snapshot.data().pe_prointimidacao,
        snapshot.data().pe_prointuicao,
        snapshot.data().pe_proinvestigacao,
        snapshot.data().pe_prolidaranimais,
        snapshot.data().pe_promedicina,
        snapshot.data().pe_pronatureza,
        snapshot.data().pe_propercepcao,
        snapshot.data().pe_propersuacao,
        snapshot.data().pe_proprestidigitacao,
        snapshot.data().pe_prosobrevivencia,
        snapshot.data().pe_proreligiao,
        snapshot.data().pe_idhabilidadeconjuracao,
      ); 
    });    
  } catch (error) {
    toast.error('Erro ao carregar personagem ativo '+error); 
    console.log('Erro ao carregar personagem ativo '+error); 
    
  }
  
  return LPersonagem;
}

export async function buscarPersonagem(aID){
 
  let LPersonagem = null;

  const ref = doc(db, 'tb_personagem', aID.trim());     //presetando pra efetuar a busca por id
  await getDoc(ref)                                       //executar busca    
  .then((snapshot) =>{

      if(snapshot.exists){

        LPersonagem = new Personagem(
          snapshot.id.trim(),                    //id do documento fica separado no nodo do documento
          snapshot.data().pe_nome.trim(),        //pegar dados, ficam armazenados em data()
          snapshot.data().pe_subclasse.trim(), 
          snapshot.data().pe_classe.trim(), 
          snapshot.data().pe_raca.trim(), 
          snapshot.data().pe_subraca.trim(), 
          snapshot.data().pe_nivel, 
          snapshot.data().pe_antecedente.trim(), 
          snapshot.data().pe_tendencia.trim(), 
          snapshot.data().pe_vidabase, 
          snapshot.data().pe_vidaatual, 
          snapshot.data().pe_vidatemp, 
          snapshot.data().pe_experiencia, 
          snapshot.data().pe_bproficiencia, 
          snapshot.data().pe_forca, 
          snapshot.data().pe_destreza, 
          snapshot.data().pe_constituicao, 
          snapshot.data().pe_inteligencia, 
          snapshot.data().pe_sabedoria, 
          snapshot.data().pe_carisma, 
          snapshot.data().pe_cabase, 
          snapshot.data().pe_catotal, 
          snapshot.data().pe_movimento,
          snapshot.data().pe_idclasse,
          snapshot.data().pe_idraca,
          snapshot.data().pe_vidadado,
          snapshot.data().pe_vidadadousado,
          snapshot.data().pe_tcmfalha1,
          snapshot.data().pe_tcmfalha2,
          snapshot.data().pe_tcmfalha3,
          snapshot.data().pe_tcmsucesso1,
          snapshot.data().pe_tcmsucesso2,
          snapshot.data().pe_tcmsucesso3,
          snapshot.data().pe_sgforca,
          snapshot.data().pe_sgdestreza,
          snapshot.data().pe_sgconstituicao,
          snapshot.data().pe_sginteligencia,
          snapshot.data().pe_sgsabedoria,
          snapshot.data().pe_sgcarisma,
          snapshot.data().pe_proacrobacia,
          snapshot.data().pe_proarcanismo,
          snapshot.data().pe_proatletismo,
          snapshot.data().pe_proatuacao,
          snapshot.data().pe_problefar,
          snapshot.data().pe_profurtividade,
          snapshot.data().pe_prohistoria,
          snapshot.data().pe_prointimidacao,
          snapshot.data().pe_prointuicao,
          snapshot.data().pe_proinvestigacao,
          snapshot.data().pe_prolidaranimais,
          snapshot.data().pe_promedicina,
          snapshot.data().pe_pronatureza,
          snapshot.data().pe_propercepcao,
          snapshot.data().pe_propersuacao,
          snapshot.data().pe_proprestidigitacao,
          snapshot.data().pe_prosobrevivencia,
          snapshot.data().pe_proreligiao,
          snapshot.data().pe_idhabilidadeconjuracao,
        ); 

      }
        
    })
    .catch((error) => {
      console.log('Erro ao efetuar busca: '+error);
      toast.error('Erro ao efetuar busca');
    });

    return LPersonagem;
}

export function getData(){

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
  
  console.log(formattedDate); 

  
}