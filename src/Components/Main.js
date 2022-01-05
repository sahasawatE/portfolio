import HokImg from '../img/1531830261478.JPG'

export default function Main(){
    return(
        <div className='h-screen'>
            <div className='m-auto md:h-24 sm:h-16 w-10/12 pt-5'>
                <p className='flex justify-center md:text-6xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-stone-500 to-stone-900'>Sahasawat</p>
            </div>
            <div className='m-auto h-24 w-10/12'>
                <p className='flex justify-center md:text-6xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-stone-500 to-stone-900'>Eungwanitchaphan</p>
            </div>
            <div className='m-auto pt-2 h-32 md:w-144 sm:w-10/12'>
                <p className=' md:text-4xl sm:text-2xl sm:flex sm:justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br  from-purple-500 to-fuchsia-400'>CHULALONGKORN UNIVERSITY</p>
            </div>
            <div className='grid grid-cols-2 m-auto w-10/12'>
                <div className='md:w-8/12 sm:w-9/12 md:ml-20 animate-slideInleft'>
                    <img className='inline drop-shadow-2xl -z-10 rounded-2xl' src={HokImg} alt='hokimg' />
                </div>
                <div className='w-10/12 mr-2 flex justify-end animate-slideInleft'>
                    <div className='flex justify-start flex-col'>
                        <p className='pb-1 text-lg font-semibold'>Mr. Sahasawat Eungwanitchaphan</p>
                        <p className='pb-1 text-mg font-medium'>B.Sc., Computer Science, May 2023</p>
                        <p className='pb-4 text-md font-medium'>Cumulative 2.52 GPAX</p>
                        <p>Tools Experience</p>
                        <ul class="marker:text-sky-500 list-disc pl-8 pt-2 space-y-3 text-gray-700">
                            <li>MySql: 3 Years</li>
                            <li>ReactJS: 2 Years</li>
                            <li>Express NodeJS: 1 Year</li>
                            <li>Figma: 1 Year</li>
                            <li>React Native: 3 Months</li>
                            <li>TailwindCSS: 1 Month</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}