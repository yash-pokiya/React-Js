import { Link } from "react-router-dom";

export const Card = ({ data }) => {
  return (
    <div
      className="mb-6 break-inside-avoid perspective"
      style={{ height: data.height }}
    >
      <div className="card-inner w-full h-full">

        {/* FRONT */}
        <div className="card-face overflow-hidden shadow-lg">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-lg font-semibold capitalize">
            {data.name}
          </div>
        </div>

        {/* BACK */}
        <div
          className="card-face card-back flex items-center justify-center text-center p-4"
          style={{ background: data.color, color: data.textColor }}
        >
          <div>
            <h3 className="text-xl font-bold capitalize">{data.name}</h3>
            <p className="mt-2 text-sm">
              Explore premium {data.name} collection
            </p>

            <Link to={`/shop/${data.name}`}>
              <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};