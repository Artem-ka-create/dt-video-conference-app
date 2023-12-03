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
import RegisterForm from './components/Forms/RegisterForm'
import Login from './components/Forms/Login'
import React, {useRef, useState} from 'react';
import RequireAuth from './components/RequireAuth';
import { Toast } from 'primereact/toast';


const ROLES = {
  'User': {id:1, name :"ROLE_USER"},
  'Admin': {id:2, name :"ROLE_ADMIN"},

}

function App() {

  const [panelStatus,setPanelStatus] = useState(false);
  const toast = useRef(null);


  const handlePanelStatusChange=(status) => {
    setPanelStatus(status);
  }
  const handleShowToastEvent = (toastType,summaryMsg,detailMsg, lifeTime)=> {
    toast.current.show({severity:toastType, summary: summaryMsg, detail:detailMsg, life: lifeTime});
  }


  return (
      <>

        <Toast ref={toast} />

        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<MainLayout showToast={handleShowToastEvent} panelStatus={panelStatus} onChangePanel={handlePanelStatusChange} />}>
                <Route index={true}  path='/' element={<Main/>}/>
                <Route path='*' element={<NotFound/>}/>

                <Route element={ <RequireAuth allowedRoles={ [ ROLES.User ]}/>}>
                  <Route path='/about' element={<About/>}/>
                </Route>

                <Route path='/register' element={<RegisterForm showToast={handleShowToastEvent} />}/>
                <Route path='/signin' element={<Login showToast={handleShowToastEvent} />}/>
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
      </>
    
  );
}

export default App;
