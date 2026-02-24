import { useNavigate } from "react-router-dom";

function RoomCard({ room }) {

  // 🔹 Hook for programmatic navigation
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      {/* 🔹 Room Image Section */}
      <div className="h-48 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* 🔹 Room Info Section */}
      <div className="p-4 space-y-1">

        {/* 🔹 Room Title */}
        <h2 className="font-semibold text-lg">
          {room.title}
        </h2>

        {/* 🔹 Location */}
        <p className="text-gray-500 text-sm">
          {room.location}
        </p>

        {/* 🔹 Price */}
        <p className="text-blue-600 font-semibold">
          ₹{room.price}/month
        </p>

        {/* 🔹 Navigate to Room Detail Page */}
        <button
          onClick={() => navigate(`/room/${room.id}`)}
          className="mt-3 w-full border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default RoomCard;