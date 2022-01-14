import react from 'react';
import { PhoneIcon, AtSymbolIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { langContext } from '../langContext';
import textDate from '../text.json';

export default function Contact() {
    const { lang } = react.useContext(langContext);
    const [text, setText] = react.useState(textDate.Eng);

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
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-700'>{lang === 0 ? 'CONTACT' : 'การติดต่อ'}</p>
            <br />
            <div>
                <div className='flex flex-row p-8 ml-4 hover:cursor-pointer hover:transition-transform hover:scale-105' onClick={() => window.open('https://www.google.co.th/maps/place/%E0%B8%97%E0%B9%87%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%97%E0%B8%A5+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0/@13.7289639,100.4688147,17z/data=!3m1!4b1!4m8!3m7!1s0x30e2984f01e7bd95:0xd764fe797f9e969f!5m2!4m1!1i2!8m2!3d13.7289587!4d100.4710034?hl=th','_blank')}>
                    <LocationMarkerIcon className="h-10 w-10 text-amber-500" />
                    <div className='p-2 ml-4'>{text.contact.address}</div>
                </div>
                <div className='flex flex-row p-8 ml-4 hover:cursor-pointer hover:transition-transform hover:scale-105' onClick={() => window.open(`tel:${text.contact.phone}`,'_blank')}>
                    <PhoneIcon className="h-10 w-10 text-green-600" />
                    <div className='p-2 ml-4'>{text.contact.phone}</div>
                </div>
                <div className='flex flex-row p-8 ml-4 hover:cursor-pointer hover:transition-transform hover:scale-105' onClick={() => window.open(`mailto:${text.contact.Email}`, '_blank')}>
                    <AtSymbolIcon className="h-10 w-10 text-blue-500" />
                    <div className='p-2 ml-4'>{text.contact.Email}</div>
                </div>
                <div className='flex flex-row p-8 ml-4 hover:cursor-pointer hover:transition-transform hover:scale-105' onClick={() => window.open(text.contact.github, '_blank')}>
                    <div className="h-10 w-10" >
                        <img alt='github' src="https://img.icons8.com/material-outlined/48/000000/github.png" />
                    </div>
                    <div className='p-2 ml-4'>{text.contact.github}</div>
                </div>
            </div>
        </div>
    );
}