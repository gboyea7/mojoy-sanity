"use client";
import service1 from "@/assets/service.png";
import service2 from "@/assets/service-02.png";
import service3 from "@/assets/service-03.png";
import service4 from "@/assets/service-04.png";
import service5 from "@/assets/service-05.png";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    image: service1,
    title: "Free Shipping",
    tagline: "From all Orders over ₦1m",
  },
  {
    image: service2,
    title: "Daily Surprise Offer",
    tagline: "Save up to 25% off",
  },
  {
    image: service3,
    title: "Support 24/7",
    tagline: "Shop with an expert",
  },
  {
    image: service4,
    title: "Affordable Prices",
    tagline: "Get direct price",
  },
  {
    image: service5,
    title: "Secure Payments",
    tagline: "100% Protected Payments",
  },
];

const Services = () => {
  return (
    <section className="flex flex-col my-10 justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.9 },
        }}
        viewport={{ once: true }}
        className="my-2 lg:my-4 ml-5 lg:ml-10"
      >
        <h1 className="text-2xl lg:text-3xl font-medium">Our Services</h1>
      </motion.div>
      <div className="flex lg:gap-4 gap-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center border-2 justify-center lg:gap-5  lg:w-64 lg:h-16 h-16 w-16"
          >
            <Image
              src={service.image}
              alt={service.title}
              className="w-8 h-8 object-fit"
            />
            <div className="hidden lg:flex flex-col justify-center ml-2">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-md text-gray-600">{service.tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
