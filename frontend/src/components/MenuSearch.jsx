
import { Search, SlidersHorizontal } from "lucide-react";

export default function MenuSearch({
  search,
  setSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 md:flex-row">
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 focus-within:border-orange-400">
        <Search size={20} className="text-gray-400" />

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food, coffee or desserts..."
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
        <SlidersHorizontal size={18} className="text-orange-500" />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-transparent text-sm outline-none"
        >
          <option value="featured">Featured</option>
          <option value="rating">Top Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </label>
    </div>
  );
}
