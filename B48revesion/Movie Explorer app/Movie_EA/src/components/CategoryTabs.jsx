import { CATEGORIES } from "../utils/constants";

export default function CategoryTabs({ category, setCategory }) {
  return (
    <div className="flex gap-3 flex-wrap mb-4">
      {CATEGORIES.map((c) => (
        <button
          key={c.key}
          onClick={() => setCategory(c.key)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            category === c.key ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
