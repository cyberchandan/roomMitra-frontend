import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import rooms from "../data/rooms";

function RoomDetail() {

  // 🔹 Get room id from URL
  const { id } = useParams();

  // 🔹 Find selected room
  const room = rooms.find((r) => r.id === Number(id));

  // 🔹 Slider image state
  const [currentImage, setCurrentImage] = useState(0);

  // 🔹 Fake login state (replace later with real auth)
  const [isLoggedIn] = useState(false);

  if (!room) return <div>Room not found</div>;

  // 🔹 Handle next image
  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  // 🔹 Handle previous image
  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  // 🔹 Nearby rooms (excluding current)
  const nearbyRooms = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* ================= IMAGE SLIDER ================= */}

          <div className="relative">

            <img
              src={room.images[currentImage]}
              alt="Room"
              className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
            />

            {/* 🔹 Left Arrow */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full shadow hover:scale-110 transition"
            >
              ⬅
            </button>

            {/* 🔹 Right Arrow */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full shadow hover:scale-110 transition"
            >
              ➡
            </button>

            {/* 🔹 Verified Badge */}
            {room.verified && (
              <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ✔ Verified
              </div>
            )}
          </div>

          {/* ================= BASIC INFO ================= */}

          <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">

            <h1 className="text-3xl font-bold text-gray-800">
              {room.title}
            </h1>

            <p className="text-gray-500 mt-2">
              📍 {room.location}
            </p>

            <p className="text-2xl font-semibold text-blue-600 mt-4">
              ₹{room.price} / month
            </p>

            {/* 🔹 Rating Stars */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-gray-600 text-sm">
                {room.rating} / 5
              </span>
            </div>

          </div>

          {/* ================= AMENITIES ================= */}

          <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">

            <h2 className="text-xl font-semibold mb-6">
              🧰 Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-4 rounded-xl text-center font-medium"
                >
                  {item}
                </div>
              ))}

            </div>
          </div>

          {/* ================= OWNER SECTION ================= */}

          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">

            <h2 className="text-xl font-semibold mb-4">
              👤 Owner Information
            </h2>

            {isLoggedIn ? (
              <>
                <p><strong>Name:</strong> {room.owner.name}</p>
                <p><strong>Phone:</strong> {room.owner.phone}</p>
                <p><strong>Email:</strong> {room.owner.email}</p>
              </>
            ) : (
              <>
                <p>Login to unlock owner contact details.</p>
                <button className="mt-4 bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
                  🔒 Login to Unlock
                </button>
              </>
            )}
          </div>

          {/* ================= MAP ================= */}

          <div className="mt-10 bg-white rounded-3xl p-6 shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
              📍 Location Preview
            </h2>

            <iframe
              title="map"
              className="w-full h-80 rounded-2xl"
              src={`https://maps.google.com/maps?q=${room.lat},${room.lng}&z=15&output=embed`}
            />
          </div>

          {/* ================= NEARBY ROOMS ================= */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
              🏠 Nearby Rooms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {nearbyRooms.map((nearRoom) => (
                <div
                  key={nearRoom.id}
                  className="bg-white rounded-2xl shadow p-4"
                >
                  <img
                    src={nearRoom.images[0]}
                    alt=""
                    className="h-40 w-full object-cover rounded-xl"
                  />
                  <h3 className="mt-3 font-semibold">
                    {nearRoom.title}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    ₹{nearRoom.price}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* ================= CHAT BUTTON ================= */}

      <button className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition">
        💬 Live Chat
      </button>

    </>
  );
}

export default RoomDetail;