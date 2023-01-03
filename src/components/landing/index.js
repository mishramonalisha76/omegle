import Navbar from "../navbar";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/heroImage.png";
// import SecondSection from "./second-section";
import Hero from "../../assets/hero.png";
import "./landing.css";
import "animate.css";
import Footer from "../footer";
function Landing() {
  return (
    <div className="landing">
      <Navbar />
      <div className="landing-content">
        <div className="landing-hero">
          {/* <h1>Say HI to Domegle</h1> */}
          <img
            className="landing-hero-img animate__animated animate__fadeInLeft"
            src={HeroImg}
            alt="Talk with strangers"
          />
          <div className="landing-sub-hero">
            <p className="landing-hero-text">Talk with strangers and make new friends</p>
            <div className="landing-sub-hero-buttons">
            <Link to="/dashboard">
              <button className="button1">Start Chat</button>
            </Link>
            <Link to="/dashboard">
              <button className="button2">Start Video</button>
            </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
