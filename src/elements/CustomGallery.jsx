import {useState} from 'react'

export default function CustomGallery({images = [], openModal = () => {}}) {
    const [selectedImg, setSelectedImg] = useState(0)
    function nextSlide() {
        if (images.length - 1 > selectedImg){
            let activeSlide = document.querySelector('.slide.translate-x-0');
            activeSlide.classList.remove('translate-x-0');
            activeSlide.classList.add('-translate-x-full');

            setSelectedImg(cur => cur + 1)
            let nextSlide = activeSlide.nextElementSibling;
            nextSlide.classList.remove('translate-x-full');
            nextSlide.classList.add('translate-x-0');
        }
        else{
            setSelectedImg(images.length - 1)
        }
    }

    function previousSlide() {
        if(selectedImg > 0){
            let activeSlide = document.querySelector('.slide.translate-x-0');
            activeSlide.classList.remove('translate-x-0');
            activeSlide.classList.add('translate-x-full');

            setSelectedImg(cur => cur - 1)
            let previousSlide = activeSlide.previousElementSibling;
            previousSlide.classList.remove('-translate-x-full');
            previousSlide.classList.add('translate-x-0');
        }
        else {
            setSelectedImg(0)
        }
    }
    return(
        <div className="relative h-56 md:w-80 overflow-hidden drop-shadow-xl m-auto">
            {images.map((value, index) => {
                return(
                    <img className={`absolute inset-0 h-56 w-full transition-all ease-in-out duration-1000 transform ${selectedImg === index ? 'translate-x-0' : "translate-x-full"} slide m-auto hover:cursor-pointer`} key={index} alt={`imgNO${index}`} src={value} onClick={() => openModal(value)} />
                )
            })}
            {selectedImg < images.length - 1 && <div className="absolute right-0 w-16 h-full flex items-center hover:duration-500 hover:backdrop-blur-sm hover:bg-opacity-5 hover:bg-white justify-center text-black" onClick={() => nextSlide()}>&#x276F;</div>}
            {selectedImg > 0 && <div className="absolute left-0 w-16 h-full flex items-center justify-center hover:duration-500 hover:backdrop-blur-sm hover:bg-opacity-5 hover:bg-white text-black" onClick={() => previousSlide()}>&#x276E;</div>}
        </div>
    )
}