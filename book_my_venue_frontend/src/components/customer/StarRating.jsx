import "./StarRating.css";

export default function StarRating({ value = 0, onChange, size = 18, readOnly = false }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="star-rating" style={{ fontSize: size }}>
      {stars.map((s) => (
        <span
          key={s}
          className={`star ${s <= value ? "filled" : ""} ${readOnly ? "" : "interactive"}`}
          onClick={() => !readOnly && onChange && onChange(s)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
