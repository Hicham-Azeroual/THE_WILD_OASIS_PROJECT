/* import { useEffect } from "react";
 */ import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperation from "../features/cabins/CabinTableOperation";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
/* import { getCabins } from "../services/apiCabins";
 */
function Cabins() {
  /*   useEffect(() => {
    console.log("Cabins");
    getCabins().then((res) => console.log(res));
  },[]) */
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <CabinTableOperation></CabinTableOperation>
      </Row>
      <Row>
        <CabinTable></CabinTable>
      </Row>
      <Row>
        <AddCabin></AddCabin>
      </Row>
    </>
  );
}

export default Cabins;
