import { getText, truncate } from '@/utils/utils';
import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
const CardMading = ({ id, image, title, desc, children }) => {
  return (
    <div className="border-gray-400 border rounded">
      <img
        className="h-[200px] md:h-[350px] w-full object-cover"
        src={`https://res.cloudinary.com/eundangdotcom/image/upload/v1666578066/${image}`}
        alt="cerdas"
      />
      <div className="p-3">
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="p-text mt-3 mb-2">{getText(truncate(desc, 200))}</p>
        <Link href={`/mading/${id}`} type="button" className="btn text-center">
          read more
        </Link>
        {children}
      </div>
    </div>
  );
};

export default CardMading;
