import { logout } from '@/redux/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineHome, AiOutlineSearch, AiOutlineLogin } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <nav className="flex justify-center w-full bg-[#0f172a] border border-blue-950 border-t-2 fixed bottom-0 z-50 p-3">
      <ul className="flex w-[1400px] justify-around max-w-screen-2xl">
        <Link className="btnNav" href="/">
          <AiOutlineHome size={25} />
          <p className="mt-1">Home</p>
        </Link>
        <div className="btnNav">
          <AiOutlineSearch size={25} />
          <li className="mt-1">Search</li>
        </div>
        {user ? (
          <>
            {user.user.isAdmin === true ? (
              <Link className="btnNav" href="/people-admin">
                <CiUser size={25} />
                <li className="mt-1">Admin</li>
              </Link>
            ) : (
              <Link className="btnNav" href="/people">
                <CiUser size={25} />
                <li className="mt-1">People</li>
              </Link>
            )}

            <button className="btnNav" href="/people" onClick={onLogout}>
              <FiLogOut size={25} />
              <li className="mt-1">Logout</li>
            </button>
          </>
        ) : (
          <Link className="btnNav" href="/login">
            <AiOutlineLogin size={25} />
            <li className="mt-1">Login</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
