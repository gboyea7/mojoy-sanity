// pages/contact.tsx
import Container from "@/components/Container";
import { FaHome, FaPhone, FaInfoCircle } from "react-icons/fa";
import { AiFillMail } from "react-icons/ai";
import { FaX, FaInstagram, FaFacebookF } from "react-icons/fa6";
import Link from "next/link";

const socials = [
  {
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/mojoyicl/",
  },
  { icon: <FaX />, link: "https://twitter.com/mojoyICL" },
  { icon: <FaInstagram />, link: "https://www.instagram.com/mojoyicl/" },
];
const ContactPage = () => {
  return (
    <Container className="">
      <div className="flex flex-col lg:flex-row pt-10 justify-center items-center ">
        <div className="mb-6 w-full lg:w-3/4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.419917614367!2d3.3373867102114643!3d6.594617993371598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b92273801b885%3A0x2961cfdc611b8d39!2sMojoy%20Computers!5e0!3m2!1sen!2sng!4v1709947692419!5m2!1sen!2sng"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={true} // or allowFullScreen={false} if you don't want fullscreen
            loading="lazy"
          ></iframe>
        </div>
        <div className="px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="lg:text-3xl text-2xl font-bold mb-6 text-center">
              GET IN TOUCH WITH US
            </h1>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-start">
                <div className="flex mb-6 gap-4 items-center justify-center">
                  <FaHome className="text-xl" />
                  <p className="text-md text-gray-700">
                    13 Oshitelu St, Computer Village, Lagos, Nigeria
                  </p>
                </div>
                <div className="flex mb-6 gap-4 items-center justify-center">
                  <FaPhone className="text-xl" />
                  <p className="text-md text-gray-700">(+234)802-363-6583</p>
                </div>
                <div className="flex mb-6 gap-4 items-center justify-center">
                  <AiFillMail className="text-xl" />
                  <p className="text-md text-gray-700">mojoyici@gmail.com</p>
                </div>
                <div className="flex mb-6 gap-4 items-center justify-center">
                  <FaInfoCircle className="text-xl" />
                  <p className="text-md text-gray-700">
                    Monday - Friday (9am - 6pm), Saturday(9am to 3pm)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div>
          <p>or</p>
        </div>
        <div className="flex gap-4 lg:gap-10">
          {socials.map((social, index) => (
            <Link key={index} href={social.link}>
              <div className="text-yellow-200 lg:text-5xl text-3xl hover:text-yellow-400 hover:scale-125 transition-transform duration-300 ease-in-out">
                {social.icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
