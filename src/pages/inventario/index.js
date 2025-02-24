import { useState } from 'react';
import './inventario.css';

function Inventario(){

  const [chkSucesso, setChkSucesso] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const [chkFalha, setChkFalha] = useState({
    option1: false,
    option2: false,
    option3: false,
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
    <div >

      <h2>Em Construção</h2>
      <div className='ttm-container'>
        <strong className='ttm-titulo'>Teste contra morte</strong>

        <div>
          <div >
            <input className='ttm-checkbox'
              type="checkbox"
              name="option1"
              checked={chkSucesso.option1}
              onChange={onChanceSucesso}
            />
            
            <input className='ttm-checkbox'
              type="checkbox"
              name="option2"
              checked={chkSucesso.option2}
              onChange={onChanceSucesso}
            />
          
            <input className='ttm-checkbox'
              type="checkbox"
              name="option3"
              checked={chkSucesso.option3}
              onChange={onChanceSucesso}
            />
            
            <label>Sucesso</label>
          </div>

          <div>
          <input className='ttm-checkbox'
              type="checkbox"
              name="option1"
              checked={chkFalha.option1}
              onChange={onChanceFalha}
            />
            
            <input className='ttm-checkbox'
              type="checkbox"
              name="option2"
              checked={chkFalha.option2}
              onChange={onChanceFalha}
            />
          
            <input className='ttm-checkbox'
              type="checkbox"
              name="option3"
              checked={chkFalha.option3}
              onChange={onChanceFalha}
            />
            <label>Falha</label>
          </div>
        </div>
      </div>

      {/* <p>Selecionados setChkSucesso: {Object.keys(chkSucesso).filter((key) => chkSucesso[key]).join(", ") || "Nenhum"}</p>
      <p>Selecionados setChkSucesso: {Object.keys(chkFalha).filter((key) => chkFalha[key]).join(", ") || "Nenhum"}</p> */}
    </div>
  );
}

export default Inventario;