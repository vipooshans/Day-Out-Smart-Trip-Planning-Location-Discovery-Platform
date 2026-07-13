import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const fetchTrips = async () => {
    try {
      const { data } = await api.get("/trips");
      setTrips(data);
    } catch (err) {
      setError("Could not load trips.");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post("/trips", { title });
      setTitle("");
      fetchTrips();
    } catch (err) {
      setError("Could not create trip.");
    }
  };

  return (
    <section>
      <h1>My Trips</h1>
      <form onSubmit={handleCreate} className="search-bar">
        <input
          type="text"
          placeholder="New trip title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="trip-list">
        {trips.map((trip) => (
          <li key={trip._id}>
            <strong>{trip.title}</strong> — {trip.stops?.length || 0} stops
          </li>
        ))}
      </ul>

      {trips.length === 0 && <p>No trips yet. Create your first one above.</p>}
    </section>
  );
};

export default Trips;
