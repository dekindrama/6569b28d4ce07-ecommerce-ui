const Link = ({ href, children }: any) => {
  return (
    <a
      href={href}
      type="button"
      className="border bg-gray-100 hover:bg-gray-200 transition-all"
    >
      {children}
    </a>
  );
};

export default Link;
