import { useState } from "react";
import "./FoodItemGallery.css";

export default function FoodItemGallery({ images, alt }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const change = (e, dir) => {
    e.stopPropagation();
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="food-gallery">
      <img src={images[index]} alt={alt} />
      {images.length > 1 && (
        <>
          <button className="fg-arrow left" onClick={(e) => change(e, -1)} aria-label="Previous photo">‹</button>
          <button className="fg-arrow right" onClick={(e) => change(e, 1)} aria-label="Next photo">›</button>
          <div className="fg-dots">
            {images.map((_, i) => (
              <span key={i} className={i === index ? "active" : ""} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
