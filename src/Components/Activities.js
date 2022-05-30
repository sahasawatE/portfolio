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

const pageImageList = [bdmsImgList, figmaImgList]

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
            {pageImageList.map((value,index) => (
                <div key={`activities-${index}`} className='h-56 m-2 mb-16 flex flex-row' data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
                    <Grid container justifyContent={'space-between'}>
                        {index % 2 === 0 ?
                            <>
                                <Grid item xs={5}>
                                    <CustomGallery images={value} openModal={(img) => {
                                        setSelectImg(img)
                                        setSelectImgList(value)
                                    }} />
                                </Grid>
                                <Grid item xs={7}>
                                    <div className='ml-16 w-fit h-56 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll overflow-x-hidden'>
                                        <div className='pt-6 pl-6 pb-2 sticky'>
                                            <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities[index].date}</p>
                                        </div>
                                        <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities[index].detail}</p>
                                    </div>
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item xs={7}>
                                    <div className='mr-16 w-fit h-56 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll overflow-x-hidden'>
                                        <div className='pt-6 pl-6 pb-2 sticky'>
                                            <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.activities[index].date}</p>
                                        </div>
                                        <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.activities[index].detail}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <CustomGallery images={value} openModal={(img) => {
                                        setSelectImg(img)
                                        setSelectImgList(value)
                                    }} />
                                </Grid>
                            </>
                        }
                    </Grid>
                </div>
            ))}

            <CustomModal open={selectImg !== null} close={() => setSelectImg(null)} img={selectImg} images={selectImgList} />
        </div>
    );
}