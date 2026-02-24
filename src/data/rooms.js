const rooms = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Luxury Room ${i + 1}`,
  price: 5000 + i * 250,
  location: i % 2 === 0 ? "Delhi" : "Noida",
  image: `https://source.unsplash.com/400x300/?bedroom&sig=${i}`,
  lat: 28.6 + i * 0.001,
  lng: 77.2 + i * 0.001,
}));

export default rooms;