import { FaLinkedinIn, FaInstagram, FaFacebookF, FaChevronUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Left - Logo and Tagline */}
        <div>
          <h2 className="text-3xl font-bold">
            <span className="border-l-4 border-cyan-500 pl-3">Robogyan</span>
          </h2>
          <p className="mt-2 text-sm">Experience Engineering</p>
        </div>

        {/* Right - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-1">CONTACT US</h3>
          <div className="w-14 border-b-4 border-cyan-500 mb-3"></div>
          <p className="text-sm leading-6">
            Basement, 5th Block<br />
            Dr. Akhilesh Das Gupta Institute of<br />
            Professional Studies<br />
            FC-26, Shastri Park<br />
            Delhi-110053 <span className="font-semibold">Phone:</span> +91 83682 42921<br />
            <span className="font-semibold">Email:</span> robogyan@adgitmdelhi.ac.in
          </p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 flex justify-center gap-6">
        <a href="#" className="bg-gray-800 hover:bg-cyan-500 p-3 rounded-full transition">
          <FaLinkedinIn className="text-white text-lg" />
        </a>
        <a href="#" className="bg-gray-800 hover:bg-cyan-500 p-3 rounded-full transition">
          <FaInstagram className="text-white text-lg" />
        </a>
        <a href="#" className="bg-gray-800 hover:bg-cyan-500 p-3 rounded-full transition">
          <FaFacebookF className="text-white text-lg" />
        </a>
      </div>

      {/* Copyright */}
      <p className="mt-6 text-center text-sm">
        © Copyright <span className="font-bold">Robogyan.</span> All Rights Reserved
      </p>

      {/* Scroll to Top Button */}
      <a
        href="#"
        className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg"
      >
        <FaChevronUp />
      </a>
    </footer>
  );
};

export default Footer;
