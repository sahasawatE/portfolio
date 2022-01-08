import react from 'react';
import { langContext } from '../langContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import "./myComponent.css";
import textData from '../text.json';
import HokImg from '../img/1531830261478.JPG';

Aos.init({ duration: 2000 })

export default function MobileMain() {
    const { lang } = react.useContext(langContext);
    const [text, setText] = react.useState(textData.Eng);

    const options = {
        size: 180,
        minSize: 35,
        gutter: 26,
        provideProps: true,
        numCols: 3,
        fringeWidth: 160,
        yRadius: 130,
        xRadius: 130,
        cornerRadius: 86,
        showGuides: false,
        compact: true,
        gravitation: 5
    }

    const fromcolors = ['from-red-300', 'from-blue-300', 'from-slate-400', 'from-indigo-300', 'from-slate-500', 'from-blue-200', 'from-teal-400']
    const tocolors = ['to-orange-300', 'to-cyan-200', 'to-gray-200', 'to-indigo-400', 'to-gray-400', 'to-sky-400', 'to-cyan-300']

    react.useEffect(() => {
        if (lang === 1) {
            setText(textData.Thai)
        }
        else {
            setText(textData.Eng)
        }
    }, [lang])
    return(
        <div className='h-full w-full pb-12'>
            <div className='h-2'></div>
            <div data-aos='fade-up' className='m-auto h-16 w-10/12 pt-5'>
                <p className='flex justify-center text-3xl font-extrabold text-stone-900'>{text.displayName}</p>
            </div>
            <div data-aos='fade-up' data-aos-delay="200" className='m-auto h-16 w-10/12'>
                <p className='flex justify-center text-3xl font-extrabold text-stone-900'>{text.displaySurName}</p>
            </div>
            <div data-aos='fade-up' data-aos-delay="800" className='m-auto pt-2 h-32 w-10/12'>
                <p className='text-2xl flex justify-center font-extrabold text-pink-400'>{text.university}</p>
            </div>
            <div data-aos='fade-up' data-aos-delay="1000" className='w-9/12 h-auto m-auto'>
                <img className='inline drop-shadow-xl -z-10 rounded-2xl' src={HokImg} alt='hokimg' />
            </div>
            <div data-aos='fade-up' className='mt-10 flex justify-center flex-col'>
                <div className='flex justify-center flex-col mx-6'>
                    <p className='pb-1 text-lg font-semibold text-center'>{text.display.fullName}</p>
                    <p className='pb-1 text-mg font-medium text-center'>{text.display.displayEducation}</p>
                    <p className='pb-4 text-md font-medium text-center'>{text.display.displayGpax}</p>
                    <br/>
                    <p className='text-center'>{lang === 0 ? 'Tools Experience' : 'ประสบการณ์การใช้เครื่องมือ'}</p>
                </div>
                <BubbleUI options={options} className="myBubbleUI">
                    {text.display.ToolsExperience.map((value, index) => {
                        return (
                            <div key={`itemNo${index}`} className={`child bg-gradient-to-br ${fromcolors[index]} ${tocolors[index]} animate-float`}>
                                <p className='text-center font-semibold'>{Object.keys(value)}</p>
                                <p className='text-center'>{Object.values(value)}</p>
                            </div>
                        );
                    })}
                </BubbleUI>
            </div>
        </div>
    );
}