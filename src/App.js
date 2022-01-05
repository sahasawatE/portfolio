import NavBar from "./Components/NavBar";
import Main from './Components/Main';
import Activities from "./Components/Activities";
import Experience from "./Components/Experience";
import Skills from "./Components/Skills";
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const mobile = useMediaQuery('(max-width:500px)');
  if(mobile){
    return (
      <div>
        hok
      </div>
    );
  }
  else{
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
