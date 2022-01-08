import react from 'react';
import { langContext } from '../langContext';
import reactIcon from '../img/logo512.png'

export default function Skills(){
    const { lang } = react.useContext(langContext);
    return(
        <div className='p-16 h-screen w-screen'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500'>{lang === 0 ? 'SKILLS' : 'ความสามารถ'}</p>
            <br />
            <div className='w-12/12 h-88'>
                <div className='grid-rows-3 flex flex-col'>
                    <div className='grid-cols-3 flex flex-row justify-around m-6'>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img src={reactIcon} alt='react'/></div>
                            <div className='bottom-0 flex justify-center'>react</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img src={reactIcon} alt='reactNative' /></div>
                            <div className='bottom-0 flex justify-center'>react native</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='js' src="https://img.icons8.com/color/144/000000/javascript--v1.png" /></div>
                            <div className='bottom-0 flex justify-center'>js</div>
                        </div>
                    </div>
                    <div className='grid-cols-3 flex flex-row justify-around m-6'>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='html5' src="https://img.icons8.com/color/144/000000/html-5--v1.png" /></div>
                            <div className='bottom-0 flex justify-center'>html5</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='php' src="https://img.icons8.com/officel/160/000000/php-logo.png" /></div>
                            <div className='bottom-0 flex justify-center'>php</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='mysql' src="https://img.icons8.com/color/144/000000/mysql-logo.png" /></div>
                            <div className='bottom-0 flex justify-center'>mysql</div>
                        </div>
                    </div>
                    <div className='grid-cols-3 flex flex-row justify-around m-6'>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='python3' src="https://img.icons8.com/color/144/000000/python--v1.png" /></div>
                            <div className='bottom-0 flex justify-center'>python3</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='css' src="https://img.icons8.com/color/144/000000/css3.png" /></div>
                            <div className='bottom-0 flex justify-center'>css</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='bootstrap5' src="https://cdn.cdnlogo.com/logos/b/74/bootstrap-5.svg" /></div>
                            <div className='bottom-0 flex justify-center'>bootstrap5</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>And The Most Important Thing</div>
            <div>I Can</div>
            <div>Center</div>
            <div>a</div>
            <div>div</div> */}
        </div>
    );
}