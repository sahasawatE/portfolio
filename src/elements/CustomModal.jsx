import { useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material'

export default function CustomModal({open = false, close = () => {}, images = [], img = {}}) {
    const [selectImg, setSelectImg] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setSelectImg(img)
    },[img])
    return(
        <Backdrop
            open={open}
            sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.4)', zIndex:'10000' }}
        >
            <div
                className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div onLoad={() => setLoading(false)} className='absolute w-11/12 m-auto max-w-3xl'>
                    <div style={{ margin: '2em 0' }} className='w-full transform mx-auto outline-none focus:outline-none border-0 h-full'>
                        <button className='bg-white w-8 h-8 rounded-2xl mb-2' style={{ color: 'red' }} onClick={close}>x</button>
                        {loading && <CircularProgress/>}
                        <img className='relative flex flex-col rounded-lg shadow-lg' src={selectImg} alt='selectedImg' />
                    </div>
                    <div className={`no-scrollbar flex flex-row max-h-20 ${images.length > 1 ? 'overflow-x-scroll' : 'overflow-x-hidden'} overflow-y-hidden`}>
                        {images.length > 1 && images.map((value, index) => {
                            return (
                                <div key={`img-modal-${index}`}>
                                    <img className='hover:cursor-pointer' onClick={() => setSelectImg(value)} style={{ maxWidth: '8rem', margin: '0 2em' }} src={value} alt='selectedImg' />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Backdrop>
    );
}