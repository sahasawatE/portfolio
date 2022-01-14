import react from 'react';
import { PhoneIcon, AtSymbolIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { langContext } from '../langContext';
import textDate from '../text.json';

export default function MobileContact() {
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
    return (
        <div className='h-auto pb-16'>
            <p className='p-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-700'>{lang === 0 ? 'CONTACT' : 'การติดต่อ'}</p>
            <br />
            <div>
                <div className='w-10/12 flex flex-row m-auto' onClick={() => window.open('https://www.google.co.th/maps/place/%E0%B8%97%E0%B9%87%E0%B8%AD%E0%B8%9B%E0%B9%80%E0%B8%97%E0%B8%A5+%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0/@13.7289639,100.4688147,17z/data=!3m1!4b1!4m8!3m7!1s0x30e2984f01e7bd95:0xd764fe797f9e969f!5m2!4m1!1i2!8m2!3d13.7289587!4d100.4710034?hl=th', '_blank')}>
                    <LocationMarkerIcon className="h-12 w-12 p-2 text-amber-500" />
                    <p className='p-2 ml-4 break-words w-9/12'>{text.contact.address}</p>
                </div>
                <div className='w-10/12 flex flex-row m-auto' onClick={() => window.open(`tel:${text.contact.phone}`, '_blank')}>
                    <PhoneIcon className="h-12 w-12 p-2 text-green-600" />
                    <p className='p-2 ml-4 break-words w-9/12'>{text.contact.phone}</p>
                </div>
                <div className='w-10/12 flex flex-row m-auto' onClick={() => window.open(`mailto:${text.contact.Email}`, '_blank')}>
                    <AtSymbolIcon className="h-12 w-12 p-2 text-blue-500" />
                    <p className='p-2 ml-4 break-words w-9/12'>{text.contact.Email}</p>
                </div>
                <div className='w-10/12 flex flex-row m-auto' onClick={() => window.open(text.contact.github, '_blank')}>
                    <div className="h-12 w-12 p-2" >
                        <img alt='github' src="https://img.icons8.com/material-outlined/48/000000/github.png" />
                    </div>
                    <p className='p-2 ml-4 break-words w-9/12'>{text.contact.github}</p>
                </div>
            </div>
        </div>
    );
}