// import { http } from 'bigbluebutton-js';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import About from './components/About';
import NotFound from './components/NotFound';
import Main from './components/Main';
import JoinForm from './components/JoinForm';
import CreateForm from './components/CreateForm';



function App() {



  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/' element={<Main/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/create' element={<CreateForm/>}/>
            <Route path='/join' element={<JoinForm />}/>

          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
