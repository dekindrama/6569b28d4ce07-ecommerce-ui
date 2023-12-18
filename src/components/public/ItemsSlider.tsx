import ItemInterface from "@/app/Interfaces/ItemInterface";
import Image from "../Image";
import { useEffect, useRef, useState } from "react";
import CurrencyFormat from "@/app/helpers/CurrencyFormat";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ItemsSlider = ({ items }: { items: Array<ItemInterface> }) => {
  {
    const [item, setItem] = useState(items[0] ?? null);
    const [itemIndex, setItemIndex] = useState(0);
    // const lastIndex = useRef(items.length - 1);
    let lastIndex = items.length - 1;

    //* set current item changes
    useEffect(() => {
      setItem(items[itemIndex]);
    }, [items, itemIndex]);

    //* set last index when there is changes on items
    useEffect(() => {
      lastIndex = items.length - 1;
    }, [items]);

    const nextIndex = () => {
      if (itemIndex == lastIndex) {
        setItemIndex(0);
        return;
      }
      setItemIndex((itemIndex) => itemIndex + 1);
      return;
    };

    const previousIndex = () => {
      if (itemIndex == 0) {
        setItemIndex(lastIndex);
        return;
      }
      setItemIndex((itemIndex) => itemIndex - 1);
      return;
    };

    let itemsComponent = <></>;
    if (item) {
      itemsComponent = (
        <div
          key={item.id}
          className="group relative h-72 w-full overflow-hidden rounded-2xl bg-blue-100"
        >
          {/* image */}
          <div>
            <Image
              src={item.picture}
              alt={item.name}
              defaultSrc="https://images.unsplash.com/photo-1634693798046-b00e706c3076?q=80&w=3732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full object-cover object-center"
            />
          </div>
          {/* overlay */}
          <div className=" absolute top-0 h-full w-full">
            <div className="absolute bottom-5 left-5 flex max-w-[20rem] flex-col gap-3 rounded-2xl bg-white/50 p-2 text-black/50 transition-all group-hover:bg-white group-hover:text-black">
              <h3 className="truncate text-xl font-bold">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus explicabo dolor ab obcaecati voluptatum rem minus
                placeat molestiae modi maiores excepturi animi earum ex expedita
                beatae consequatur, deleniti impedit error in, perspiciatis quia
                eaque rerum delectus. Temporibus, eaque necessitatibus? Nulla
                ullam error, similique consequatur excepturi natus est
                recusandae quidem iste.
              </h3>
              <p>{CurrencyFormat(15000)}</p>
              <p className="w-fit rounded-full border border-purple-500 p-1 text-xs text-purple-500">
                stock available
              </p>
            </div>
          </div>

          {/* next button */}
          <div
            onClick={() => {
              previousIndex();
            }}
            className="absolute left-10 top-1/2 hidden -translate-y-1/2 cursor-pointer transition-all group-hover:block"
          >
            <IoIosArrowBack size={30} className="rounded-full bg-white p-1" />
          </div>
          <div
            onClick={() => {
              nextIndex();
            }}
            className="absolute right-10 top-1/2 hidden -translate-y-1/2 cursor-pointer transition-all group-hover:block"
          >
            <IoIosArrowForward
              size={30}
              className="rounded-full bg-white p-1"
            />
          </div>
        </div>
      );
    }

    //* render components
    return itemsComponent;
  }
};

export default ItemsSlider;
