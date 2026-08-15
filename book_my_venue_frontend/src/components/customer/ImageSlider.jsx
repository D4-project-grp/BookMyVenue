import { useState } from "react";
import "./ImageSlider.css";

export default function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="slider">
      <div className="slider-main">
        <img src={images[index]} alt={`Venue view ${index + 1}`} />
        {images.length > 1 && (
          <>
            <button className="slider-arrow left" onClick={prev} aria-label="Previous image">‹</button>
            <button className="slider-arrow right" onClick={next} aria-label="Next image">›</button>
          </>
        )}
        <div className="slider-count">{index + 1} / {images.length}</div>
      </div>
      {images.length > 1 && (
        <div className="slider-thumbs">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
              alt={`thumbnail ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
