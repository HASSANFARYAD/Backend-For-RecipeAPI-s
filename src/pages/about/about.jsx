import "./about.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-des">
        <h1>About</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non roident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor
           sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        </p>
        <ul>
          <li>Lorem ipsum dolor sit amet</li>
          <li>sed do eiusmod tempor </li>
          <li>Duis aute irure dolor in reprehenderit</li>
          <li>Excepteur sint occaecat cupidatat</li>
          <li>Lorem ipsum dolor sit amet</li>
        </ul>
      </div>
      <div className="about-img">
        <img src={require("../../assets/aboutimg.jpg")} alt="pic1"/>
      </div>
    </div>
  )
}

export default About