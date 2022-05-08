import react from 'react';
import { langContext } from '../langContext';
import textDate from '../text.json';
import CustomModal from '../elements/CustomModal';
import CustomGallery from '../elements/CustomGallery';
import Aos from 'aos';
import 'aos/dist/aos.css';
import bitkub from '../img/bitkub.png';
import project from '../img/projectFinal.png';
import project1 from '../img/project1.png'
import figmaProject1 from '../img/figmaProject1.png'
import figmaProject2 from '../img/figmaProject2.png'
import figmaProject3 from '../img/figmaProject3.png'
import figmaProject4 from '../img/figmaProject4.png'

Aos.init({ duration: 2000 })
const projectImgList = [project, project1, figmaProject1, figmaProject2, figmaProject3, figmaProject4]
const bitkubImgList = [bitkub]

export default function MobileExperience() {
    const { lang } = react.useContext(langContext);
    const [text, setText] = react.useState(textDate.Eng);
    const [selectImg, setSelectImg] = react.useState(null);
    const [selectImgList, setSelectImgList] = react.useState([])

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
            <p className='text-4xl pb-4 font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200'>{lang === 0 ? 'EXPERIENCES' : 'ประสบการณ์'}</p>
            <br />
            <div data-aos='fade-up' className='h-full m-auto mb-10'>
                <CustomGallery images={bitkubImgList} openModal={(img) => {
                    setSelectImg(img)
                    setSelectImgList(bitkubImgList)
                }} />
                <div className='mt-4 h-40 md:w-80 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                    <div className='pt-6 pl-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences.bitkub.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences.bitkub.detail}</p>
                </div>
            </div>
            <div data-aos='fade-up' className='h-full m-2 mb-6'>
                <CustomGallery images={projectImgList} openModal={(img) => {
                    setSelectImg(img)
                    setSelectImgList(projectImgList)
                }} />
                <div className='mt-4 h-40 md:w-80 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                    <div className='pt-6 pl-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences.fianlProject.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences.fianlProject.detail}</p>
                </div>
            </div>
            <CustomModal open={selectImg !== null} close={() => setSelectImg(null)} img={selectImg} images={selectImgList} />
        </div>
    );
}