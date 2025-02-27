import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"

function CabinTableOperation() {
  return <TableOperations>
    <Filter filerField="discount"></Filter>
  </TableOperations>
}

export default CabinTableOperation
