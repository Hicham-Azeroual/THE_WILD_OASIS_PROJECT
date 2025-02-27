import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "../../hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";



function CabinTable() {
  const { isLoading, cabins, error } = useCabins();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner></Spinner>;

  const filtredValue = searchParams.get("discount") || "all";
  console.log(filtredValue);

  // now it will be filltred the cabinid using the filtredvalue
  let filtredCabins;
  if (filtredValue === "all") {
    filtredCabins = cabins;
  } else if (filtredValue === "no_discount") {
    filtredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else {
    filtredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>hhhh</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>hhhhh</div>
        </Table.Header>

        <Table.Body
          data={filtredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}></CabinRow>}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
