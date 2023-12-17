import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
}: {
  children?: any;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  function onCloseModalHandler(event: any) {
    setIsOpen(false);
  }

  return (
    <div
      className={
        isOpen
          ? "fixed top-0 flex h-screen w-full justify-center bg-gray-500/60 py-20 transition-all"
          : "hidden"
      }
    >
      <div className="container relative rounded bg-white p-5">
        <div
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onCloseModalHandler}
        >
          <IoMdClose size={30} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
