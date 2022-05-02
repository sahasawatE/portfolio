import react from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DocumentDownloadIcon, GlobeAltIcon } from '@heroicons/react/solid';
import { langContext } from '../langContext';
import cv from '../importantFiles/sahasawatE_cv.pdf';

export default function NavBar(){
    const { lang, setLang } = react.useContext(langContext);
    const mobile = useMediaQuery('(max-width:600px)');
    return(
        <nav className='sticky z-50 top-0 w-screen backdrop-blur-md bg-opacity-75 bg-white'>
            <div className='grid grid-cols-2'>
                <div className='grid p-4'>
                    <div className='font-semibold text-zinc-600 my-auto pl-6'>{`< MyPortfolio />`}</div>
                </div>
                <div className='grid justify-end p-4 mr-4'>
                    {mobile ? 
                    <div className='w-24 flex flex-row justify-around'>
                        <div onClick={() => window.open(cv,'_blank')}>
                            <DocumentDownloadIcon className="h-6 w-6 text-blue-400"/>
                        </div>
                        <div className='flex flex-row' onClick={() => lang === 1 ? setLang(0) : setLang(1)}>
                            <GlobeAltIcon className="h-6 w-6 text-gray-500"/>
                            <div className='font-bold'>&nbsp;{lang === 1 ? 'TH' : 'EN'}</div>
                        </div>
                    </div>
                    :
                    <div className='w-80 flex flex-row justify-around'>
                        <div className='flex text-right flex-row w-9/12 justify-center pr-2 hover:cursor-pointer' onClick={() => window.open(cv, '_blank')}>
                            <DocumentDownloadIcon className="h-6 w-6 text-blue-400"/>
                            <div className='text-blue-400'>{lang === 1 ? "ประวัติย่อ" : "Curriculum Vitae"}</div>
                        </div>
                        <div className='flex flex-row justify-between w-3/12'>
                            <GlobeAltIcon className="h-6 w-6 text-gray-500"/>
                            <div className='hover:cursor-pointer' onClick={() => setLang(1)}>
                                <div className={lang === 1 ? 'font-bold' : 'font-normal'}>TH</div>
                            </div>
                            <div className='hover:cursor-pointer' onClick={() => setLang(0)}>
                                <div className={lang === 0 ? 'font-bold' : 'font-normal'}>EN</div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </nav>
    );
}