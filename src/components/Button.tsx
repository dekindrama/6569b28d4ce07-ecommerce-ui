const Button = ({ onClick, children }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded border border-black bg-gray-100 p-2 text-center transition-all hover:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default Button;
