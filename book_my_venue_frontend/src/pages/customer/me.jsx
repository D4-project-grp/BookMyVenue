<section className="vd-section">
<div className="vd-section-head">
  <h2>Food Menu</h2>
  <button className="btn-primary" onClick={handleBookNow}>Select Items &amp; Book</button>
</div>
{db.getFoodItemsGroupedByMenuType(venue.venue_id).map((group) => (
  group.items.length > 0 && (
    <div key={group.key} className="menu-preview-group">
      <h4>{group.label}</h4>
      <div className="food-grid">
        {group.items.slice(0, 4).map((f) => (
          <div key={f.food_id} className="food-item">
            <img src={f.images[0]} alt={f.food_name} />
            <div>
              <div className="food-name">
                <span className={`veg-dot ${f.food_type === "VEG" ? "veg" : "nonveg"}`} />
                {f.food_name}
              </div>
              <div className="food-type">{f.food_type === "VEG" ? "Veg" : "Non-Veg"}</div>
            </div>
            {/* <div className="food-price">₹{f.price}</div> */}
          </div>
        ))}
      </div>
    </div>
  )
))}
</section>