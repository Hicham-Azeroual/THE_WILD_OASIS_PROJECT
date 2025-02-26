import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
/* function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenModal((isOpenModal) => !isOpenModal)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm onClose={() => setIsOpenModal(false)}></CreateCabinForm>
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
 */


function AddCabin() {
  return <Modal>
       <Modal.Open opens ='cabin-form'>
        <Button>Add new Cabin</Button>
       </Modal.Open>
       <Modal.Window name='cabin-form'> 
         <CreateCabinForm></CreateCabinForm>
       </Modal.Window>
  </Modal>
}
export default AddCabin
