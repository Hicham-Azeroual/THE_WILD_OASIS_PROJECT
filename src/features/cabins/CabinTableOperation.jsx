import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const optionsFilters = [
  { value: "all", label: "All" },
  { value: "no_discount", label: "No discount" },
  { value: "with-discount", label: "With discount" },
];

const optionsSort = [
  { value: "name-asc", label: "Sort by Name Ascending" },
  { value: "name-desc", label: "Sort by Name Descending" },
  { value: "regularPrice-asc", label: "Sort by Price Ascending" },
  { value: "regularPrice-desc", label: "Sort by Price Descending" },
  { value: "maxCapacity-asc", label: "Sort by Capacity Ascending" },
  { value: "maxCapacity-desc", label: "Sort by Capacity Descending" },
];

function CabinTableOperation() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={optionsFilters} />
      <SortBy options={optionsSort} />
    </TableOperations>
  );
}

export default CabinTableOperation;