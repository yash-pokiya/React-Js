import { RiDoubleQuotesL } from "react-icons/ri";
import { TbArrowNarrowRightDashed , TbArrowNarrowLeftDashed  } from "react-icons/tb";

const FeedBack = () => {
    return (
        <>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold text-5xl text-start mt-15'>My Client Feedback</h1>
                <p className='text-gray-800 text-[18px] text-wrap w-1/2 text-center mx-auto mt-9'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolore accusamus exercitationem nulla culpa nesciunt excepturi, illo quibusdam, autem earum, ipsam dolorum fugiat in beatae mollitia! Quas quo dicta, explicabo tempore molestiae </p>
                <RiDoubleQuotesL className="h-15 w-15 mt-18 text-neutral-400"/>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className="text-xl text-center w-1/2 text-wrap mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, recusandae illum. Aspernatur, perferendis minus! Temporibus dolores recusandae iste itaque nostrum earum autem! Similique unde corrupti quibusdam numquam quos.</p>
                    <div className="w-full h-full flex justify-between px-80 items-center ">
                        <button className="bg-white text-black p-2 border-gray-400 shadow-[0_5px_10px_rgba(0,0,0,0.25)] rounded-xs cursor-pointer"> <TbArrowNarrowLeftDashed className="h-8 w-8"/></button>
                        <button className="bg-white text-black p-2 border-gray-400 shadow-[0_5px_10px_rgba(0,0,0,0.25)] rounded-xs cursor-pointer"> <TbArrowNarrowRightDashed className="h-8 w-8"/></button>
                    </div>
                    <div className="w-full h-full flex flex-col justify-center items-center mt-10 mb-40">
                        <h1 className="text-3xl font-bold font-serif">Yash Pokiya</h1>
                        <p className="text-lg">ceo & founder of company</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedBack