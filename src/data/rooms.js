// // 🔹 Fake room data (Later replace with backend API)

// /*
//   Using stable random image seed
//   So every room gets different image
//   But UI will not break
// */

// const getRandomImage = (seed) =>
//   `https://picsum.photos/seed/room${seed}/800/600`;

// const rooms = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,

//   /* ================= BASIC INFO ================= */

//   title: `Luxury Room ${i + 1}`,

//   price: 6000 + (i % 20) * 300,

//   location:
//     i % 3 === 0
//       ? "Delhi"
//       : i % 3 === 1
//       ? "Noida"
//       : "Gurgaon",

//   verified: i % 4 === 0,

//   /* ================= RATING ================= */

//   rating: 4.0 + (i % 5) * 0.1,

//   /* ================= AMENITIES ================= */

//   amenities: [
//     "WiFi",
//     "AC",
//     "Parking",
//     "Attached Bathroom",
//     ...(i % 2 === 0 ? ["Balcony"] : []),
//   ],

//   /* ================= IMAGES ================= */

//   images: [
//     getRandomImage(i + 1),
//     getRandomImage(i + 200),
//     getRandomImage(i + 400),
//   ],

//   /* ================= OWNER INFO ================= */

//   owner: {
//     name: `Owner ${i + 1}`,
//     phone: `98765${(10000 + i).toString().slice(-5)}`,
//     email: `owner${i + 1}@roommitra.com`,
//   },

//   /* ================= MAP COORDINATES ================= */

//   lat: 28.6139 + i * 0.002,
//   lng: 77.2090 + i * 0.002,
// }));

// export default rooms;

// 🔹 Fake room data with category support

const getRandomImage = (seed) =>
  `https://picsum.photos/seed/room${seed}/800/600`;

const categories = ["hotel", "room", "partner"];

const rooms = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,

  title: `Luxury Room ${i + 1}`,

  price: 5000 + (i % 20) * 300,

  location:
    i % 3 === 0
      ? "Delhi"
      : i % 3 === 1
      ? "Noida"
      : "Gurgaon",

  verified: i % 4 === 0,

  rating: 4 + (i % 5) * 0.1,

  /* 🔹 Add category for navbar filtering */
  category: categories[i % 3],

  amenities: ["WiFi", "AC", "Parking"],

  images: [
    getRandomImage(i + 1),
    getRandomImage(i + 100),
    getRandomImage(i + 200),
  ],

  owner: {
    name: `Owner ${i + 1}`,
    phone: `98765${(10000 + i).toString().slice(-5)}`,
  },

  lat: 28.6139 + i * 0.002,
  lng: 77.209 + i * 0.002,
}));

export default rooms;