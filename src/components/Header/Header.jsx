import React,{useEffect,useState} from "react";
import "./Header.css";
import {NavLink} from "react-router-dom";
import {MdMail,MdOutlineMenu} from "react-icons/md";
import {TiDeleteOutline} from "react-icons/ti";
import App from "../WalletConnect/App";

const Header = () => {
    const [screenSize,setScreenSize]=useState(window.innerWidth);
    const [activeMenu,setActiveMenu]=useState(true);
    const [rNavbar,setRnavbar]=useState(true);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, [setScreenSize]);
    
      useEffect(() => {
        if (screenSize >= 900) {
          setActiveMenu(true);
        } else {
          setActiveMenu(false);
        }
      }, [screenSize,setActiveMenu]);

      const handleNavbar=()=>{
        return setRnavbar(!rNavbar)}
  return (
    <div>
        <div className="topbar">
            <div>
                <MdMail className="topbar-icon"/>
                <a  href="mailto:mike@learndsl.com">mike@learndsl.com</a>
            </div>
            <App/>
        </div>
        <div className="navbar">
            <img src={require("../../assets/logo.png")} alt="logo"/>
            {activeMenu?
                        <div className="navbtn">
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to='/about'>About Us</NavLink>
                            <NavLink to='/dictionary-definition'>Dictionary</NavLink>
                            <NavLink to='/project-health'>Project Health</NavLink>
                        </div>
                        :
                        <>
                        <MdOutlineMenu onClick={handleNavbar} className="hamberger"/>
                        <div className={rNavbar?"close-navbtn":"rnavbtn"}>
                        <TiDeleteOutline onClick={handleNavbar} className="close-bar" />
                        <span></span>
                        <NavLink to='/' onClick={handleNavbar}>Home</NavLink>
                        <NavLink to='/about' onClick={handleNavbar}>About Us</NavLink>
                        <NavLink to='/dictionary-definition' onClick={handleNavbar}>Dictionary</NavLink>
                        <NavLink to='/project-health' onClick={handleNavbar}>Project Health</NavLink>
                    </div>
                    </>

            }
        </div>
    </div>
  )
}

export default Header