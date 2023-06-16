'use client';
import { register } from '@/redux/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    if (!username || !email || !password) {
      alert('Harus diisi semua');
    } else {
      dispatch(register(userData))
        .then((res) => {
          if (res.payload.user) {
            router.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="gradient-02 z-0" />
      <form
        onSubmit={onSubmit}
        className="relative flex flex-col md:w-[500px] w-[300px] border-gray-400 border rounded p-5 mt-[20%]"
      >
        <h2 className="text-center font-bold text-lg">Register</h2>
        <div className="flex flex-col my-3">
          <label className="mb-1">Email</label>
          <input
            className="text-black p-2"
            type="mail"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="email"
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="mb-1">Username</label>
          <input
            className="text-black p-2"
            type="text"
            placeholder="username"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="mb-1">Password</label>
          <input
            className="text-black p-2"
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button className="btn mt-2">Submit</button>
        <span className="mt-5">
          Sudah punya akun?{' '}
          <Link className="underline text-blue-500" href="/login">
            login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
