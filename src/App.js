import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Roles from './Components/Roles';
import Permissions from './Components/Permissions';

function App() {
  return (
    <div className="container-fluid w-50 mt-5 card">
      <Roles />
      <Permissions />
    </div>
  );
}

export default App;
