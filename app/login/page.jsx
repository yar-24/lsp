'use client';
import { login } from '@/redux/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    if (!email || !password) {
      alert('Harus diisi semua');
    } else {
      dispatch(login(userData))
        .then((res) => {
          if (res.error) {
            alert('Email atau password salah');
          } else {
            router.push('/');
          }
        })
        .catch((err) => {
          alert(err.response);
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
        <h2 className="text-center font-bold text-lg">Login</h2>
        <div className="flex flex-col my-3">
          <label className="mb-1">Email</label>
          <input
            className="text-black p-2"
            type="mail"
            placeholder="email"
            name="email"
            value={email}
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
        <button className="btn mt-2">Login</button>
        <span className="mt-5">
          Tidak punya akun?{' '}
          <Link className="underline text-blue-500" href="/register">
            buat akun
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
