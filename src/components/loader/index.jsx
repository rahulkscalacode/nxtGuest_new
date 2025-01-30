import "./index.css";

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-logo">
          <img
            src="/images/asset/logo1.png"
            alt="TipStars Logo"
            className="loader-image"
          />
        </div>
        <div className="loader-rotating-border"></div>
      </div>
    </div>
  );
};

export default Loading;
