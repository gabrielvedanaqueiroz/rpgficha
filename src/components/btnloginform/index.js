import './btnloginform.css';
import { useFormStatus } from 'react-dom';

function BtnLoginForm(){

  const { pending } = useFormStatus(); 

  return(
    <button className='btl_botao' type='submmit' disabled={pending}>
       {pending ? "Acessando..." : "Acessar"}
    </button>
  );
}

export default BtnLoginForm;