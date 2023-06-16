'use client';
import CardMading from '@/components/CardMading';
import { deleteMading, getAllMading } from '@/redux/mading/madingSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const DashboardAdmin = () => {
  const [madings, setMadings] = useState([]);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getAllMading()).then((res) => setMadings(res.payload.madings));
  });

  const onDelete = (id) => {
    dispacth(deleteMading(id));
  };

  return (
    <div className="flex min-h-screen flex-col p-5 md:p-24">
      <div className="md:w-[20%] w-[50%]">
        <h1 className="font-bold text-xl mb-4">Dashboard Admin</h1>
        <Link href="/comments" className="btn px-5 py-2">
          Lihat komen
        </Link>
      </div>
      <div className="relative my-7 grid grid-flow-cols-2 gap-4 md:grid-cols-3 place-content-evenly">
        {madings.map((mading) => (
          <CardMading
            key={mading._id}
            id={mading._id}
            image={mading.image}
            title={mading.title}
            desc={mading.desc}
            category={mading.category}
          >
            <div className="flex justify-end mt-6">
              <Link
                href={`/mading-update/${mading._id}`}
                className="bg-yellow-600 py-2 px-6 rounded"
              >
                Edit
              </Link>
              <button
                onClick={(e) => onDelete(mading._id)}
                className="bg-red-600 py-2 px-6 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </CardMading>
        ))}
      </div>
      <Link
        href="/mading-new"
        className="fixed flex justify-center items-center right-5 bottom-24 w-16 h-16 rounded-full bg-blue-700"
      >
        <AiOutlinePlus size={25} />
      </Link>
    </div>
  );
};

export default DashboardAdmin;
