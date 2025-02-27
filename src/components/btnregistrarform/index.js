import './btnregistrarform.css';
import { useFormStatus } from 'react-dom';

function BtnRegistrarForm(){

  const { pending } = useFormStatus(); 

  return(
    <button className='btl_botao' type='submmit' disabled={pending}>
       {pending ? "Salvando..." : "Salvar"}
    </button>
  );
}

export default BtnRegistrarForm;