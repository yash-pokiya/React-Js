import { FaYoutube, FaSlack, FaSpotify } from "react-icons/fa";
import { SiPuma } from "react-icons/si";
const Clients = () => {
    return (
        <>
            <div className='h-75 w-full '>
                <h1 className='text-black text-4xl font-extralight pt-5 font-serif flex items-center justify-center'>My clients all over india</h1>
                {/* clients  */}
                <div className='h-50 flex gap-2 justify-between px-50 w-full'>
                    <div className='w-1/4 h-full flex justify-center items-center'>
                        <FaYoutube className='h-1/3 w-1/3 ' />
                        <h1 className="text-5xl font-bold font-sans">Youtube</h1>
                    </div>
                    <div className='w-1/4 h-full flex justify-center items-center'>
                        <FaSlack className='h-1/3 w-1/3 ' />
                        <h1 className="text-5xl font-bold font-sans">Slack</h1>
                    </div>
                    <div className='w-1/4 h-full flex justify-center items-center'>
                        <FaSpotify className='h-1/3 w-1/3 ' />
                        <h1 className="text-5xl font-bold font-sans">Spotify</h1>
                    </div>
                    <div className="w-1/4 h-full flex justify-center items-center relative">
                        <SiPuma className="absolute top-12 right-18 w-16 h-16" />
                        <h1 className="text-5xl font-bold font-sans">
                            Puma
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clients