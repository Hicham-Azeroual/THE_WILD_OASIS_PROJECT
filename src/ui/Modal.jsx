import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
// Styled Components (unchanged)
import React from "react";
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// Modal Context
const ModalContext = createContext();

// Main Modal Component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName; // This assigns the setOpenName function to open

  return (
     <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// Open Sub-Component
Modal.Open = function Open({ opens: opensWindowName, children }) {
  const { open } = useContext(ModalContext);
  return React.cloneElement(children, { onClick: () => open(opensWindowName) });
};

// Window Sub-Component
Modal.Window = function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);

  // Only render if this window's name matches the openName
  if (name !== openName) return null;

  return createPortal(
    <Overlay onClick={close}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onClose:close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

export default Modal;