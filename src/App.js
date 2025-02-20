import RoutesApp from './routers';
import AuthProvider from './utils/auth';


function App() {

  return (
    <div>     
      <AuthProvider>
        <RoutesApp/>
      </AuthProvider>
    </div>
    
  );
}

export default App;
