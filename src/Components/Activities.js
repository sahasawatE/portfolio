import bdms from '../img/bdms.png';
import figma from '../img/figma.png';

export default function Activities(){
    return(
        <div className='p-16 h-screen'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200 drop-shadow-2xl'>ACTIVITIES</p>
            <br/>
            <div className='grid-cols-2 h-56 m-2 mb-16 flex flex-row'>
                <div className='grid w-5/12'>
                    <img className='my-auto hover:transition-transform hover:scale-125' src={bdms} alt='bdms' />
                </div>
                <div className='grid ml-16 w-7/12 rounded-lg bg-slate-50 drop-shadow-2xl'>
                    <p className='p-6 text-lg font-bold text-zinc-500'>February 2021</p>
                </div>
            </div>
            <div className='grid-cols-2 h-56 m-2 mb-6 flex flex-row'>
                <div className='grid mr-16 w-7/12 rounded-lg bg-slate-50 drop-shadow-2xl'>
                    <p className='p-6 text-lg font-bold text-zinc-500'>April 2021</p>
                </div>
                <div className='grid w-5/12'>
                    <img className='my-auto hover:transition-transform hover:scale-125' src={figma} alt='figma' />
                </div>
            </div>
        </div>
    );
}