import "./About.css";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import tick from './tick.png';
import archery from './archery.png';
import gun from './rightimg3.png';
import img1 from './prob1.jpg';
import img2 from './prob2.jpg';
import res1 from './resource1.png';

const About = () => {
    useEffect(() => {
        const sections = document.querySelectorAll(".fromtop-anim, .fade-effect, .aboutrightsec, .left-img-effect, .right-img-effect");

        const observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });
    }, []);

    const [showScrollUpButton, setShowScrollUpButton] = React.useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setShowScrollUpButton(window.scrollY > 200);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Banner Section */}
            <div className="about-banner">
                <div className="about-banner-front">
                    <div className="aboutleft">
                        <div className="aboutleftsec fromtop-anim">RB Webstore</div>
                        <p className="abouleftseccont fade-effect">
                            A web application for immersive augmented reality shopping experiences.
                        </p>
                    </div>
                    <img src={gun} className="aboutrightsec" alt="AR shopping" />
                </div>
            </div>

            {/* Why RB Webstore */}
            <h1 className="second-head fromtop-anim">Why RB WEBSTORE ?</h1>
            <div className="prob-box">
                <img src={img1} className="prob-img left-img-effect" alt="Problem" />
                <div className="about-prob fade-effect">
                    <p className="about-prob-header"><i>Problem</i></p>
                    <p className="about-prob-sol">
                        Traditional e-commerce platforms fail to deliver immersive product experiences,
                        leaving customers uncertain about the look, fit, and functionality of items. This lack of
                        visualization leads to higher return rates as products may not meet expectations. Additionally,
                        customer engagement suffers due to the limited ability to interact with and explore products online.
                    </p>
                </div>
            </div>

            <div className="prob-box2">
                <div className="about-prob fade-effect">
                    <p className="about-prob-header" style={{ padding: "1vh", width: "70%" }}><i>Solution</i></p>
                    <p className="about-prob-sol2">
                        With RB-Webstore, customers can visualize products in their own spaces and view all the virtual features more clearly.
                        This empowers customers to make informed decisions, reduces return rates, and enhances engagement, resulting in
                        a more satisfying and immersive shopping journey.
                    </p>
                </div>
                <img src={img2} className="prob-img2 right-img-effect" alt="Solution" />
            </div>

            {/* Status & Goals */}
            <div className="about-goals-box">
                <div className="status fade-effect">
                    <h1 className="status-header fromtop-anim" style={{ color: "rgb(19, 227, 19)" }}>Current Status</h1>
                    {[ 
                        "E-commerce products with 3D models for 360° viewing",
                        "Photorealistic 3D models for immersive shopping experiences.",
                        "360° viewer for detailed inspection of chairs, frames, and cars.",
                        "Explore products in your space using augmented reality.",
                        "Augmented reality for in-home product exploration."
                    ].map((text, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            <img src={tick} style={{ height: "40px", display: "block", margin: "4vh 2vh 0 0" }} className="fromtop-anim" alt="tick" />
                            <p className="status-points fromtop-anim">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="status fade-effect">
                    <h1 className="status-header fromtop-anim" style={{ color: "rgb(9, 16, 250)" }}>Future Goals</h1>
                    {[
                        "Build an e-commerce platform providing an immersive shopping experience.",
                        "Make the products interactive in a real environment rather than just demonstrating static 3D models using ML-AI."
                    ].map((text, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            <img src={archery} style={{ height: "40px", display: "block", margin: "4vh 2vh 0 0" }} className="fromtop-anim" alt="goal" />
                            <p className="status-points fromtop-anim">{text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Exposure */}
            <h1 className="second-head fromtop-anim">Learning Exposure !</h1>
            <div className="learning-about-block">
                <div className="learning-about fade-effect" style={{ flex: "1.8" }}>
                    <span className="fade-effect text-content">
                        <b>XR</b>, or <b>Extended Reality</b>, is an exciting technology that combines the real world with
                        virtual elements. As a student interested in XR, while contributing to this project,
                        you will learn about the technical aspects of XR, which involve understanding how to
                        create and render virtual objects, recognize and track objects in the real world,
                        and explore how users interact with virtual environments, ensuring intuitive and
                        immersive experiences.
                        <p>While studying XR, you can delve into programming technologies
                            like <i style={{ color: "blueviolet" }}>Three.js</i> or <i style={{ color: "blueviolet" }}>Unity</i> to develop interactive and immersive experiences.
                            You'll also explore 3D modelling and animation to create virtual objects
                            and environments.
                        </p>
                        No worries! The project is completely beginner-friendly 😅. Give your best, and you can
                        really learn and build something out of the box 😎!
                    </span>
                </div>
                <div className="learning-about fade-effect" style={{ display: "flex", flexDirection: "column", flex: "1.2" }}>
                    <p style={{ color: "yellow" }} className="fromtop-anim">
                        <i>Find some helpful resources below to start your journey in XR.</i>
                    </p>
                    <ul className="about-res-ul">
                        <li style={{ marginBottom: "30px" }}>
                            <a href="https://codemaker2016.medium.com/develop-your-first-webar-app-using-webxr-and-three-js-7a437cb00a92">
                                <img className="res1-img fade-effect" src={res1} alt="Resource 1" style={{ height: "180px" }} />
                            </a>
                        </li>
                        <li>
                            <div className="yt-res-container fade-effect" style={{ height: "200px" }}>
                                <iframe
                                    className='yt-res'
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/gAzIkjkJSzM?si=66Slz3nUzBZC-b5i"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Project Admin */}
            <div>
                <h1 className="second-head fromtop-anim">Project Admin</h1>
                <a href="https://github.com/RUBAL-cyber">
                    <div className="about-admin-box fade-effect">
                        <img className="about-admin-img" src="https://avatars.githubusercontent.com/u/56475750?v=4" alt="Admin" />
                        <p className="about-admin">RUBAL</p>
                    </div>
                </a>
            </div>

            {/* Contributors */}
            <div>
                <h1 className="second-head fromtop-anim" style={{ marginTop: "13vh" }}>Contributors</h1>
                <p className="second-head fromtop-anim" style={{ color: "blue" }}><b>Credits go to these contributors:</b></p>
                <div className="team-members fade-effect">
                    <ul>
                        <li>RUBAL</li>
                        <li>MANJINDER KAUR</li>
                        <li>GURPREET KAUR</li>
                        <li>YASHKARAN</li>
                    </ul>
                </div>

                {showScrollUpButton && (
                    <button className='scroll-up-button' onClick={scrollToTop}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                )}
            </div>
        </>
    );
};

export default About;