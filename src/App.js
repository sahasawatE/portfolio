import react from 'react';
import {langContext} from './langContext';
import NavBar from "./Components/NavBar";
import Main from './Components/Main';
import MobileMain from './MobileComponents/MobileMain';
import Activities from "./Components/Activities";
import Experience from "./Components/Experience";
import Skills from "./Components/Skills";
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [lang, setLang] = react.useState(0); //0 is eng, 1 is thai
  const mobile = useMediaQuery('(max-width:500px)');
  if(mobile){
    return (
      <langContext.Provider value={{ lang, setLang }}>
        <NavBar />
        <div>
          <MobileMain/>
        </div>
        activities
        experiences
        skills
      </langContext.Provider>
    );
  }
  else{
    return (
      <div className='flex justify-center flex-col'>
        <langContext.Provider value={{ lang, setLang }}>
          <NavBar />
          <div className='snap-y snap-mandatory overflow-scroll'>
            <div className='snap-start'>
              <Main />
            </div>
            <div className='snap-start'>
              <Activities />
            </div>
            <div className='snap-start'>
              <Experience />
            </div>
            <div className='snap-start'>
              <Skills />
            </div>
          </div>
        </langContext.Provider>
      </div>
    );
  }
}

export default App;
