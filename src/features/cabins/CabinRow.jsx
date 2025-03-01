import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import Row from "../../ui/Row";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useCabins } from "../../hooks/useCabins";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

import { getBooking } from "../../services/apiBookings";
/* const TableRow = styled.div`
  display: grid;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`; */

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
      <Table.Row>
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
          {/*           <button disabled={isMutating} onClick={() => hancleDuplicate()}>

            <HiSquare2Stack />
          </button> */}

          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinID}></Menus.Toggle>
              <Menus.List id={cabinID}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={hancleDuplicate}
                  disabled={isMutating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  {/*               <button onClick={() => setShowFrom((prev) => !prev)}>
                <HiPencil></HiPencil>
              </button> */}

                  <Menus.Button
                    icon={<HiPencil />}
                    onClick={() => setShowFrom((prev) => !prev)}
                  >
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delte</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin}></CreateCabinForm>
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                disabled={isDeleting}
                resourceName="cabins"
                onConfirm={() => deleteCabin(cabinID)}
              ></ConfirmDelete>
            </Modal.Window>
          </Modal>
        </Row>
      </Table.Row>
    </>
  );
}

export default CabinRow;
