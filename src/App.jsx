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
import Invite from "./components/Invite";
import Profile from "./components/Profile/Profile";
import EditItem from "./components/Profile/EditItem";


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
                <Route index={true}  path='/' element={<Main showToastEvent = {handleShowToastEvent}/>}/>
                <Route path='*' element={<NotFound/>}/>
                {/*<Route element={ <RequireAuth allowedRoles={ [ ROLES.User ]}/>}>*/}
                  <Route path='/about' element={<About/>}/>
                {/*</Route>*/}

                <Route path='/register' element={<RegisterForm showToast={handleShowToastEvent} />}/>
                <Route path='/signin' element={<Login showToast={handleShowToastEvent} />}/>

                <Route path='/profile' element={<Profile />}/>
                <Route path='/profile/edit' element={<EditItem showToast={handleShowToastEvent}/>}/>

                <Route path='/create' element={<CreateForm onChangePanel = {setPanelStatus} showToast={handleShowToastEvent}/>}/>
                <Route path='/create/BigBlueButton' element={<BBB />}/>
                <Route path='/create/Jitsi' element={< Jitsi/>}/>

                <Route path='/join' element={<JoinForm onChangePanel = {setPanelStatus} showToast={handleShowToastEvent} />}/>
                <Route path='/join/BigBlueButton' element={<BBB />}/>
                <Route path='/join/Jitsi' element={<Jitsi />}/>

              </Route>

              <Route path='/invite' element={<Invite showToast={handleShowToastEvent} />}/>

            </Routes>
          </div>
        </BrowserRouter>
      </>
    
  );
}

export default App;
