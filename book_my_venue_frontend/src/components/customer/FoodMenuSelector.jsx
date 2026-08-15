import { useState, useEffect, useMemo } from "react";
import FoodItemGallery from "./FoodItemGallery";
import "./FoodMenuSelector.css";

export default function FoodMenuSelector({ groupedMenu, selectedIds, onToggle, guests }) {
  const [activeTab, setActiveTab] = useState(groupedMenu[0]?.key ?? null);
  const [dietFilter, setDietFilter] = useState("ALL"); // ALL | VEG | NON_VEG

  // groupedMenu loads asynchronously (after the API call resolves), so the
  // initial useState(groupedMenu[0]?.key) above often runs before there's
  // any data. Once groupedMenu arrives, make sure a valid tab is selected.
  useEffect(() => {
    if (groupedMenu.length > 0 && !groupedMenu.some((g) => g.key === activeTab)) {
      setActiveTab(groupedMenu[0].key);
    }
  }, [groupedMenu, activeTab]);

  const activeGroup = groupedMenu.find((g) => g.key === activeTab);

  const visibleItems = useMemo(() => {
    if (!activeGroup) return [];
    if (dietFilter === "ALL") return activeGroup.items;
    return activeGroup.items.filter((f) => f.food_type === dietFilter);
  }, [activeGroup, dietFilter]);

  const selectedCountInTab = activeGroup
    ? activeGroup.items.filter((f) => selectedIds.includes(f.food_id)).length
    : 0;

  if (groupedMenu.length === 0) {
    return <p className="fms-empty">No menu items available for this venue yet.</p>;
  }

  return (
    <div className="fms">
      <div className="fms-tabs">
        {groupedMenu.map((g) => {
          const count = g.items.filter((f) => selectedIds.includes(f.food_id)).length;
          return (
            <button
              key={g.key}
              type="button"
              className={`fms-tab ${activeTab === g.key ? "active" : ""}`}
              onClick={() => setActiveTab(g.key)}
            >
              {g.label}
              {count > 0 && <span className="fms-tab-badge">{count}</span>}
            </button>
          );
        })}
      </div>

      <div className="fms-toolbar">
        <span className="fms-count">
          {visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""}
          {selectedCountInTab > 0 && ` · ${selectedCountInTab} selected in this category`}
        </span>
        <div className="fms-diet-filter">
          <button type="button" className={dietFilter === "ALL" ? "active" : ""} onClick={() => setDietFilter("ALL")}>All</button>
          <button type="button" className={dietFilter === "VEG" ? "active" : ""} onClick={() => setDietFilter("VEG")}>
            <span className="veg-dot veg" /> Veg
          </button>
          <button type="button" className={dietFilter === "NON_VEG" ? "active" : ""} onClick={() => setDietFilter("NON_VEG")}>
            <span className="veg-dot nonveg" /> Non-Veg
          </button>
        </div>
      </div>

      {visibleItems.length === 0 ? (
        <p className="fms-empty">No items in this category for the selected filter.</p>
      ) : (
        <div className="fms-grid">
          {visibleItems.map((f) => {
            const isSelected = selectedIds.includes(f.food_id);
            return (
              <div key={f.food_id} className={`fms-card ${isSelected ? "selected" : ""}`}>
                <FoodItemGallery images={f.images} alt={f.food_name} />
                <div className="fms-card-body">
                  <div className="fms-card-title">
                    <span className={`veg-dot ${f.food_type === "VEG" ? "veg" : "nonveg"}`} />
                    {f.food_name}
                  </div>
                  <p className="fms-card-desc">{f.description}</p> 
                  <p className=".fms-card-price"> ₹{f.price}</p>
                  <div className="fms-card-footer">
                    <button
                      type="button"
                      className={`fms-select-btn ${isSelected ? "selected" : ""}`}
                      onClick={() => onToggle(f.food_id)}
                    >
                      {isSelected ? "✓ Added" : "+ Add"}
                    </button>
                  </div>
                  {isSelected && guests > 0 && (
                    <div className="fms-card-subtotal">
                      Subtotal for {guests} guests: ₹{(f.price * guests).toLocaleString("en-IN")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
