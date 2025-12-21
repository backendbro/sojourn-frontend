"use client";

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  const cats = ["all", "travel", "culture", "lifestyle", "food"];

  return (
    <div className="filter-tabs">
      {cats.map((c) => (
        <button
          key={c}
          className={`filter-btn ${active === c ? "active" : ""}`}
          onClick={() => onChange(c)}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </button>
      ))}
    </div>
  );
}
