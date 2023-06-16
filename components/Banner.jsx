import React from 'react';

const Banner = ({ image }) => {
  return (
    <>
      <img
        src={image}
        className="h-[100px] md:h-[300px] w-full object-cover"
        alt="banner"
      />
    </>
  );
};

export default Banner;
