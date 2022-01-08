import react from 'react';
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import "./myComponent.css";
import { langContext } from '../langContext';
import reactIcon from '../img/logo512.png'

export default function MobileSkills() {
    const { lang } = react.useContext(langContext);
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
    return (
        <div className='h-auto'>
            <p className='p-16 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500'>{lang === 0 ? 'SKILLS' : 'ความสามารถ'}</p>
            <br />
            <div className='w-12/12 h-88'>
                <BubbleUI options={options} className="myBubbleUI">
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img src={reactIcon} alt='react' /></div>
                        <div className='bottom-0 flex justify-center'>react</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img src={reactIcon} alt='reactNative' /></div>
                        <div className='bottom-0 flex justify-center'>react native</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='js' src="https://img.icons8.com/color/144/000000/javascript--v1.png" /></div>
                        <div className='bottom-0 flex justify-center'>js</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='html5' src="https://img.icons8.com/color/144/000000/html-5--v1.png" /></div>
                        <div className='bottom-0 flex justify-center'>html5</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='php' src="https://img.icons8.com/officel/160/000000/php-logo.png" /></div>
                        <div className='bottom-0 flex justify-center'>php</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='mysql' src="https://img.icons8.com/color/144/000000/mysql-logo.png" /></div>
                        <div className='bottom-0 flex justify-center'>mysql</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='python3' src="https://img.icons8.com/color/144/000000/python--v1.png" /></div>
                        <div className='bottom-0 flex justify-center'>python3</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='css' src="https://img.icons8.com/color/144/000000/css3.png" /></div>
                        <div className='bottom-0 flex justify-center'>css</div>
                    </div>
                    <div className='child'>
                        <div className='top-0 flex justify-center'><img alt='bootstrap5' src="https://cdn.cdnlogo.com/logos/b/74/bootstrap-5.svg" /></div>
                        <div className='bottom-0 flex justify-center'>bootstrap5</div>
                    </div>
                </BubbleUI>
            </div>
            {/* <div>And The Most Important Thing</div>
            <div>I Can</div>
            <div>Center</div>
            <div>a</div>
            <div>div</div> */}
        </div>
    );
}