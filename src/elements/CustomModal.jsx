import {Backdrop} from '@mui/material'
export default function CustomModal({open = false, close = () => {}, img = {}}) {
    return(
        <Backdrop
            open={open}
            sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.4)' }}
            onClick={close}
        >
            <div
                className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-11/12 m-auto max-w-3xl">
                    {/*content*/}
                    <img className='w-full transform mx-auto outline-none focus:outline-none border-0 rounded-lg shadow-lg relative flex flex-col h-full' src={img} alt='selectedImg' />
                </div>
            </div>
        </Backdrop>
    );
}