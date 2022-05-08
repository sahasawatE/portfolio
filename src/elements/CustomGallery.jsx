export default function CustomGallery({images = [], openModal = () => {}}) {

    return(
        <div className='h-56 md:w-fit overflow-hidden drop-shadow-xl m-auto whitespace-nowrap rounded-md'>
            <div className={`flex flex-row ${images.length > 1 ? 'animate-slide' : ''}`}>
                {images.map((value, index) => {
                    return (
                        <img className='h-56 w-full mx-2 rounded-md m-auto hover:cursor-pointer' key={index} alt={`imgNO${index}`} src={value} onClick={() => openModal(value)} />
                    )
                })
                }
            </div>
        </div>
    )
}