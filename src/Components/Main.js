import react from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Grid } from '@mui/material'
import { langContext } from '../langContext';
import HokImg from '../img/1531830261478.JPG';
import textDate from '../text.json';

Aos.init({ duration: 2000 })

const fromcolors = ['from-red-300', 'from-blue-400', 'from-slate-500', 'from-orange-600', 'from-indigo-300', 'from-slate-500', 'from-blue-300', 'from-orange-500', 'from-teal-400', 'from-stone-600']
const tocolors = ['to-orange-300', 'to-cyan-300', 'to-gray-400', 'to-orange-300', 'to-indigo-400', 'to-gray-400', 'to-sky-400', 'to-orange-300', 'to-cyan-300', 'to-neutral-400']

export default function Main(){
    const {lang} = react.useContext(langContext);
    const [text, setText] = react.useState(textDate.Eng);

    react.useEffect(() => {
        if(lang === 1){
            setText(textDate.Thai)
        }
        else{
            setText(textDate.Eng)
        }
    },[lang])
    return(
        <div className='pb-10'>
            <div className='m-auto md:h-24 sm:h-16 w-10/12 pt-5'>
                <p className='flex justify-center md:text-6xl sm:text-3xl font-extrabold text-stone-900'>{text.displayName}</p>
            </div>
            <div className='m-auto md:h-24 sm:h-16 w-10/12'>
                <p className='flex justify-center md:text-6xl sm:text-3xl font-extrabold text-stone-900'>{text.displaySurName}</p>
            </div>
            <div className='m-auto pt-2 h-32 md:w-144 sm:w-10/12'>
                <p className=' md:text-4xl sm:text-2xl sm:flex sm:justify-center font-extrabold text-pink-400'>{text.university}</p>
            </div>
            <div data-aos='fade-up' className='grid grid-cols-2 m-auto w-10/12 h-auto max-w-screen-lg'>
                <div className='md:w-8/12 sm:w-9/12 md:ml-20 h-auto'>
                    <img className='inline drop-shadow-xl rounded-2xl' src={HokImg} alt='hokimg' />
                </div>
                <div className='w-10/12 flex justify-end'>
                    <div className='flex justify-start flex-col'>
                        <p className='pb-1 text-lg font-semibold'>{text.display.fullName}</p>
                        <p className='pb-1 text-mg font-medium'>{text.display.displayEducation}</p>
                        <p className='pb-4 text-md font-medium'>{text.display.displayGpax}</p>
                        <p>{lang === 0 ? 'Tools Experience' : 'ประสบการณ์การใช้เครื่องมือ'}</p>
                        <Grid container spacing={1} className='pt-3 pl-2'>
                            {text.display.ToolsExperience.map((value, index) => {
                                return(
                                    <Grid item key={`itemNo${index}`}>
                                        <span className={`rounded-full bg-gray-100 text-sm flex align-center w-max cursor-default hover:bg-gradient-to-r ${fromcolors[index]} ${tocolors[index]} transition duration-300 ease-in-out`}>
                                            <p className={`px-4 py-2 hover:text-white font-semibold text-transparent bg-clip-text bg-gradient-to-r ${fromcolors[index]} ${tocolors[index]} transition duration-300 ease-in-out`}>
                                                {`${Object.keys(value)} (${Object.values(value)})`}
                                            </p>
                                        </span>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}