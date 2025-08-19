import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedinIn,
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-t-muted bg-muted">
        <div className="w-full max-w-7xl max-auto flex items-center px-5 sm:px-6 py-5 lg:py-5 lg:px-8 justify-between">
          <Link
            href="/home"
            className="w-32 rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white "
          >
            IQuiz
          </Link>
        </div>
        <div className="flex items-end p-3">
          <p>
            &copy; <span id="year"></span> Created by Reham Elsayed
          </p>
        </div>
        <div className="flex flex-col items-start gap-5">
          <div className="flex justify-center items-center gap-5">
            <FaEnvelope />
            <p>rehamshipl445@gmail.com</p>
          </div>
          <div className="flex justify-center items-center gap-5">
            <FaFacebook />
            <FaInstagramSquare />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
