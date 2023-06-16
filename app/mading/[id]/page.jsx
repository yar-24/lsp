'use client';
import { createComment } from '@/redux/comment/commentService';
import { getAllComment } from '@/redux/comment/commentSlice';
import { getMading } from '@/redux/mading/madingSlice';
import { axiosInstance, getText } from '@/utils/utils';
import moment from 'moment';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MadingDetail = () => {
  const [komentar, setKomentar] = useState('');
  const [comments, setComments] = useState([]);
  const [idMading, setIdMading] = useState('');

  const { id } = useParams();
  const dispacth = useDispatch();

  const { mading } = useSelector((state) => state.mading.mading);
  const user = useSelector((state) => state.auth.user);

  const filterComment = comments
    ? comments.filter((comment) => comment.idMading === id)
    : null;

  useEffect(() => {
    dispacth(getMading(id));
    dispacth(getAllComment()).then((res) => {
      setComments(res.payload.comments);
    });
    setIdMading(id);
  }, [dispacth]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      komentar,
      idMading,
    };

    if (user) {
      const response = await createComment(data, user.token);
      if (response.comment) {
        alert(response.message);
        setKomentar('');
      }
    } else {
      alert('login dulu yak!!');
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col items-center py-10 md:w-[70%] px-5"
    >
      <div className="gradient-02 z-0" />
      <h1 className="font-bold text-xl">{mading ? mading.title : 'title'}</h1>
      <img
        className="my-5 h-[100px] md:h-[300px] w-full object-cover"
        src={
          mading
            ? `https://res.cloudinary.com/eundangdotcom/image/upload/v1666578066/${mading.image}`
            : '/banner2.jpeg'
        }
        alt="mading"
      />
      <p className="text-right text-xs">
        {moment(mading ? mading.reatedAt : 'null').format('D MMMM YYYY')}
      </p>
      <p className="p-text">{getText(mading ? mading.desc : 'Lorem ipsum')}</p>

      <div className="relative w-[100%] border-gray-400 border rounded p-3 md:p-8 mt-5">
        <h3 className="text-lg font-bold">Komentar</h3>
        <div className="flex flex-col my-3">
          <label className="mb-1">Buat Komentar</label>
          <input
            className="text- p-2 bg-slate-700 "
            type="text"
            placeholder="Isi sesuatu"
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            required
          />
        </div>
        <button className="btn">Submit</button>
        <div className="flex flex-col items-center relative overflow-y-scroll h-[300px]">
          {filterComment.map((comment) => (
            <div className="flex flex-col border-gray-400 border rounded p-3 md:w-[80%] mt-5">
              <div className="flex justify-between">
                <h3 className="text-lg font-bold">{comment.username}</h3>
                <p className="p-text text-xs">{comment.email}</p>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default MadingDetail;
