import './btnsalvarform.css';
import { useFormStatus } from 'react-dom';

function BtnSalvarForm(props){

  const { pending } = useFormStatus(); 
  

  return(
    <button className='mii_btn-salvar' type='submmit' disabled={pending}>
       {pending ? props.esperando : props.inicial}
    </button>
  );
}

export default BtnSalvarForm;