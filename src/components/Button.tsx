const Button = ({ onClick, children }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border bg-gray-100 hover:bg-gray-200 transition-all p-2 rounded border border-black"
    >
      {children}
    </button>
  );
};

export default Button;
