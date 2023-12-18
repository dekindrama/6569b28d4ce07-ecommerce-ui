import Logo from "./Logo";

const BaseTemplatePublic = ({ children }: { children: any }) => {
  const headerComponent = (
    <div className="mb-5 flex w-full justify-between bg-blue-100 p-5">
      <div>
        <Logo />
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

  return (
    <>
      {headerComponent}
      <div className="container mx-auto w-full px-5 md:px-0">{children}</div>
      {footerComponent}
    </>
  );
};

export default BaseTemplatePublic;
