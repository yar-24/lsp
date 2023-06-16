'use client';
import ListCategory from '@/components/ListCategory';
import ListMading from '@/components/ListMading';
import Banner from '@/components/banner';

export default function Home() {
  return (
    <>
      <Banner image="/cerdas-cermat.png" />
      <div className="flex min-h-screen flex-col p-5 md:p-24">
        <h1 className="text-center font-bold md:text-3xl text-lg">
          Mading Hari Ini
        </h1>
        <div className="gradient-01" />
        <ListMading />
        <Banner image="/banner2.jpeg" />
        <h1 className="text-center font-bold md:text-3xl text-lg md:mt-32 mt-20">
          Categories
        </h1>
        <div className="gradient-02 z-0" />
        <ListCategory />
      </div>
    </>
  );
}
