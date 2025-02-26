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
  };

  const onChanceFalha = (event) => {
    const { name, checked } = event.target;
    setChkFalha((prev) => ({
      ...prev,
      [name]: checked,
    }));
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