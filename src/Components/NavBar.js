import react from 'react';
import { langContext } from '../langContext';

export default function NavBar(){
    const {lang, setLang} = react.useContext(langContext);
    return(
        <div className='sticky z-50 top-0 w-auto backdrop-blur-md bg-opacity-75 bg-white'>
            <div className='grid grid-cols-2'>
                <div className='grid p-4'>
                    <div className='font-semibold text-zinc-600 my-auto pl-6'>MyPortfolio</div>
                </div>
                <div className='grid justify-end p-4 mr-8'>
                    <div className='w-20 flex flex-row justify-around'>
                        <div className='hover:cursor-pointer' onClick={() => setLang(1)}>
                            <div className={lang === 1 ? 'font-bold' : 'font-normal'}>TH</div>
                        </div>
                        <div className='hover:cursor-pointer' onClick={() => setLang(0)}>
                            <div className={lang === 0 ? 'font-bold' : 'font-normal'}>EN</div>
                        </div>
                    </div>
                </div>
                <div className='grid bg-red-400'></div>
            </div>
        </div>
    );
}