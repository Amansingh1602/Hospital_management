import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>About Us</p>
          <h3>Who We Are</h3>
          <p>
            MediCare Plus Hospital was founded in 2005 with a vision to revolutionize
            healthcare delivery. Over the years, we have grown into a premier
            medical institution, serving thousands of patients with dedication and
            excellence. Our state-of-the-art facilities and cutting-edge technology
            ensure that you receive the best possible care.
          </p>
          <p>Serving Communities Since 2005</p>
          <p>
            <strong>Our Mission:</strong> To provide accessible, affordable, and
            high-quality healthcare services to all individuals, regardless of
            their background. We believe that every person deserves the best
            medical care, and we strive to make that a reality.
          </p>
          <p>
            <strong>Our Vision:</strong> To be the leading healthcare provider known
            for clinical excellence, patient-centered care, and innovative medical
            solutions. We aim to continuously improve health outcomes and enhance
            the quality of life for our patients and communities.
          </p>
          <p>
            <strong>Our Values:</strong> Compassion, Integrity, Excellence, Innovation,
            and Teamwork guide everything we do at MediCare Plus Hospital.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
