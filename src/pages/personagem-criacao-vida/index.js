import './personagem-criacao-vida.css';
import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BtnSalvarForm from '../../components/btnsalvarform';
import { toast } from 'react-toastify';
import {db} from '../../services/firebaseConnection';
import {doc, updateDoc} from 'firebase/firestore';

function PersonagemCriacaoVida() {
  
  return(<div/>)

  
  // navigate('/', {replace:true});
}

export default PersonagemCriacaoVida;