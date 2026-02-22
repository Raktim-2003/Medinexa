import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*---------- Left Side ----------*/}
        <div>
          <p className="mb-5 w-40 text-3xl font-bold text-primary cursor-pointer">
            Medinexa
          </p>
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            <p>
              Medinexa is an advanced healthcare platform designed to connect
              patients with trusted doctors and medical services seamlessly. Our
              mission is to simplify healthcare access through smart technology,
              secure data management, and user-friendly digital solutions. We
              aim to make healthcare more accessible, efficient, and reliable
              for everyone.
            </p>
          </p>
        </div>
        {/*---------- Center ----------*/}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              onClick={() => scrollTo(0, 0)}
              className="cursor-pointer hover:text-black transition-all duration-500"
            >
              <NavLink to="/">Home</NavLink>
            </li>
            <li
              onClick={() => scrollTo(0, 0)}
              className="cursor-pointer hover:text-black transition-all duration-500"
            >
              <NavLink to="/about">About us</NavLink>
            </li>
            <li
              onClick={() => scrollTo(0, 0)}
              className="cursor-pointer hover:text-black transition-all duration-500"
            >
              <NavLink to="/contact">Contact us</NavLink>
            </li>
            <li className="cursor-pointer hover:text-black transition-all duration-500">
              Privacy policy
            </li>
          </ul>
        </div>
        {/*---------- Right Side ----------*/}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="cursor-pointer hover:text-black transition-all duration-500">
              +9134622038
            </li>
            <li className="cursor-pointer hover:text-black transition-all duration-500">
              medinexa2026@gmail.com
            </li>
          </ul>
        </div>
      </div>
      {/*---------- Copyright Text ----------*/}
      <div>
        <hr className="text-gray-400" />
        <p className="py-5 text-sm text-center text-gray-600">
          Copyright © 2025 Medinexa - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
