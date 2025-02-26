import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import Row from "../../ui/Row";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useCabins } from "../../hooks/useCabins";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showFrom, setShowFrom] = useState(false);
  const { deleteCabin, isDeleting, mutateCabin, isMutating } = useCabins();

  const {
    id: cabinID,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function hancleDuplicate() {
    const { id, ...rest } = cabin;
    console.log(rest);

    mutateCabin({ ...rest, name: `${name} - Copy` });
  }

  return (
    <>
      <TableRow>
        <Img
          src={
            image
              ? image
              : "https://sfycdn.speedsize.com/d39afcfe-7170-49b2-9937-dbe608cdde58/https://www.heatholders.com/cdn/shop/articles/Heat_Holders_6.png?v=1698959559"
          }
          alt={name}
        />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity} people</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Row>
          <button disabled={isMutating} onClick={() => hancleDuplicate()} disabled={isMutating}>
            {/*           <HiSquare25tack></HiSquare25tack>*/}

            <HiSquare2Stack />
          </button>

          <button onClick={() => deleteCabin(cabinID)} disabled={isDeleting}>
            <HiTrash></HiTrash>
          </button>
          <button onClick={() => setShowFrom((prev) => !prev)}>
            <HiPencil></HiPencil>
          </button>
        </Row>
      </TableRow>
      {showFrom && <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>}
    </>
  );
}

export default CabinRow;
