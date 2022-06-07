import { useState } from 'react';
import {useMediaQuery, CircularProgress} from '@mui/material'

export default function CustomGallery({images = [], openModal = () => {}}) {
    const [loading, setLoading] = useState(true)
    const matches = useMediaQuery('(min-width:600px)');

    return(
        <div className='overflow-y-hidden overflow-x-auto drop-shadow-xl m-auto whitespace-nowrap rounded-md no-scrollbar h-full'>
            {/* <div className={`flex flex-row ${images.length > 1 ? 'animate-slide' : ''}`}> */}
            {loading && <CircularProgress/>}
            <div className='flex flex-row'>
                {images.map((value, index) => {
                    return (
                        <img onLoad={() => setLoading(false)} className={`h-56 ${matches ? 'w-fit' : 'w-full'} mx-2 rounded-md m-auto hover:cursor-pointer`} key={index} alt={`imgNO${index}`} src={value} onClick={() => openModal(value)} />
                    )
                })}
            </div>
        </div>
    )
}