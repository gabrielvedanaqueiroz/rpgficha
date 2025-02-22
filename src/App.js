import RoutesApp from './routers';
import AuthProvider from './utils/auth';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div>     
      <AuthProvider>
        <ToastContainer autoClose='3000'/>
        <RoutesApp/>
      </AuthProvider>
    </div>
    
  );
}

export default App;
