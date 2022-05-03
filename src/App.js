import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';
import Roles from './Components/Roles';
import Permissions from './Components/Permissions';

function App() {
  const [perList, setPerList] = useState();
  const [perIDList, setPerIDList] = useState();

  return (
    <div className="container-fluid w-50 mt-5 card">
      <Roles
        setPerList={setPerList}
        perList={perList}
        perIDList={perIDList}
        setPerIDList={setPerIDList}
      />
      <Permissions
        perList={perList}
        setPerList={setPerList}
        setPerIDList={setPerIDList}
      />
    </div>
  );
}

export default App;
