import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SearchBar from "./public/SearchBar";
import routes from "@/routes/page";
import Button from "./public/Button";
import { useState } from "react";

const BaseTemplatePublic = ({ children }: { children: any }) => {
  const pathname = usePathname();
  const [showFilter, setShowFilter] = useState(false);

  const headerComponent = (
    <div className="flex w-full justify-between bg-white p-5">
      <div>
        <Logo />
      </div>
      <div>
        <Button
          className="rounded-lg border-0 bg-purple-600 text-white hover:rounded-lg hover:border-0 hover:bg-purple-900"
          onClick={() => {
            setShowFilter((value) => !value);
          }}
        >
          Filter
        </Button>
      </div>
    </div>
  );

  const footerComponent = (
    <div className="container mx-auto mt-5 flex w-full justify-between py-10">
      <div>
        <Logo className="text-xl" />
      </div>
      <div>
        <small>
          <p>created by dekindrama</p>
        </small>
      </div>
    </div>
  );

  let searchComponent = <></>;
  if (pathname == routes.index) {
    searchComponent = (
      <SearchBar
        isShow={showFilter}
        setIsShow={() => setShowFilter((value) => !value)}
      />
    );
  }

  return (
    <>
      {headerComponent}
      {searchComponent}
      <div className="container mx-auto mt-5 w-full px-5 md:px-0">
        {children}
      </div>
      {footerComponent}
    </>
  );
};

export default BaseTemplatePublic;
