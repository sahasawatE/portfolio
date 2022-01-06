import react from 'react';
import { langContext } from '../langContext';
import HokImg from '../img/1531830261478.JPG';
import textDate from '../text.json';

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
        <div className='h-screen'>
            <div className='m-auto md:h-24 sm:h-16 w-10/12 pt-5'>
                <p className='flex justify-center md:text-6xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-stone-500 to-stone-900'>{text.displayName}</p>
            </div>
            <div className='m-auto md:h-24 sm:h-16 w-10/12'>
                <p className='flex justify-center md:text-6xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-stone-500 to-stone-900'>{text.displaySurName}</p>
            </div>
            <div className='m-auto pt-2 h-32 md:w-144 sm:w-10/12'>
                <p className=' md:text-4xl sm:text-2xl sm:flex sm:justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br  from-pink-500 to-fuchsia-400'>{text.university}</p>
            </div>
            <div className='grid grid-cols-2 m-auto w-10/12'>
                <div className='md:w-8/12 sm:w-9/12 md:ml-20 animate-slideInleft'>
                    <img className='inline drop-shadow-2xl -z-10 rounded-2xl' src={HokImg} alt='hokimg' />
                </div>
                <div className='w-10/12 mr-2 flex justify-end animate-slideInleft'>
                    <div className='flex justify-start flex-col'>
                        <p className='pb-1 text-lg font-semibold'>{text.display.fullName}</p>
                        <p className='pb-1 text-mg font-medium'>{text.display.displayEducation}</p>
                        <p className='pb-4 text-md font-medium'>{text.display.displayGpax}</p>
                        <p>{lang === 0 ? 'Tools Experience' : 'ประสบการณ์การใช้เครื่องมือ'}</p>
                        <ul className="marker:text-sky-500 list-disc pl-8 pt-2 space-y-3 text-gray-700">
                            {text.display.ToolsExperience.map((value, index) => {
                                return(
                                    <li key={`itemNo${index}`}>{Object.keys(value)}: {Object.values(value)}</li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}