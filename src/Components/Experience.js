import bitkub from '../img/bitkub.png';
import project from '../img/projectFinal.png';

export default function Experience(){
    return(
        <div className='p-16 h-screen'>
            <p className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200'>EXPERIENCES</p>
            <br />
            <div className='grid-cols-2 h-56 m-2 mb-16 flex flex-row'>
                <div className='grid w-5/12'>
                    <img className='my-auto hover:transition-transform hover:scale-125' src={bitkub} alt='bitkub' />
                </div>
                <div className='grid ml-16 w-7/12 rounded-lg bg-slate-50 drop-shadow-2xl'>
                    <p className='p-6 md:text-lg sx:text-md font-bold text-zinc-500'>14 June 2021 - 6 August 2021</p>
                </div>
            </div>
            <div className='grid-cols-2 h-56 m-2 mb-6 flex flex-row'>
                <div className='grid mr-16 w-7/12 rounded-lg bg-slate-50 drop-shadow-2xl'>
                    <p className='p-6 md:text-lg sx:text-md font-bold text-zinc-500'>August 2021 - Decembeer 2021</p>
                </div>
                <div className='grid w-5/12'>
                    <img className='my-auto hover:transition-transform hover:scale-125' src={project} alt='project' />
                </div>
            </div>
        </div>
    );
}