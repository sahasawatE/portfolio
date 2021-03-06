import react from 'react';
import { langContext } from '../langContext';
import textDate from '../text.json';
import CustomModal from '../elements/CustomModal';
import CustomGallery from '../elements/CustomGallery';
import Aos from 'aos';
import 'aos/dist/aos.css';
import bdms from '../img/bdms.png';
import figma from '../img/figma.png';

Aos.init({ duration: 2000 })
const bdmsImgList = [bdms]
const figmaImgList = [figma]

const pageImageList = [bdmsImgList, figmaImgList]

export default function MobileActivities() {
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
            <p className='text-4xl pb-4 font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200'>{lang === 0 ? 'ACTIVITIES' : 'กิจกรรม'}</p>
            <br />
            {pageImageList.map((value,index) => (
                <div key={`m-activities-${index}`} data-aos='fade-up' className='h-full m-auto mb-10'>
                    <CustomGallery images={value} openModal={(img) => {
                        setSelectImg(img)
                        setSelectImgList(value)
                    }} />
                    <div className='mt-4 h-40 md:w-80 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                        <div className='pt-6 pb-2 sticky'>
                            <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities[index].date}</p>
                        </div>
                        <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities[index].detail}</p>
                    </div>
                </div>
            ))}
            {/* <div data-aos='fade-up' className='h-full m-auto mb-10'>
                <CustomGallery images={bdmsImgList} openModal={(img) => {
                    setSelectImg(img)
                    setSelectImgList(bdmsImgList)
                }} />
                <div className='mt-4 h-40 md:w-80 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                    <div className='pt-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities.bdms.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities.bdms.detail}</p>
                </div>
            </div>
            <div data-aos='fade-up' className='h-full m-2 mb-6'>
                <CustomGallery images={figmaImgList} openModal={(img) => {
                    setSelectImg(img)
                    setSelectImgList(figmaImgList)
                }} />
                <div className='mt-4 h-40 md:w-80 overflow-scroll overflow-x-hidden rounded-2xl bg-slate-50'>
                    <div className='pt-6 pb-2 sticky'>
                        <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities.angalung.date}</p>
                    </div>
                    <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities.angalung.detail}</p>
                </div>
            </div> */}
            <CustomModal open={selectImg !== null} close={() => setSelectImg(null)} img={selectImg} images={selectImgList} />
        </div>
    );
}