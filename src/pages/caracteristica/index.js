import './caracteristica.css';
import '../../components/tile';
import Tile from '../../components/tile';

function Caracteristica(){
  return(
    <div className='cr_container'>

      <div className='cr_proficiencias'>
        <div className='cr_titulo'>
          <strong>Proficiencias</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          <Tile id='Força'> Força </Tile>
          <Tile id='Destreza'> Destreza </Tile>
          <Tile id='Constituição'> Constituição </Tile>
          <Tile id='Inteligência'> Inteligência </Tile>
          <Tile id='Sabedoria'> Sabedoria </Tile>
          <Tile id='Carisma'> Carisma </Tile>
        </ul>
      </div>

      <div className='cr_caracteristicas'>
        <div className='cr_titulo'>
          <strong>Caracteristicas</strong>
          <hr/>
        </div>
        <ul className='cr_lista'>
          <Tile/>
          <Tile/>
        </ul>
      </div>
    </div>
  );
}

export default Caracteristica;