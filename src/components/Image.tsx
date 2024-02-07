const Image = ({
  src,
  alt,
  className,
  defaultSrc,
}: {
  src: string;
  alt: string;
  className?: string;
  defaultSrc?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e: any) => {
        e.target.src = defaultSrc;
        e.target.onError = null;
      }}
    />
  );
};

export default Image;
