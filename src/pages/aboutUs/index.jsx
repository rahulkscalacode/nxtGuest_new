import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import styled from "styled-components";
import "./index.css";
import Footer from "../../components/footer";

const Index = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch((error) => {
        console.error("Failed to autoplay:", error);
      });
    } else {
      videoRef.current.play();
    }
  }, [isPlaying]);

  return (
    <Layout footer={<Footer />}>
      <div className="p-2">
        <div className="fontsize20">
          <div> About Us</div>
        </div>
        <div className="mt-3">
          <h2 className="fontsixe15">Welcome to NXTGUEST!</h2>
          <p className="fontsixe14">
            At NXTGUEST, we are dedicated to revolutionizing the way you
            experience transportation bookings. Whether you're a guest at a
            hotel or arriving at an airport, our mission is to provide a
            seamless and efficient booking experience tailored to your needs.
          </p>
        </div>
        <div className="subscribe-box">
          <h3 className="fontsixe15 text-dark">
            Follow our latest updates & Events
          </h3>
          <div className="d-flex">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="fontsixe15">Our Story</h2>
          <p className="fontsixe14">
            Founded with the vision of simplifying transportation logistics,
            NXTGUEST has grown into a trusted platform for travelers around the
            world. We understand the challenges that come with arranging
            transportation, especially in unfamiliar cities. That's why we
            created a user-friendly solution that allows you to book rides
            effortlessly, ensuring you reach your destination comfortably and on
            time.
          </p>
        </div>
        <div className="mt-3">
          <h2 className="fontsixe15">Our Story</h2>
          <p className="fontsixe14">
            Founded with the vision of simplifying transportation logistics,
            NXTGUEST has grown into a trusted platform for travelers around the
            world. We understand the challenges that come with arranging
            transportation, especially in unfamiliar cities. That's why we
            created a user-friendly solution that allows you to book rides
            effortlessly, ensuring you reach your destination comfortably and on
            time.
          </p>
        </div>
      </div>
      <VideoContainer>
        {!isPlaying && (
          <PlayButton onClick={handlePlay}>Click to unmute Video</PlayButton>
        )}
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          loop
          autoplay
          controls
          muted
        >
          <source src="/images/asset/vedio.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VideoContainer>
      <div className="mt-3">
        <h2 className="fontsixe15">What We Offer?</h2>
        <p className="fontsixe14">
          Seamless Booking: With our Progressive Web Application (PWA), you can
          quickly request transportation services by scanning a QR code or
          entering a direct link. Our intuitive service request form makes it
          easy to specify your travel details and preferences. Secure Payments:
          We integrate with reliable payment gateways to offer you a safe and
          straightforward payment process. Whether you're confirming a booking
          or viewing your payment history, your financial information is
          protected. Comprehensive Support: From booking management to customer
          support, our team is dedicated to providing you with the best possible
          service. If you encounter any issues, our support team is always ready
          to assist you.
        </p>
      </div>
      <div className="mt-2">
        <h2 className="fontsixe15">Why Choose NXTGUEST?</h2>
        <div className="mt-3">
          <img src="/images/icons/abb.png" alt="" className="w-100" />
        </div>
      </div>
      <div className="mt-3">
        <span className="fontsixe15">User-Centric Design: </span>
        <span className="fontsixe14">
          Our platform is designed with you in mind. We prioritize ease of use,
          ensuring that every interaction with our app is smooth and
          hassle-free.
        </span>
      </div>
      <div className="mt-2">
        <span className="fontsixe15">Reliable Service: </span>
        <span className="fontsixe14">
          We partner with professional drivers and reputable service providers
          to guarantee a reliable and comfortable travel experience.
        </span>
      </div>
      <div className="mt-2 mb-4">
        <span className="fontsixe15">Innovative Technology: </span>
        <span className="fontsixe14">
          Leveraging the latest in web and mobile technologies, our PWA ensures
          you have access to our services anytime, anywhere, with or without an
          internet connection.
        </span>
      </div>
    </Layout>
  );
};

const VideoContainer = styled.div`
  position: relative;
  width: 95%;
  margin: 0 auto;
`;
const PlayButton = styled.button`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2px;
  background-color: #ffc107;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
`;
export default Index;
