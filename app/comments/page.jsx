'use client';
import { deleteComment } from '@/redux/comment/commentService';
import { getAllComment } from '@/redux/comment/commentSlice';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

const Comments = () => {
  const { comment } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComment());
  }, []);

  const onDelete = async (id) => {
    await deleteComment(id, user.token).then((res) => console.log(res));
  };

  return (
    <div className='"border-gray-400 border rounded p-3'>
      <h1 className="my-10 text-lg font-bold">Comments</h1>
      <table class="table-auto">
        <thead className="text-left">
          <tr>
            <th>Comments</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comment.comments ? (
            comment.comments.map((comment) => (
              <tr className="h-auto border-b-[1px] border-gray-400">
                <td className="w-[500px] py-3">
                  <p className="whitespace-normal">{comment.comment}</p>
                </td>
                <td>{comment.username}</td>
                <td>
                  <button onClick={() => onDelete(comment._id)}>
                    <AiFillDelete color="red" size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="h-auto border-b-[1px] border-gray-400">
              <td className="w-[500px] py-3">
                <p className="whitespace-normal">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque vel dolore et quaerat repudiandae? Magnam qui non
                  doloremque quibusdam veniam!
                </p>
              </td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;
