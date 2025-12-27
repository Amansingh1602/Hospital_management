import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "8:00 AM - 10:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "8:00 AM - 10:00 PM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "8:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "8:00 AM - 10:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "8:00 AM - 10:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 6:00 PM",
    },
    {
      id: 7,
      day: "Sunday",
      time: "Emergency Only",
    },
  ];

  return (
    <>
      <footer>
        <div className="footer-inner">
          <hr />
          <div className="content">
          <div>
            <img src="/logo.svg" alt="MediCare Plus Hospital" className="logo-img\"/>
            <p className="footer-tagline">
              MediCare Plus Hospital - Your trusted partner in health. 
              Providing exceptional care with compassion since 2005.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Book Appointment</Link>
              <Link to={"/about"}>About Us</Link>
              <Link to={"/login"}>Patient Portal</Link>
            </ul>
          </div>
          <div>
            <h4>Operating Hours</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div>
              <FaPhone />
              <span>+91 98765 43210</span>
            </div>
            <div>
              <span style={{marginLeft: '36px', fontSize: '14px', color: '#9ca3af'}}>Emergency: +91 98765 00911</span>
            </div>
            <div>
              <MdEmail />
              <span>info@medicareplus.in</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Sector 21, Dwarka,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New Delhi - 110075, India</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 MediCare Plus Hospital. All Rights Reserved.</p>
          <p>Accredited by NABH & NABL | ISO 9001:2015 Certified</p>
        </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
