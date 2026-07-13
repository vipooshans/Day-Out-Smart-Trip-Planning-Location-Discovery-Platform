const PlaceCard = ({ place }) => {
  return (
    <div className="card">
      <img
        className="card-img"
        src={place.images?.[0] || "https://via.placeholder.com/400x200?text=Day+Out"}
        alt={place.name}
      />
      <div className="card-body">
        <h3>{place.name}</h3>
        <span className="badge">{place.category}</span>
        <p>{place.description}</p>
        <div className="card-meta">
          <span>⭐ {place.rating}</span>
          <span>{"$".repeat(place.priceLevel || 0)}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
