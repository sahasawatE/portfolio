import react from 'react';
import { langContext } from '../langContext';
import textDate from '../text.json';
import { Modal } from '@mui/material';
import bitkub from '../img/bitkub.png';
import project from '../img/projectFinal.png';

export default function Experience(){
    const { lang } = react.useContext(langContext);
    const [text, setText] = react.useState(textDate.Eng);
    const [selectImg, setSelectImg] = react.useState(null);

    react.useEffect(() => {
        if (lang === 1) {
            setText(textDate.Thai)
        }
        else {
            setText(textDate.Eng)
        }
    }, [lang])
    return(
        <div className='p-16 h-screen'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200'>{lang === 0 ? 'EXPERIENCES' : 'ประสบการณ์'}</p>
            <br />
            <div className='grid-cols-2 h-56 m-2 mb-16 flex flex-row'>
                <div className='grid w-5/12'>
                    <img className='my-auto hover:cursor-pointer hover:transition-transform hover:scale-125' onClick={() => setSelectImg(bitkub)} src={bitkub} alt='bitkub' />
                </div>
                <div className='grid ml-16 w-7/12 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll'>
                    <div className='pt-6 pl-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences.bitkub.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences.bitkub.detail}</p>
                </div>
            </div>
            <div className='grid-cols-2 h-56 m-2 mb-6 flex flex-row'>
                <div className='grid mr-16 w-7/12 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll'>
                    <div className='pt-6 pl-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences.fianlProject.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences.fianlProject.detail}</p>
                </div>
                <div className='grid w-5/12'>
                    <img className='my-auto hover:cursor-pointer hover:transition-transform hover:scale-125' onClick={() => setSelectImg(project)} src={project} alt='project' />
                </div>
            </div>
            <Modal
                open={selectImg !== null}
                onClose={() => setSelectImg(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ sx: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.4)' } }}
            >
                <img className='w-10/12 transform m-auto flex translate-y-1/4' src={selectImg} alt='selectedImg' />
            </Modal>
        </div>
    );
}