'use client';
import React, { useEffect, useState } from 'react';
import CardMading from './CardMading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMading } from '@/redux/mading/madingSlice';

const ListMading = () => {
  const [madings, setMadings] = useState([]);

  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(getAllMading()).then((res) => setMadings(res.payload.madings));
  });

  return (
    <div className="relative my-7 grid grid-flow-cols-2 gap-4 md:grid-cols-3 place-content-evenly">
      {madings?.map((mading) => (
        <CardMading
          key={mading._id}
          id={mading._id}
          image={mading.image}
          title={mading.title}
          desc={mading.desc}
          category={mading.category}
        />
      ))}
    </div>
  );
};

export default ListMading;
