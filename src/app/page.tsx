"use client";

import BaseTemplatePublic from "@/components/BaseTemplatePublic";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncGetListItems } from "@/states/items/action";
import Card from "@/components/public/Card";
import ItemInterface from "./Interfaces/ItemInterface";
import ItemsSlider from "@/components/public/ItemsSlider";

export default function HomePage() {
  //* params
  const dispatch: any = useDispatch();
  const items = useSelector((states: any) => states.items);
  const filteredItems = useSelector((states: any) => states.filteredItems);
  const isFilterItems = useSelector((states: any) => states.isFilterItems);

  //* load items
  useEffect(() => {
    dispatch(asyncGetListItems());
  }, []);

  //* render cards component
  let itemsComponents = <></>;
  if (isFilterItems) {
    itemsComponents = filteredItems.map((item: ItemInterface) => (
      <Card
        key={item.id}
        item={item}
        onClickDetail={() => console.log("hit")}
      />
    ));
  } else {
    itemsComponents = items.map((item: ItemInterface) => (
      <Card
        key={item.id}
        item={item}
        onClickDetail={() => console.log("hit")}
      />
    ));
  }

  //* render page
  return (
    <BaseTemplatePublic>
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="font-bold capitalize">Popular Products</h2>
        </div>
        <ItemsSlider items={items} />

        <div>
          <h2 className="font-bold capitalize">Products</h2>
          <small className="font-bold">
            there is <span className="text-purple-600">5</span> available
            product
          </small>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* card */}
          {itemsComponents}
        </div>
      </div>
    </BaseTemplatePublic>
  );
}
