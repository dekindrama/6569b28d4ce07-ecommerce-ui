const Link = ({ href, children }: any) => {
  return (
    <a
      href={href}
      type="button"
      className="rounded border border-black bg-gray-100 p-2 text-center transition-all hover:bg-gray-200"
    >
      {children}
    </a>
  );
};

export default Link;
