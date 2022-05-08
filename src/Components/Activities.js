import react from 'react';
import { langContext } from '../langContext';
import textDate from '../text.json';
import { Grid } from '@mui/material';
import CustomGallery from '../elements/CustomGallery';
import CustomModal from '../elements/CustomModal'
import Aos from 'aos';
import 'aos/dist/aos.css';
import bdms from '../img/bdms.png';
import figma from '../img/figma.png';

Aos.init({ duration: 2000 })
const bdmsImgList = [bdms]
const figmaImgList = [figma]

export default function Activities() {
    const { lang } = react.useContext(langContext);
    const [text, setText] = react.useState(textDate.Eng);
    const [selectImg, setSelectImg] = react.useState(null)
    const [selectImgList, setSelectImgList] = react.useState([])

    react.useEffect(() => {
        if (lang === 1) {
            setText(textDate.Thai)
        }
        else {
            setText(textDate.Eng)
        }
    }, [lang])
    return(
        <div className='p-16 h-auto'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200'>{lang === 0 ? 'ACTIVITIES' : 'กิจกรรม'}</p>
            <br/>
            <div data-aos='fade-right' className='h-56 m-2 mb-16 flex flex-row'>
                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={5}>
                        <CustomGallery images={bdmsImgList} openModal={(img) => {
                            setSelectImg(img)
                            setSelectImgList(bdmsImgList)
                        }} />
                    </Grid>
                    <Grid item xs={7}>
                        <div className='ml-16 w-fit h-56 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll overflow-x-hidden'>
                            <div className='pt-6 pl-6 pb-2 sticky'>
                                <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities.bdms.date}</p>
                            </div>
                            <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities.bdms.detail}</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div data-aos='fade-left' className='h-56 m-2 mb-6 flex flex-row'>
                <Grid container justifyContent={'space-between'}>
                    <Grid item xs={7}>
                        <div className='mr-16 w-fit h-56 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll overflow-x-hidden'>
                            <div className='pt-6 pl-6 pb-2 sticky'>
                                <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities.angalung.date}</p>
                            </div>
                            <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities.angalung.detail}</p>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <CustomGallery images={figmaImgList} openModal={(img) => {
                            setSelectImg(img)
                            setSelectImgList(figmaImgList)
                        }} />
                    </Grid>
                </Grid>
            </div>

            <CustomModal open={selectImg !== null} close={() => setSelectImg(null)} img={selectImg} images={selectImgList} />
        </div>
    );
}