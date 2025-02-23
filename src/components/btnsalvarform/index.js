import './btnsalvarform.css';
import { useFormStatus } from 'react-dom';

function BtnSalvarForm(){

  const { pending } = useFormStatus(); 

  return(
    <button className='mii_btn-salvar' type='submmit' disabled={pending}>
       {pending ? "Salvando..." : "Salvar"}
    </button>
  );
}

export default BtnSalvarForm;