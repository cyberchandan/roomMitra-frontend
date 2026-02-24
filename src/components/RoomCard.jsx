function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
      
      <div className="h-48 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4 space-y-1">
        <h2 className="font-semibold text-lg">{room.title}</h2>
        <p className="text-gray-500 text-sm">{room.location}</p>
        <p className="text-blue-600 font-semibold">
          ₹{room.price}/month
        </p>

        <button className="mt-3 w-full border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-600 hover:text-white transition">
          View Details
        </button>
      </div>

    </div>
  );
}

export default RoomCard;