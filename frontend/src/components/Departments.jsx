import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
      description: "Expert care for children"
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
      description: "Bone & joint specialists"
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
      description: "Heart health experts"
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
      description: "Brain & nerve care"
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
      description: "Cancer treatment center"
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
      description: "Advanced imaging services"
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
      description: "Rehabilitation services"
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
      description: "Skin care specialists"
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
      description: "Ear, nose & throat care"
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <div className="container departments">
        <h2>Our Medical Departments</h2>
        <p className="departments-subtitle">Comprehensive healthcare services across multiple specialties with experienced physicians and state-of-the-art facilities.</p>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={[
            "tablet",
            "mobile",
          ]}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div key={index} className="card">
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt="Department" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
