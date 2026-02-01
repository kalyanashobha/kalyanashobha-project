import { useState } from "react";
import { api } from "../api";

export default function Profile() {
  const [form, setForm] = useState({
    age: "",
    religion: "",
    caste: "",
    education: "",
    profession: "",
    location: "",
  });
  const [photos, setPhotos] = useState([]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(atob(token.split(".")[1]));

      const data = new FormData();
      data.append("userId", user.id);

      Object.keys(form).forEach((key) =>
        data.append(key, form[key])
      );

      for (let i = 0; i < photos.length; i++) {
        data.append("photos", photos[i]);
      }

      await api.post("/profile", data);
      alert("Profile saved successfully");
    } catch (err) {
      alert("Profile save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create / Update Profile</h2>

      <input name="age" placeholder="Age" onChange={handleChange} />
      <input name="religion" placeholder="Religion" onChange={handleChange} />
      <input name="caste" placeholder="Caste" onChange={handleChange} />
      <input name="education" placeholder="Education" onChange={handleChange} />
      <input name="profession" placeholder="Profession" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setPhotos(e.target.files)}
      />

      <button type="submit">Save Profile</button>
    </form>
  );
}
