import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch } from "../redux/filtersSlice";

function Filters() {
  const dispatch = useDispatch();
  const { category, search } = useSelector((state) => state.filters);

  return (
    <div style={{ margin: "1rem 0" }}>
      <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
        <option value="All">All</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Misc">Misc</option>
      </select>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        style={{ marginLeft: "1rem" }}
      />
    </div>
  );
}

export default Filters;