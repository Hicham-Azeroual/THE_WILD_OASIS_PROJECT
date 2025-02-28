import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "../../hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if(!cabins.length) {
    return <Empty resourceName="cabins"></Empty>
  }
  const filtredValue = searchParams.get("discount") || "all";

  // Filter cabins based on discount
  let filtredCabins;
  if (filtredValue === "all") {
    filtredCabins = cabins;
  } else if (filtredValue === "no_discount") {
    filtredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else {
    filtredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // Sort cabins
  const sortValue = searchParams.get("sortBy") || "name-asc"; // Match key with SortBy
  const [field, direction] = sortValue.split("-");
  const modefier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filtredCabins].sort((a, b) => {
    if (field === "name") {
      // String comparison for name
      return a[field].localeCompare(b[field]) * modefier;
    } else {
      // Numeric comparison for regularPrice, maxCapacity
      return (a[field] - b[field]) * modefier;
    }
  });

  return (
    <Menus>
      <Table columns="1fr 1.4fr 1.2fr 1.2fr 1.2fr 1.2fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;