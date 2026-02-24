import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
<nav className="sticky top-0 z-50 bg-white shadow">
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-bold text-blue-600">RoomMitra</h1>

        <div className="hidden md:flex gap-6 font-medium">
          <button>Hotel</button>
          <button>Room</button>
          <button>Room Partner</button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-lg">
            List Your Room
          </button>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-gray-100 px-4 py-3 space-y-3">
          <button className="block w-full text-left">Hotel</button>
          <button className="block w-full text-left">Room</button>
          <button className="block w-full text-left">Room Partner</button>
          <button className="block w-full text-left text-blue-600 font-semibold">
            List Your Room
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;