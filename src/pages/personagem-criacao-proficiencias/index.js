import './personagem-criacao-proficiencias.css';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';

function PersonagemCriacaoProficiencia() {
  
  return(<div/>)

  
  // navigate('/personagem-criacao-vida', {replace:true});
}

export default PersonagemCriacaoProficiencia;