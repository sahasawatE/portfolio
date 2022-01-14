import react from 'react';
import { langContext } from '../langContext';
import reactIcon from '../img/logo512.png'

export default function Skills(){
    const { lang } = react.useContext(langContext);
    return(
        <div className='p-16 h-auto'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500'>{lang === 0 ? 'SKILLS' : 'ความสามารถ'}</p>
            <br />
            <div className='w-12/12 h-88'>
                <div className='grid-rows-3 flex flex-col'>
                    <div className='grid-cols-3 flex flex-row justify-around m-6'>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img src={reactIcon} alt='react'/></div>
                            <div className='bottom-0 flex justify-center'>React</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img src={reactIcon} alt='reactNative' /></div>
                            <div className='bottom-0 flex justify-center'>React Native</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='js' src="https://img.icons8.com/color/144/000000/javascript--v1.png" /></div>
                            <div className='bottom-0 flex justify-center'>JS</div>
                        </div>
                    </div>
                    <div className='grid-cols-3 flex flex-row justify-around m-6'>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='html5' src="https://img.icons8.com/color/144/000000/html-5--v1.png" /></div>
                            <div className='bottom-0 flex justify-center'>HTML5</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='php' src="https://img.icons8.com/officel/160/000000/php-logo.png" /></div>
                            <div className='bottom-0 flex justify-center'>PHP</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='mysql' src="https://img.icons8.com/color/144/000000/mysql-logo.png" /></div>
                            <div className='bottom-0 flex justify-center'>MySql</div>
                        </div>
                    </div>
                    <div className='grid-cols-3 flex flex-row justify-around m-6'>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='figma' src="https://img.icons8.com/color/144/000000/figma--v1.png" /></div>
                            <div className='bottom-0 flex justify-center'>Figma</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='css' src="https://img.icons8.com/color/144/000000/css3.png" /></div>
                            <div className='bottom-0 flex justify-center'>CSS</div>
                        </div>
                        <div className='w-24 h-24'>
                            <div className='top-0 flex justify-center'><img alt='postman' src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/000000/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png" /></div>
                            <div className='bottom-0 flex justify-center'>Postman</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}