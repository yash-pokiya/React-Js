import {MoveUpRight} from "lucide-react"
const Card = (data) => {
    console.log(data)
  return (
<>
  <div className="card m-10 shadow-2xl w-full h-full max-w-sm bg-green-950 rounded-4xl p-4 text-white flex flex-col">
    <div className="bg-green-800 pb-3 text-center rounded-b-[12%] rounded-[10%] overflow-hidden">
      <img
        src={data.data.image}
        alt={`${data.data.name} image`}
        className="w-full aspect-square object-cover rounded-[10%]"
      />
      <div className="py-1 mt-1">{data.data.delivery}</div>
    </div>
    
    {/* Added gap-2 and items-stretch to align columns */}
    <div className="content px-2 sm:px-4 flex justify-between items-stretch py-4 flex-1 gap-2">
      
      {/* flex-1 min-w-0 ensures the title area doesn't push the price off screen */}
      <div className="details flex flex-col flex-1 min-w-0 pr-2">
        {/* min-h-[4rem] ensures consistent height for 1 or 2 lines of text */}
        <h2 className="text-green-50 text-2xl sm:text-3xl font-bold leading-tight min-h-16 flex items-center">
          {data.data.name}
        </h2>
        
        {/* flex-wrap ensures long ingredients don't squish */}
        <div className="more pt-2 flex flex-wrap gap-2 mt-auto">
          <span className="text-sm bg-green-400/20 text-green-50 rounded-full px-3 py-1">{data.data.ingredients[0]}</span>
          <span className="text-sm bg-green-400/20 text-green-50 rounded-full px-3 py-1">{data.data.ingredients[1]}</span>
          <span className="text-sm bg-green-400/20 text-green-50 rounded-full px-3 py-1">{data.data.ingredients[2]}</span>
        </div>
      </div>

      {/* shrink-0 prevents the price column from getting squished */}
      <div className="price shrink-0 border-l-2 border-green-400/20 pl-4 flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl font-bold">${data.data.price}</h2>
        {/* whitespace-nowrap prevents "Order Now" from stacking */}
        <p className="flex text-[14px] items-center mt-1.5 whitespace-nowrap">
          Order Now <span><MoveUpRight className="w-3.5 h-3.5 ms-1 stroke-3" /></span>
        </p>
      </div>
      
    </div>
  </div>
</>
  );
};

export default Card;