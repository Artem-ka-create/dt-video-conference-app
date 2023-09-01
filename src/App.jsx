// import { http } from 'bigbluebutton-js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import About from './components/About';
import NotFound from './components/NotFound';
import Main from './components/Main';
import JoinForm from './components/Forms/JoinForm';
import CreateForm from './components/Forms/CreateForm';
import BBB from './components/BBB';
import Jitsi from './components/Jitsi'
import { useState } from 'react';



function App() {

  const [panelStatus,setPanelStatus] = useState(false);

  const handlePanelStatusChange=(status) => {
    setPanelStatus(status);
  }


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainLayout panelStatus={panelStatus} onChangePanel={handlePanelStatusChange} />}>
            <Route index={true}  path='/' element={<Main/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/create' element={<CreateForm onChangePanel = {setPanelStatus} />}/>
            <Route path='/join' element={<JoinForm onChangePanel = {setPanelStatus} />}/>
            <Route path='/create/bbb' element={<BBB />}/>
            <Route path='/join/bbb' element={<BBB />}/>
            <Route path='/create/jitsi' element={< Jitsi/>}/>
            <Route path='/join/jitsi' element={<Jitsi />}/>
          
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
