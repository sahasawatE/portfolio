import react from 'react';
import { CircularProgress } from '@mui/material'
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import "./myComponent.css";
import { langContext } from '../langContext';
import reactIcon from '../img/logo512.png'
import nodeJSIcon from '../img/kisspng-node-js-javascript-web-application-express-js-comp-5ae0f84e5e7537.0464945815246930703869.png'
import socketIOIcon from '../img/kisspng-socket-io-websocket-node-js-javascript-library-5af655a0b6e393.8323079215260932167491.png'

const srcList = [
    reactIcon, 
    socketIOIcon, 
    nodeJSIcon, 
    "https://img.icons8.com/color/144/000000/html-5--v1.png",
    "https://img.icons8.com/officel/160/000000/php-logo.png",
    "https://img.icons8.com/color/144/000000/mysql-logo.png",
    "https://img.icons8.com/color/144/000000/figma--v1.png",
    "https://img.icons8.com/color/144/000000/css3.png",
    "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/000000/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png"
]

const altList = ["react", "scoketIO", "nodejs", "html5", "php", "mysql", "mysql", "css", "postman"]

const titleList = ["React", "Socket.IO", "NodeJS", "HTML5", "PHP", "MySql", "Figma", "CSS", "Postman"]

export default function MobileSkills() {
    const [pageImgList, setPageImgList] = react.useState([{src: null, alt: "", title: ""}])
    const { lang } = react.useContext(langContext);

    react.useEffect(() => {
        const temp = []
        srcList.forEach((value, index) => {
            temp.push({ src: value, alt: altList[index], title: titleList[index] })
        })
        setPageImgList(temp)
    },[])

    const options = {
        size: 180,
        minSize: 35,
        gutter: 26,
        provideProps: true,
        numCols: 3,
        fringeWidth: 160,
        yRadius: 130,
        xRadius: 130,
        cornerRadius: 86,
        showGuides: false,
        compact: true,
        gravitation: 5
    }
    return (
        <div className='h-auto pb-8'>
            <p className='p-8 text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-500'>{lang === 0 ? 'SKILLS' : 'ความสามารถ'}</p>
            <br />
            <div className='w-12/12 h-88'>
                <BubbleUI options={options} className="myBubbleUI">
                    {pageImgList.map((value,index) => (
                        <div key={`skills-${index}`} className='child'>
                            <div className='top-0 flex justify-center'>{value.src ? <img src={value.src} alt={value.alt} /> : <CircularProgress color='inherit'/>}</div>
                            <div className='bottom-0 flex justify-center'>{value.title}</div>
                        </div>
                    ))}
                </BubbleUI>
            </div>
        </div>
    );
}