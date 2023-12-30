import { useEffect } from "react";
import Modal from "../Modal";
import useInput from "@/hooks/useInput";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import ItemInterface from "@/app/Interfaces/ItemInterface";
import {
  setFilteredItemsActionCreator,
  unsetFilteredItemsActionCreator,
} from "@/states/filteredItems/action";
import {
  setIsFilterItemsActionCreator,
  unsetIsFilterItemsActionCreator,
} from "@/states/isFilterItems/action";

const SearchBar = ({
  isShow,
  setIsShow,
}: {
  isShow: boolean;
  setIsShow: any;
}) => {
  //* params
  const dispatch: any = useDispatch();
  const [keyword, setKeyword] = useInput("");
  const [minPrice, setMinPrice, resetMinPrice] = useInput(0);
  const [maxPrice, setMaxPrice, resetMaxPrice] = useInput(0);
  const [stockStatus, setStockStatus] = useInput("");
  const items = useSelector((states: any) => states.items);
  let itemPrices = items.map((item: ItemInterface) => item.unit_price);
  let minPriceItem = 0;
  let maxPriceItem = 0;
  //* only update when itemPrices array is not empty
  if (itemPrices.length > 0) {
    minPriceItem = Math.min(...itemPrices);
    maxPriceItem = Math.max(...itemPrices);
  }

  //* set min/max price item
  useEffect(() => {
    //* only update when itemPrices array is not empty
    if (itemPrices.length > 0) {
      minPriceItem = Math.min(...itemPrices);
      maxPriceItem = Math.max(...itemPrices);
    }

    //* update minprice max price value
    resetMinPrice(minPriceItem);
    resetMaxPrice(maxPriceItem);
  }, [items]);

  //* handler filter
  function onFilterHandler() {
    console.log(stockStatus);
    //* get original items
    let newItems = items;

    //* unset filtered items
    dispatch(unsetFilteredItemsActionCreator());

    //* check if keyword is exist
    if (keyword !== "") {
      newItems = newItems.filter((item: ItemInterface) => {
        if (item.name.toLowerCase() == keyword.toLowerCase()) {
          return item;
        }
      });
    }

    //* check min max price is exist
    if (minPrice !== 0 && maxPrice !== 0) {
      newItems = newItems.filter((item: ItemInterface) => {
        if (item.unit_price >= minPrice && item.unit_price <= maxPrice) {
          return item;
        }
      });
    }

    //* check stock status is exist
    if (stockStatus.length > 0) {
      newItems = newItems.filter((item: ItemInterface) => {
        if (stockStatus.includes(item.status_stock.toString())) {
          return item;
        }
      });
    }

    //* set filtered items
    dispatch(setFilteredItemsActionCreator(newItems));

    //* set is filter items
    dispatch(setIsFilterItemsActionCreator(true));
  }

  //* handler reset
  function onResetHandler() {
    //* unset filtered items
    dispatch(unsetFilteredItemsActionCreator());

    //* unset is filter items
    dispatch(unsetIsFilterItemsActionCreator());

    //* reset value states
    console.log(minPriceItem, maxPriceItem);
    setKeyword("");
    resetMinPrice(minPriceItem);
    resetMaxPrice(maxPriceItem);
    setStockStatus([]);
  }

  //* trigger filter when hit key enter
  function onKeyUpHandler(e: any) {
    if (e.keyCode === 13) {
      console.log("hit");
      e.preventDefault();
      onFilterHandler();
    }
  }

  return (
    <Modal
      isOpen={isShow}
      setIsOpen={setIsShow}
      className="z-10 overflow-hidden"
    >
      <div className="flex h-full flex-col gap-10 p-5">
        <h2 className="text-center text-xl font-bold capitalize">filter</h2>
        <hr className="bg-black" />
        <div className="flex flex-col gap-5 ">
          <h3 className="text-3xl capitalize">search keyword</h3>
          <div>
            <input
              type="text"
              name="keyword"
              placeholder="keyword"
              className="w-full rounded-xl border border-purple-500 p-5"
              value={keyword}
              onChange={setKeyword}
              onKeyUp={onKeyUpHandler}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl capitalize">price range</h3>
          <div className="flex flex-row gap-5">
            <input
              type="number"
              name="min_price"
              placeholder="min price"
              className="w-full rounded-xl border border-purple-500 p-5"
              min={minPriceItem}
              max={maxPriceItem}
              value={minPrice}
              onChange={setMinPrice}
              onKeyUp={onKeyUpHandler}
            />
            <input
              type="number"
              name="max_price"
              placeholder="max price"
              className="w-full rounded-xl border border-purple-500 p-5"
              min={minPrice}
              max={maxPriceItem}
              value={maxPrice}
              onChange={setMaxPrice}
              onKeyUp={onKeyUpHandler}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-3xl capitalize">stock status</h3>
          <div className="flex flex-row gap-5">
            <input
              type="radio"
              name="stock_status"
              value="true"
              checked={stockStatus.includes("true")}
              onChange={(event) => {
                setStockStatus(event);
                onFilterHandler();
              }}
            />
            <label>available</label>
            <input
              type="radio"
              name="stock_status"
              value="false"
              checked={stockStatus.includes("false")}
              onChange={(event) => {
                setStockStatus(event);
                onFilterHandler();
              }}
            />
            <label>unavailable</label>
          </div>
        </div>
        <hr className="bg-black" />
        <div className="flex justify-end">
          <div className="flex flex-row gap-5">
            <Button
              onClick={() => onResetHandler()}
              className="rounded-lg border-0 hover:rounded-lg hover:border-0 hover:bg-purple-100 hover:text-purple-500"
            >
              Reset
            </Button>
            <Button
              onClick={() => onFilterHandler()}
              className="rounded-lg border-0 bg-purple-600 text-white hover:rounded-lg hover:border-0 hover:bg-purple-900"
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchBar;
