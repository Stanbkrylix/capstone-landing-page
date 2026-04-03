import { v4 as uuidv4 } from "uuid";
import { supabase } from "./Services/supabaseClient";
import { getItems, addItem } from "./Services/itemServices";
import SendEmailReal from "./Services/email";

import { useEffect, useState } from "react";
import {
    Link,
    Routes,
    Route,
    useParams,
    HashRouter,
    Outlet,
} from "react-router-dom";
import "./App.css";

import img1 from "./assets/adeptus-mechanicus.png";
import img2 from "./assets/dark-angel-tyranids.png";
import img3 from "./assets/dark-magician.png";
import img4 from "./assets/man-in-fantasy-battlefield.png";
import img5 from "./assets/spacewolf-daemon.png";
import img6 from "./assets/warhammer-bloodAngel-necrons.png";
import aboutImg1 from "./assets/young-man-misty-city.png";
import aboutImg2 from "./assets/young-man-desert-city.png";
import aboutImg3 from "./assets/young-man-metro-city.png";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/story" element={<Story />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
            </HashRouter>
        </>
    );
}

function Layout() {
    return (
        <div className="layout">
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

function Navbar() {
    return (
        <>
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/story">Story </Link>
                <Link to="/about">About </Link>
            </div>
        </>
    );
}

function About() {
    const [aboutInfo, setAboutInfo] = useState([
        {
            img: aboutImg1,
            name: "Misty Man",
            story: " Veniam est ut ad occaecat enim commodo officia anim excepteur sit dolore.",
        },

        {
            img: aboutImg2,
            name: "Desert Man",
            story: " Veniam est ut ad occaecat enim commodo officia anim excepteur sit dolore.",
        },

        {
            img: aboutImg3,
            name: "Metro Man",
            story: " Veniam est ut ad occaecat enim commodo officia anim excepteur sit dolore.",
        },
    ]);
    return (
        <>
            <div className="about-page">
                <h1>This the about page </h1>
                <div className="creators-about-section">
                    {aboutInfo.map((info, i) => (
                        <div className="creators-about-cards" key={i}>
                            <img src={info.img} alt="" className="about-img" />
                            <h2 className="about-name">{info.name}</h2>
                            <p className="about-story">{info.story}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function Home() {
    const [btnEnable, setBtnEnable] = useState(true);

    useEffect(() => {
        async function runTest() {
            const data = getItems().then((data) => {
                console.log(data);
            });
            // console.log(data);
        }

        // runTest();
    }, []);

    function toEnableBtn() {
        setBtnEnable(false);
    }

    return (
        <>
            <ScreenshotGallery />
            <div className="home-page">
                <div className="game-description-div">
                    <h1>The Amazing Tower Defense Game</h1>
                    <p>
                        Anim do eiusmod in ut amet ullamco magna magna ipsum
                        duis laboris sunt. Ea Lorem exercitation duis quis
                        labore voluptate eiusmod consectetur irure.
                    </p>
                    <VerificationForm toEnableBtn={toEnableBtn} />

                    {/* <button className="download-game-btn">Play Now</button> */}
                </div>
                <div className="qr-code-div">
                    <h2>Verify Age for</h2>
                    <h1>QR Code</h1>
                    <img src="" alt="" className="qr-img" />
                </div>
            </div>
        </>
    );
}

function VerificationForm({ toEnableBtn }) {
    const [formInput, setFormInput] = useState({
        name: "",
        age: "",
        email: "",
    });

    function resetFormInputs() {
        setFormInput({
            name: "",
            age: "",
            email: "",
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;

        setFormInput((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formInput.name || !formInput.age || !formInput.email) {
            alert("Please fill out all of the inputs");
            return;
        }

        if (formInput.age < 13) {
            alert("You are to young for this game");
            return;
        }

        addItem(formInput).then((data) => {
            console.log("added item", data);
        });

        getItems().then((data) => {
            console.log("from console log", formInput);
            console.log(data);
        });

        SendEmailReal();
        resetFormInputs();
        toEnableBtn();

        // return;
    }

    // function sendMail(e) {
    //     e.preventDefault();
    //     const email = "juniordelva1@gmail.com";
    //     const subject = encodeURIComponent("check this out");
    //     const body = encodeURIComponent(
    //         "here is the link: https://yourwebsite.com",
    //     );

    //     window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    //     console.log("send");

    //     // return mailToLink;
    // }

    return (
        <div className="verification-div">
            <h2 className="verify-form-header">Verify Person</h2>
            <form className="verification-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <span>Name:</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={formInput.name}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="age">
                    <span>Age:</span>
                    <input
                        type="number"
                        name="age"
                        id=""
                        placeholder="age"
                        value={formInput.age}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="email">
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formInput.email}
                        onChange={handleChange}
                    />
                </label>

                <input type="submit" value="Verify" className="verify-btn" />
                {/* <button onClick={sendMail}> send mail</button> */}
            </form>
        </div>
    );
}

function ScreenshotGallery() {
    const [ind, setInd] = useState(0);
    const [picture, setPicture] = useState([
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
    ]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setInd((prev) => (prev >= picture.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [picture.length]);

    function clickPrevious() {
        if (ind === 0) {
            setInd((prev) => prev - 1);
            return;
        }
        setInd(ind - 1);
    }

    function clickNext() {
        if (ind >= picture.length - 1) {
            setInd(0);
            return;
        }
        setInd(ind + 1);
    }
    function clickImageTracker(imageNum) {
        console.log(imageNum);
        setInd(imageNum);
    }

    return (
        <>
            <div className="gallery-div">
                <button
                    onClick={clickPrevious}
                    className="gallery-btn prev-btn"
                >
                    {"<"}
                </button>
                <img src={picture[ind]} alt="" className="gallery-img" />
                <button onClick={clickNext} className="gallery-btn next-btn">
                    {">"}
                </button>
            </div>
            <div className="gallery-image-tracker-div">
                <div className="gallery-image-tracker">
                    {picture.map((pic, i) => (
                        <span
                            className="image-tracker"
                            key={i}
                            style={
                                ind === i ? { backgroundColor: "white" } : {}
                            }
                            onClick={() => clickImageTracker(i)}
                        >
                            {/* tracker{" "} */}
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}

function Story() {
    return (
        <div className="story-page">
            <h1>About the Story</h1>
            <p>
                Excepteur sit nulla ipsum exercitation velit nostrud.Lorem
                exercitation Lorem fugiat Lorem anim cillum ex irure
                veniam.Fugiat culpa aliquip ipsum fugiat adipisicing culpa esse
                anim.Minim reprehenderit dolor consequat aliqua nulla ullamco
                nostrud.Exercitation dolore magna exercitation non aliquip
                cupidatat non commodo consectetur nisi amet eiusmod.Lorem ipsum
                aute non aute adipisicing adipisicing velit nulla.
            </p>
        </div>
    );
}
export default App;

// Should what the game, story, reason for game, team member,
// home=> video, walkthrough, or screenshot, pictures
