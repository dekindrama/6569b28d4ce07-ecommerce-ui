import Image from "../Image";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import Button from "./Button";
import ItemInterface from "@/app/Interfaces/ItemInterface";
import CurrencyFormat from "@/app/helpers/CurrencyFormat";

const Card = ({
  item,
  onClickDetail,
}: {
  item: ItemInterface;
  onClickDetail: any;
}) => {
  function onClickDetailHandler() {
    onClickDetail(item.id);
  }
  return (
    <div className="overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:scale-105  ">
      <div>
        <Image
          src={item.picture}
          alt={item.name}
          className="h-72 w-full object-cover"
          defaultSrc="https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=2677&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="flex items-center justify-between p-5">
        {/* left content */}
        <div>
          <h2 className="font-bold capitalize">{item.name}</h2>
          <small
            className="flex cursor-pointer items-center gap-1"
            title="stock available"
          >
            <p>{item.stock}</p>
            <span>
              {item.status_stock ? (
                <HiOutlineCheck size={15} />
              ) : (
                <HiOutlineX size={15} />
              )}
            </span>
          </small>
          <small>
            <p>
              <span className="font-bold">
                {CurrencyFormat(Number(item.unit_price))}
              </span>
              /<span className="capitalize">{item.unit}</span>
            </p>
          </small>
        </div>
        {/* right content */}
        <div>
          <Button onClick={onClickDetailHandler}>Detail</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
