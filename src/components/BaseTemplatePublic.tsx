import Logo from "./Logo";

const BaseTemplatePublic = ({ children }: { children: any }) => {
  const headerComponent = (
    <div className="mb-5 flex w-full justify-between p-5 shadow-lg">
      <div>
        <Logo />
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {headerComponent}
      {children}
    </div>
  );
};

export default BaseTemplatePublic;
