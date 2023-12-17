"use client";

import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import BaseTemplate from "@/components/BaseTemplate";
import Link from "@/components/Link";
import NextLink from "next/link";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { asyncGetListItems } from "@/states/items/action";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import routes from "@/routes/page";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { asyncDeleteItem, asyncGetItem } from "@/states/item/action";
import Image from "@/components/Image";

const ItemsPage = () => {
  //* params
  const router = useRouter();
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);
  const items = useSelector((states: any) => states.items);
  const item = useSelector((states: any) => states.item);
  const [isOpenModal, setIsOpenModal] = useState(false);

  console.log("=============================");
  console.log("hit items page");
  console.log("authUser", authUser);
  console.log("preload", isPreload);

  //* do preload action
  useEffect(() => {
    //* do action preload when preload is false
    if (isPreload) {
      dispatch(asyncPreloadProcess());
    }
  }, [isPreload]);

  //* get list item
  useEffect(() => {
    dispatch(asyncGetListItems());
  }, []);

  //* return nothing when still preload
  if (isPreload) return;

  //* get details item
  function onClickDetailHandler(id: string) {
    dispatch(asyncGetItem(id));
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  }

  function onClickDeleteHandler(id: string) {
    dispatch(asyncDeleteItem(id));
  }

  //* close modal
  function onClickCloseModalHandler(isOpen: boolean) {
    setIsOpenModal(isOpen);
    document.body.style.overflow = "scroll";
  }

  //*

  //* items component
  let itemsComponent = (
    <tr>
      <td
        colSpan={4}
        className="border-collapse border border-black p-5 text-center"
      >
        items is empty
      </td>
    </tr>
  );
  if (items.length > 0) {
    itemsComponent = items.map(
      (item: {
        id: string;
        name: string;
        stock: number;
        status_stock: boolean;
        unit_price: string;
      }) => {
        return (
          <tr key={item.id}>
            <td className="border-collapse border border-black p-5">
              {item.id}
            </td>
            <td className="border-collapse border border-black p-5">
              {item.name}
            </td>
            <td className="border-collapse border border-black p-5">
              <div className="flex justify-center gap-5">
                {item.stock}
                {item.status_stock == true ? (
                  <HiOutlineCheck size={25} />
                ) : (
                  <HiOutlineX size={25} />
                )}
              </div>
            </td>
            <td className="border-collapse border border-black p-5">
              {item.unit_price}
            </td>
            <td className="border-collapse border border-black p-5">
              <div className="flex gap-5">
                <Button
                  onClick={() => {
                    onClickDetailHandler(item.id);
                  }}
                >
                  detail
                </Button>
                <Link href={routes.dashboard.items.update(item.id)}>
                  Update
                </Link>
                <Button
                  onClick={() => {
                    onClickDeleteHandler(item.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        );
      },
    );
  }

  //* render page
  return (
    <BaseTemplate>
      <div className="flex flex-col gap-5 py-10 md:py-20">
        <h1>ItemPage</h1>
        <div>
          <Link href={routes.dashboard.items.create}>Add Items</Link>
        </div>
        <div className="w-96 self-center overflow-scroll md:w-1/2">
          <table className="w-full">
            <thead>
              <tr className="capitalize">
                <th className="border-collapse border border-black p-5">id</th>
                <th className="border-collapse border border-black p-5">
                  name
                </th>
                <th className="border-collapse border border-black p-5">
                  stock
                </th>
                <th className="border-collapse border border-black p-5">
                  unit price
                </th>
                <th className="border-collapse border border-black p-5">
                  action
                </th>
              </tr>
            </thead>
            <tbody>{itemsComponent}</tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isOpenModal} setIsOpen={onClickCloseModalHandler}>
        {item && (
          <>
            <div className="py-5">
              <h1 className="text-4xl">Detail Item</h1>
            </div>
            <hr />
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-bold capitalize">id</p>
                <p>{item.id}</p>
              </div>
              <div>
                <p className="font-bold capitalize">name</p>
                <p>{item.name}</p>
              </div>
              <div>
                <p className="font-bold capitalize">picture</p>
                <Image
                  src={item.picture}
                  alt={item.name}
                  className="h-52 rounded"
                />
              </div>
              <div>
                <p className="font-bold capitalize">stock</p>
                <div className="flex gap-5">
                  {item.stock}
                  {item.status_stock == true ? (
                    <HiOutlineCheck size={25} />
                  ) : (
                    <HiOutlineX size={25} />
                  )}
                </div>
              </div>
              <div>
                <p className="font-bold capitalize">unit</p>
                <p>{item.unit}</p>
              </div>
              <div>
                <p className="font-bold capitalize">unit price</p>
                <p>{item.unit_price}</p>
              </div>
            </div>
          </>
        )}
      </Modal>
    </BaseTemplate>
  );
};

export default ItemsPage;
