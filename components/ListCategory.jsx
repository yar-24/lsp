'use client';
import React from 'react';
import CardCategory from './CardCategory';

const ListCategory = () => {
  return (
    <div className="relative my-7 grid grid-flow-cols-2 gap-4 md:grid-cols-3 place-content-evenly">
      <CardCategory />
      <CardCategory />
      <CardCategory />
    </div>
  );
};

export default ListCategory;
