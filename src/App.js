import react from 'react';
import {langContext} from './langContext';
import NavBar from "./Components/NavBar";
import Main from './Components/Main';
import MobileMain from './MobileComponents/MobileMain';
import Activities from "./Components/Activities";
import MobileActivities from './MobileComponents/MobileActivities';
import Experience from "./Components/Experience";
import MobileExperience from './MobileComponents/MobileExperience';
import Skills from "./Components/Skills";
import MobileSkills from './MobileComponents/MobileSkills';
import useMediaQuery from '@mui/material/useMediaQuery';
import './App.css';


function App() {
  const [lang, setLang] = react.useState(0); //0 is eng, 1 is thai
  const mobile = useMediaQuery('(max-width:600px)');
  return (
    <div>
      <langContext.Provider value={{ lang, setLang }}>
        <NavBar />
        {mobile ? <MobileMain /> : <Main />}
        {mobile ? <MobileActivities /> : <Activities />}
        {mobile ? <MobileExperience /> : <Experience />}
        {mobile ? <MobileSkills /> : <Skills />}
      </langContext.Provider>
    </div>
  );
}

export default App;
