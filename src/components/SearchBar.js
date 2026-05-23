"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="search"
        placeholder="Search movies..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
