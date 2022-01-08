import react from 'react';
import { langContext } from '../langContext';
import textDate from '../text.json';
import { Modal } from '@mui/material';
import Aos from 'aos';
import 'aos/dist/aos.css';
import bitkub from '../img/bitkub.png';
import project from '../img/projectFinal.png';

Aos.init({ duration: 2000 })

export default function MobileExperience() {
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
    return (
        <div className='p-16 h-auto'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200'>{lang === 0 ? 'EXPERIENCES' : 'ประสบการณ์'}</p>
            <br />
            <div data-aos='fade-up' className='w-88 h-full m-auto mb-10'>
                <img className='h-56 drop-shadow-xl m-auto hover:cursor-pointer hover:transition-transform hover:scale-105' onClick={() => setSelectImg(bitkub)} src={bitkub} alt='bitkub' />
                <div className='mt-4 h-40 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                    <div className='pt-6 pl-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences.bitkub.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences.bitkub.detail}</p>
                </div>
            </div>
            <div data-aos='fade-up' className='h-full m-2 mb-6'>
                <img className='h-56 drop-shadow-xl m-auto hover:cursor-pointer hover:transition-transform hover:scale-105' onClick={() => setSelectImg(project)} src={project} alt='project' />
                <div className='mt-4 h-40 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                    <div className='pt-6 pl-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences.fianlProject.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences.fianlProject.detail}</p>
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