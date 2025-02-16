/* import { useEffect } from "react";
 */ import CabinTable from "../features/cabins/CabinTable";
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
      {" "}
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/sort</p>
      </Row>
      <Row>
        <CabinTable></CabinTable>
      </Row>
    </>
  );
}

export default Cabins;
