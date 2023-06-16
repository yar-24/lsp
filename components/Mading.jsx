'use client';
import {
  createMading,
  getMading,
  updateMading,
} from '@/redux/mading/madingSlice';
import { axiosInstance, formats, modules } from '@/utils/utils';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';

const Mading = ({ page }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [madings, setMadings] = useState({});

  const dispatch = useDispatch();
  const route = useRouter();
  const { id } = useParams();

  const { isLoading } = useSelector((state) => state.mading);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      dispatch(getMading(id))
        .then((res) => {
          setMadings(res.payload.mading);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isUpdate) {
      setTitle(madings.title);
      setDesc(madings.desc);
      setCategory(madings.category);
    }
  }, [madings, isUpdate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('image', image);
    data.append('title', title);
    data.append('desc', desc);
    data.append('category', category);

    if (!image || !title || !desc || !category) {
      alert('Enter all fields');
    } else {
      if (isUpdate) {
        const response = await axiosInstance.put(`/mading/${id}`, data, {
          headers: {
            Authorization: `Bearer ${user.user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data) {
          route.push('/');
        }
      } else {
        dispatch(createMading(data)).then((res) => {
          if (res.payload.message) {
            route.push('/people-admin');
          } else {
            alert('Error');
          }
        });
      }
    }
  };

  const onImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      <div className="gradient-02 z-0" />
      <h2 className="text-center font-bold text-xl mt-10">{page}</h2>
      <form
        onSubmit={onSubmit}
        className="relative md:max-w-screen-2xl w-screen flex flex-col md:flex-row justify-center items-start md:px-24 px-0 pb-20 mt-10"
      >
        <div className="flex flex-col md:my-3 md:w-[70%] w-[100%] border-gray-400 border rounded md:p-8 p-4 mr-4 ">
          <div className="flex flex-col py-4">
            <label className="mb-1">Title</label>
            <input
              className="text-black p-2"
              type="text"
              placeholder="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-4">
            <label className="mb-1">Gambar</label>
            <input
              className="p-2 border border-gray-400"
              type="file"
              id="file"
              onChange={(e) => onImage(e)}
            />
          </div>
          <div className="flex flex-col py-4">
            <label className="mb-1">Deskripsi</label>
            <ReactQuill
              theme="snow"
              name="desc"
              value={desc}
              onChange={setDesc}
              placeholder="Tulis sesuatu yang luar biasa.."
              modules={modules}
              formats={formats}
            />
          </div>
        </div>

        {/* kategori */}
        <div className="flex flex-col md:w-[30%] w-[100%]">
          <div className="my-3 border-gray-400 border rounded p-5">
            <h1 className="font-bold text-lg">Kategori</h1>
            <div>
              <input
                type="radio"
                checked={category === 'pendidikan'}
                name="cat"
                value="pendidikan"
                id="pendidikan"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="ml-2" htmlFor="pendidikan">
                Pendidikan
              </label>
            </div>
            <div>
              <input
                type="radio"
                checked={category === 'budaya'}
                name="cat"
                value="budaya"
                id="budaya"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="ml-2" htmlFor="budaya">
                Budaya
              </label>
            </div>
            <div>
              <input
                type="radio"
                checked={category === 'teknologi'}
                name="cat"
                value="teknologi"
                id="teknologi"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="ml-2" htmlFor="teknologi">
                Teknologi
              </label>
            </div>
            <div>
              <input
                type="radio"
                checked={category === 'sekolah'}
                name="cat"
                value="sekolah"
                id="sekolah"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="ml-2" htmlFor="sekolah">
                Sekolah
              </label>
            </div>
            <div>
              <input
                type="radio"
                checked={category === 'berita'}
                name="cat"
                value="berita"
                id="berita"
                onChange={(e) => setCategory(e.target.value)}
              />
              <label className="ml-2" htmlFor="berita">
                Berita
              </label>
            </div>
          </div>
          <button disabled={isLoading} className="btn">
            {isLoading ? 'Loading' : 'Upload'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Mading;
