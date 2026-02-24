import { useNavigate } from "react-router-dom";

function RoomCard({ room }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/room/${room.id}`)}
      className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition cursor-pointer overflow-hidden group"
    >

      {/* 🔹 Image Section */}
      <div className="h-52 overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      {/* 🔹 Content Section */}
      <div className="p-5">

        <h3 className="font-semibold text-lg text-gray-800">
          {room.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          📍 {room.location}
        </p>

        <p className="text-blue-600 font-semibold mt-2">
          ₹{room.price}/month
        </p>

        {/* 🔹 Small rating preview */}
        <div className="text-yellow-400 text-sm mt-2">
          ★★★★☆ <span className="text-gray-500 ml-1">{room.rating}</span>
        </div>

      </div>

    </div>
  );
}

export default RoomCard;