import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            MediCare Plus Hospital is a world-class healthcare facility dedicated
            to providing exceptional medical services with compassion, innovation,
            and excellence. Our team of highly skilled physicians, surgeons, and
            healthcare professionals is committed to delivering personalized care
            tailored to each patient's unique needs. At MediCare Plus, we combine
            cutting-edge technology with human touch to ensure your journey towards
            optimal health and wellness.
          </p>
          <div className="hero-features">
            <div className="feature-item">
              <span className="feature-icon">🏥</span>
              <span>24/7 Emergency Care</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">👨‍⚕️</span>
              <span>Expert Specialists</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💊</span>
              <span>Modern Pharmacy</span>
            </div>
          </div>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
