import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Admin() {
  const navigate = useNavigate();

  const emptyForm = {
    title: "",
    description: "",
    city: "",
    fullAddress: "",
    price: "",
    listingType: "owner",
    gender: "",
    occupation: "",
    latitude: "",
    longitude: "",
    images: [],
  };

  const [rooms, setRooms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  /* ================= FETCH ROOMS ================= */

  const fetchRooms = async () => {
    try {
      const res = await API.get("/rooms");
      setRooms(res.data.rooms || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  /* ================= INPUT HANDLER ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= AUTO LOCATION ================= */

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }

    setForm({ ...form, images: files });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.city || !form.price) {
      alert("Fill required fields");
      return;
    }

    if (!form.latitude || !form.longitude) {
      alert("Latitude and Longitude required");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("city", form.city);
    formData.append("fullAddress", form.fullAddress);
    formData.append("price", Number(form.price));
    formData.append("listingType", form.listingType);

    // 🔥 IMPORTANT — Send simple latitude & longitude
    formData.append("latitude", Number(form.latitude));
    formData.append("longitude", Number(form.longitude));

    if (form.listingType === "roommate") {
      formData.append("gender", form.gender);
      formData.append("occupation", form.occupation);
    }

    form.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      if (editingId) {
        await API.put(`/rooms/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/rooms/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchRooms();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    try {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (room) => {
    setEditingId(room._id);

    setForm({
      title: room.title || "",
      description: room.description || "",
      city: room.city || "",
      fullAddress: room.fullAddress || "",
      price: room.price || "",
      listingType: room.listingType || "owner",
      gender: room.roommatePreference?.gender || "",
      occupation: room.roommatePreference?.occupation || "",
      latitude: room.location?.coordinates?.[1] || "",
      longitude: room.location?.coordinates?.[0] || "",
      images: [],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 md:p-10">

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 font-medium"
          >
            ← Back
          </button>
          <h1 className="text-xl md:text-2xl font-bold">
            Admin Panel
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="text" name="title" placeholder="Room Title"
            value={form.title} onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <textarea name="description" placeholder="Description"
            value={form.description} onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <input type="text" name="city" placeholder="City"
            value={form.city} onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <input type="text" name="fullAddress" placeholder="Full Address"
            value={form.fullAddress} onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <input type="number" name="price" placeholder="Monthly Price"
            value={form.price} onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <select name="listingType"
            value={form.listingType}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl">
            <option value="owner">Owner</option>
            <option value="roommate">Roommate</option>
          </select>

          {form.listingType === "roommate" && (
            <>
              <input type="text" name="gender"
                placeholder="Preferred Gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl" />

              <input type="text" name="occupation"
                placeholder="Preferred Occupation"
                value={form.occupation}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl" />
            </>
          )}

          <input type="number" step="any" name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <input type="number" step="any" name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl" />

          <button
            type="button"
            onClick={getCurrentLocation}
            className="text-blue-600 text-sm font-medium"
          >
            📍 Use Current Location
          </button>

          <input type="file" multiple accept="image/*"
            onChange={handleImageUpload} />

          <button type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold">
            {editingId ? "Update Room" : "Submit Room"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Admin;