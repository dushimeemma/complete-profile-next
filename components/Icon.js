import Image from 'next/image';

const Icon = ({ url, alt }) => {
  return <Image src={url} alt={alt} width={200} height={200} />;
};

export default Icon;
