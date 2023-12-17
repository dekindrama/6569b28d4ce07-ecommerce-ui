"use client";

import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import BaseTemplate from "@/components/BaseTemplate";
import Link from "@/components/Link";
import { asyncPreloadProcess } from "@/states/isPreload/action";
import { asyncGetListItems } from "@/states/items/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import routes from "@/routes/page";

const ItemsPage = () => {
  //* params
  const router = useRouter();
  const dispatch: any = useDispatch();
  const authUser = useSelector((states: any) => states.authUser);
  const isPreload = useSelector((states: any) => states.isPreload);
  const items = useSelector((states: any) => states.items);

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
            <td className="hidden border-collapse border border-black p-5 md:block">
              {item.unit_price}
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
                <th className="hidden border-collapse border border-black p-5 md:block">
                  unit price
                </th>
              </tr>
            </thead>
            <tbody>{itemsComponent}</tbody>
          </table>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default ItemsPage;
