const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: any;
  children: any;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border  border-purple-500 bg-gray-100 bg-transparent p-2 px-5 text-center font-bold text-purple-500 transition-all  hover:bg-purple-500 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
