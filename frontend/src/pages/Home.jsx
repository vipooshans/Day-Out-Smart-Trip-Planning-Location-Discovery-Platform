import { useEffect, useState } from "react";
import api from "../api/axios.js";
import PlaceCard from "../components/PlaceCard.jsx";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPlaces = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/places", { params: { search: query } });
      setPlaces(data);
    } catch (err) {
      setError("Could not load places. Is the API running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPlaces(search);
  };

  return (
    <section>
      <h1>Discover places for your next day out</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search places, cafes, parks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading places...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {places.map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>

      {!loading && !error && places.length === 0 && (
        <p>No places yet. Add some through the API to get started.</p>
      )}
    </section>
  );
};

export default Home;
