import react from 'react';
import { langContext } from '../langContext';
import textDate from '../text.json';
import { Grid } from '@mui/material';
import CustomGallery from '../elements/CustomGallery';
import CustomModal from '../elements/CustomModal';
import Aos from 'aos';
import 'aos/dist/aos.css';
import bitkub from '../img/bitkub.png';
import project from '../img/projectFinal.png';
import project1 from '../img/project1.png'
import figmaProject1 from '../img/figmaProject1.png'
import figmaProject2 from '../img/figmaProject2.png'
import figmaProject3 from '../img/figmaProject3.png'
import figmaProject4 from '../img/figmaProject4.png'
import abbot1 from '../img/abbot1.JPG'
import abbot2 from '../img/abbot2.png'
import abbot3 from '../img/abbot3.png'
import abbot4 from '../img/abbot4.JPG'
import abbot5 from '../img/abbot5.JPG'

Aos.init({duration: 2000})
const projectImgList = [project, project1, figmaProject1, figmaProject2, figmaProject3, figmaProject4]
const bitkubImgList = [bitkub]
const abbotImgList = [abbot1, abbot2, abbot3, abbot4, abbot5]

const pageImageList = [bitkubImgList, projectImgList, abbotImgList]

export default function Experience(){
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
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200'>{lang === 0 ? 'EXPERIENCES' : 'ประสบการณ์'}</p>
            <br />
            {pageImageList.map((value,index) => (
                <div key={`experiences-${index}`} className='h-56 m-2 mb-16 flex flex-row' data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
                    <Grid container justifyContent={'space-between'}>
                        {index % 2 === 0 ?
                            <>
                                <Grid item xs={5}>
                                    <div className='max-w-xl h-56'>
                                        <CustomGallery images={value} openModal={(img) => {
                                            setSelectImg(img)
                                            setSelectImgList(value)
                                        }} />
                                    </div>
                                </Grid>
                                <Grid item xs={7}>
                                    <div className='ml-16 w-fit h-56 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll overflow-x-hidden'>
                                        <div className='pt-6 pl-6 pb-2 sticky'>
                                            <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences[index].date}</p>
                                        </div>
                                        <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences[index].detail}</p>
                                    </div>
                                </Grid>
                            </>
                            :
                            <>
                                <Grid item xs={7}>
                                    <div className='mr-16 w-fit h-56 rounded-lg bg-slate-50 drop-shadow-2xl overflow-scroll overflow-x-hidden'>
                                        <div className='pt-6 pl-6 pb-2 sticky'>
                                            <p className='md:text-lg sm:text-md font-bold text-zinc-500'>{text.experiences[index].date}</p>
                                        </div>
                                        <p className='pl-6 pr-6 pb-6 md:text-md sm:text-sm font-sans text-zinc-800'>{text.experiences[index].detail}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={5}>
                                    <div className='max-w-xl h-56'>
                                        <CustomGallery images={value} openModal={(img) => {
                                            setSelectImg(img)
                                            setSelectImgList(value)
                                        }} />
                                    </div>
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