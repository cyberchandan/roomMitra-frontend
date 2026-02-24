// 🔹 Fake room data (Later this will come from backend API)

const rooms = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,

  // 🔹 Basic Info
  title: `Luxury Room ${i + 1}`,
  price: 6000 + i * 500,
  location: i % 2 === 0 ? "Delhi" : "Noida",
  verified: i % 2 === 0, // 🔹 Verified badge toggle

  // 🔹 Room rating (1–5)
rating: 4.3,

// 🔹 Amenities list (later dynamic from backend)
amenities: ["WiFi", "AC", "Parking", "Attached Bathroom"],

  // 🔹 Multiple images for slider
  images: [
    `https://source.unsplash.com/800x600/?bedroom&sig=${i + 1}`,
    `https://source.unsplash.com/800x600/?apartment&sig=${i + 20}`,
    `https://source.unsplash.com/800x600/?interior&sig=${i + 40}`,
  ],

  // 🔹 Multiple demo images for better visual feel
images: [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
],

  // 🔹 Owner Info
  owner: {
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@email.com",
  },

  // 🔹 Map Coordinates (Future Google Map integration)
  lat: 28.6139 + i * 0.01,
  lng: 77.2090 + i * 0.01,
}));

export default rooms;