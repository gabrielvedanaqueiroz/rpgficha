import { useState } from 'react';
import './tiletestemorte.css';

function TileTesteMorte(props){

  const [chkSucesso, setChkSucesso] = useState({
    option1: !!props.pe_tcmsucesso1,
    option2: !!props.pe_tcmsucesso2,
    option3: !!props.pe_tcmsucesso3,
  });

  const [chkFalha, setChkFalha] = useState({
    option1: !!props.pe_tcmfalha1,
    option2: !!props.pe_tcmfalha2,
    option3: !!props.pe_tcmfalha3,
  });

  const onChanceSucesso = (event) => {
    const { name, checked } = event.target;
    setChkSucesso((prev) => ({
      ...prev,
      [name]: checked,
    }));

    let s1, s2, s3 = false;
    switch (name){
      case 'option1': 
        s1 = checked;
        s2 = chkSucesso.option2;
        s3 = chkSucesso.option3;
      break;
      case 'option2': 
        s2 = checked;
        s1 = chkSucesso.option1;
        s3 = chkSucesso.option3;
      break;
      case 'option3': 
        s3 = checked;
        s1 = chkSucesso.option1;
        s2 = chkSucesso.option2;
      break;
    }
    props.sucesso(s1, s2, s3);
  };

  const onChanceFalha = (event) => {
    const { name, checked } = event.target;
    setChkFalha((prev) => ({
      ...prev,
      [name]: checked,
    }));

    let f1, f2, f3 = false;
    switch (name){
      case 'option1': 
        f1 = checked;
        f2 = chkFalha.option2;
        f3 = chkFalha.option3;
      break;
      case 'option2': 
        f2 = checked;
        f1 = chkFalha.option1;
        f3 = chkFalha.option3;
      break;
      case 'option3': 
        f3 = checked;
        f1 = chkFalha.option1;
        f2 = chkFalha.option2;
      break;
    }

    props.falha(f1, f2, f3);
  };

  return(
      <div className='tetm-container'>
        <strong className='tetm-titulo'>Teste contra morte</strong>

        <div>
          <div >
            <input className='tetm-checkbox'
              type="checkbox"
              name="option1"
              checked={chkSucesso.option1}
              onChange={onChanceSucesso}
            />
            
            <input className='tetm-checkbox'
              type="checkbox"
              name="option2"
              checked={chkSucesso.option2}
              onChange={onChanceSucesso}
            />
          
            <input className='tetm-checkbox'
              type="checkbox"
              name="option3"
              checked={chkSucesso.option3}
              onChange={onChanceSucesso}
            />
            
            <label>Sucesso</label>
          </div>

          <div>
          <input className='tetm-checkbox'
              type="checkbox"
              name="option1"
              checked={chkFalha.option1}
              onChange={onChanceFalha}
            />
            
            <input className='tetm-checkbox'
              type="checkbox"
              name="option2"
              checked={chkFalha.option2}
              onChange={onChanceFalha}
            />
          
            <input className='tetm-checkbox'
              type="checkbox"
              name="option3"
              checked={chkFalha.option3}
              onChange={onChanceFalha}
            />
            <label>Falha</label>
          </div>
        </div>
      </div>

    
  );
}

export default TileTesteMorte;