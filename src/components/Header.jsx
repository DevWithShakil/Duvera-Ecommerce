import React from "react";
import { motion } from "framer-motion";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import Logo from "../images/logo.png";
import Avatar from "../images/avatar.png";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";
function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* for desktop & tablet */}
      <div className="hidden md:flex h-full w-full items-center justify-between">
        <Link to={"/"} className="flex item-center gap-3">
          <img src={Logo} className="w-8 object-cover" alt="Logo" />
          <p className="text-headingColor text-2xl font-bold mt-2">Duvera</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Service
            </li>
          </motion.ul>
          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-0 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-sm text-white font-semibold ">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
              alt="UserProfile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "m.shakilkhan720@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Log Out <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* for mobile device */}
      <div className="flex items-center justify-between md:hidden h-full w-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingCart className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-3 -right-0 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-sm text-white font-semibold ">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex item-center gap-3">
          <img src={Logo} className="w-8 object-cover" alt="Logo" />
          <p className="text-headingColor text-2xl font-bold mt-2">Duvera</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
            alt="UserProfile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "m.shakilkhan720@gmail.com" && (
                <Link to={"/createItem"}>
                  <p
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 px-4 py-2">
                  Menu
                </li>
                <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 px-4 py-2">
                  About Us
                </li>
                <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 px-4 py-2">
                  Home
                </li>
                <li className="text-base text-textColor hover:text-headingColor cursor-pointer duration-100 px-4 py-2">
                  Service
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Log Out <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
