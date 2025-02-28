import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value); // Consistent key
    setSearchParams(searchParams);
  }

  const currentSort = searchParams.get("sortBy") || options[0].value; // Default to first option

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={currentSort}
    />
  );
}

export default SortBy;
