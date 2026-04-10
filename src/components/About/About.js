import "./About.css";
import React, { useEffect } from "react";
import tick from './tick.png';
import archery from './archery.png';
import gun from './rightimg3.png';
import img1 from './prob1.jpg';
import img2 from './prob2.jpg';
import res1 from './resource1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const About = () => {

    useEffect(() => {
        const sections = document.querySelectorAll(".fromtop-anim, .fade-effect, .aboutrightsec, .left-img-effect, .right-img-effect");

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        sections.forEach((section) => observer.observe(section));
    }, []);

    const [showScrollUpButton, setShowScrollUpButton] = React.useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollUpButton(window.scrollY > 200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Banner */}
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

            {/* Problem */}
            <h1 className="second-head fromtop-anim">Why RB WEBSTORE ?</h1>
            <div className="prob-box">
                <img src={img1} className="prob-img left-img-effect" alt="Problem" />
                <div className="about-prob fade-effect">
                    <p className="about-prob-header"><i>Problem</i></p>
                    <p className="about-prob-sol">
                        Traditional e-commerce platforms fail to deliver immersive product experiences,
                        leaving customers uncertain about the look, fit, and functionality of items.
                    </p>
                </div>
            </div>

            {/* Solution */}
            <div className="prob-box2">
                <div className="about-prob fade-effect">
                    <p className="about-prob-header"><i>Solution</i></p>
                    <p className="about-prob-sol2">
                        With RB-Webstore, customers can visualize products in their own spaces using AR,
                        improving engagement and reducing returns.
                    </p>
                </div>
                <img src={img2} className="prob-img2 right-img-effect" alt="Solution" />
            </div>

            {/* Status */}
            <div className="about-goals-box">
                <div className="status fade-effect">
                    <h1 className="status-header fromtop-anim" style={{ color: "rgb(19, 227, 19)" }}>
                        Current Status
                    </h1>
                    {[
                        "3D product viewing",
                        "Photorealistic models",
                        "360° viewer",
                        "AR visualization",
                        "In-home AR experience"
                    ].map((text, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            <img src={tick} style={{ height: "40px", margin: "4vh 2vh 0 0" }} alt="tick" />
                            <p className="status-points">{text}</p>
                        </div>
                    ))}
                </div>

                <div className="status fade-effect">
                    <h1 className="status-header fromtop-anim" style={{ color: "rgb(9, 16, 250)" }}>
                        Future Goals
                    </h1>
                    {[
                        "Build immersive e-commerce platform",
                        "Interactive AR using AI/ML"
                    ].map((text, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            <img src={archery} style={{ height: "40px", margin: "4vh 2vh 0 0" }} alt="goal" />
                            <p className="status-points">{text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning */}
            <h1 className="second-head fromtop-anim">Learning Exposure</h1>
            <div className="learning-about-block">
                <div className="learning-about fade-effect">
                    <p>
                        XR (Extended Reality) combines real and virtual worlds.
                        You can learn technologies like Three.js and Unity.
                    </p>
                </div>

                <div className="learning-about fade-effect">
                    <a href="https://codemaker2016.medium.com/develop-your-first-webar-app-using-webxr-and-three-js-7a437cb00a92">
                        <img src={res1} alt="resource" style={{ height: "150px" }} />
                    </a>
                </div>
            </div>

            {/* Admin */}
            <div>
                <h1 className="second-head fromtop-anim">Project Admin</h1>
                <p className="about-admin">RUBAL</p>
            </div>

            {/* Scroll Button */}
            {showScrollUpButton && (
                <button className='scroll-up-button' onClick={scrollToTop}>
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            )}
        </>
    );
};

export default About;