import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({
  isOpen,
  setIsOpen,
  children,
  className,
}: {
  children?: any;
  isOpen: boolean;
  setIsOpen: any;
  className?: string;
}) => {
  function onCloseModalHandler(event: any) {
    setIsOpen(false);
  }

  return (
    <div
      className={
        isOpen
          ? `fixed top-0 flex h-screen w-full justify-center bg-gray-500/60 py-20 transition-all ${className}`
          : `hidden ${className}`
      }
    >
      <div className="container relative h-fit rounded-2xl bg-white p-5">
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
