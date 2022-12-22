import "./banner.scss";
import avengersGroup from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers_logo.png";

const Banner = () => {
  return (
    <div className="app__banner">
      <img src={avengersGroup} alt="Avengers" />
      <div className="app__banner-text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img src={avengersLogo} alt="Avengers logo" />
    </div>
  );
};

export default Banner;
