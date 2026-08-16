// Lightweight inline SVG icon set for venue amenities — no external icon
// library required (keeps the app dependency-free / pure JS+CSS).
// Add more entries to ICONS as new amenities are added to the DB seed.

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ICONS = {
  "Free WiFi": (
    <svg {...common}>
      <path d="M5 12.5a11 11 0 0 1 14 0" />
      <path d="M8.2 16a6.5 6.5 0 0 1 7.6 0" />
      <path d="M11.5 19.4a2 2 0 0 1 1 0" />
      <circle cx="12" cy="19.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  Parking: (
    <svg {...common}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9.5 16V7.5h3.2a2.6 2.6 0 0 1 0 5.2H9.5" />
    </svg>
  ),
  Elevator: (
    <svg {...common}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M10.5 10 12 8.2 13.5 10" />
      <path d="M10.5 15 12 16.8 13.5 15" />
    </svg>
  ),
  "Power Backup": (
    <svg {...common}>
      <path d="M13 2 4.5 14h6l-1 8L19.5 10h-6l0.5-8Z" />
    </svg>
  ),
  "Air Conditioning": (
    <svg {...common}>
      <path d="M12 2v20" />
      <path d="M4.5 6 12 9.5 19.5 6" />
      <path d="M4.5 18 12 14.5 19.5 18" />
      <path d="M2.5 12h19" />
    </svg>
  ),
  Catering: (
    <svg {...common}>
      <path d="M7 2v8a2.5 2.5 0 0 0 5 0V2" />
      <path d="M9.5 2v20" />
      <path d="M9.5 2v8" />
      <path d="M17 2c-1.7 0-3 2-3 6s1.3 6 3 6" />
      <path d="M17 2v20" />
    </svg>
  ),
  "DJ / Music System": (
    <svg {...common}>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </svg>
  ),
  Decoration: (
    <svg {...common}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "Swimming Pool": (
    <svg {...common}>
      <path d="M2 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M2 21c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0" />
      <path d="M7 13V5a2 2 0 0 1 4 0v3" />
      <path d="M13 13V8a2 2 0 0 1 4 0v5" />
    </svg>
  ),
  "Bridal Room": (
    <svg {...common}>
      <path d="M12 21s-7-4.4-9.5-8.8C.7 8.6 2.3 5 6 5c2 0 3.5 1.2 6 4 2.5-2.8 4-4 6-4 3.7 0 5.3 3.6 3.5 7.2C19 16.6 12 21 12 21Z" />
    </svg>
  ),
};

// sensible fallback for any amenity not explicitly mapped above
const DEFAULT_ICON = (
  <svg {...common}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.3 2.3L16 10" />
  </svg>
);

export default function AmenityIcon({ name, size = 18, className = "" }) {
  const icon = ICONS[name] || DEFAULT_ICON;
  return (
    <span
      className={`amenity-icon ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
}
