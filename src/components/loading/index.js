import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Loading(){

  const numeroAleatorio1 = Math.floor(Math.random() * 4) + 1;
  const numeroAleatorio2 = Math.floor(Math.random() * 4) + 1;
  const numeroAltura = Math.floor(Math.random() * 65) + 1;

  function Box({ children }) {
    return (
      <div
        style={{
          border: '1px solid #ccc',
          display: 'block',
          lineHeight: 2,
          padding: '3rem',
          marginBottom: '0.5rem',
          width: '100%',
        }}
      >
        {children}
      </div>
    );
  }

  return(
    <div>
      <Skeleton height={65} />
      <br/>
      <Skeleton/>
      <Skeleton wrapper={Box} count={numeroAleatorio1}/> 
      <br/>
      <br/>
      <Skeleton/>
      <Skeleton height={numeroAltura} />
      <br/>
      <Skeleton wrapper={Box} count={numeroAleatorio2}/> 
    </div>
  );
}

export default Loading;