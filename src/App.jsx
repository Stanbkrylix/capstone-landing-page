// import { v4 as uuidv4 } from "uuid";
// import { supabase } from "./Services/supabaseClient";
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

import img1 from "./assets/game-menu-verification.PNG";
import img2 from "./assets/game-levels.PNG";
import img3 from "./assets/game-character-fighting.PNG";
import img4 from "./assets/game-character-fighting-2.PNG";
import img5 from "./assets/game-character-fighting-3.PNG";
import img6 from "./assets/game-crystal-to-defend.PNG";
import img7 from "./assets/game-environment.PNG";
import img8 from "./assets/game-ingame-character.PNG";

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
            role: "Lead Developer + Level Designer",
            name: "Christian Alvarez",
            story: " Assist In All level designs, as well as combining assets",
        },

        {
            img: aboutImg2,
            role: "Developer + Level Designer",
            name: "Stanley Delva J",
            story: " Created The Cave underground level",
        },

        {
            img: aboutImg3,
            role: "Developer + Level Designer",
            name: "Hendrick Christian",
            story: " Created the Coastal Stronghold level",
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
                            <h3 className="dev-role">{info.role}</h3>
                            <p className="about-story">{info.story}.</p>
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
                    <h1>The Last StrongHold</h1>
                    <p>
                        Please verify your age because this game is intended for
                        audience of the age of 13 and up. Once you have verified
                        your age, an email of the game will be sent to you,
                        Thank you for your understanding.
                    </p>
                    <VerificationForm toEnableBtn={toEnableBtn} />

                    {/* <button className="download-game-btn">Play Now</button> */}
                </div>
                {/* <div className="qr-code-div">
                    <h2>Verify Age for</h2>
                    <h1>QR Code</h1>
                    <img src="" alt="" className="qr-img" />
                </div> */}
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

        addItem(formInput).then((response) => {
            if (!response.error) {
                // console.log("data ", response.data);
                const emailToSend = response.data[0].email;

                SendEmailReal(emailToSend)
                    .then((data) => {
                        alert(
                            "Your info is saved, link has been sent to your email.",
                        );
                    })
                    .catch((error) => {
                        alert("Error! please try again");
                    });
                return;
            }

            alert("Error Email could not be sent, try again");
            return;
        });

        getItems();
        // .then((data) => {
        //     console.log("from console log", formInput);
        //     console.log(data);
        // });

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
                        placeholder="Enter your name"
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
                        placeholder="Enter your age"
                        value={formInput.age}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="email">
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
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
        img7,
        img8,
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
            <h1>Story</h1>
            <p className="story-p">
                After a catastrophic arcane disaster shatters the ancient
                Strongholds and unleashes corruption across the land, a lone
                young acolyte must rise in place of the fallen scholars to
                protect the sacred obelisks that maintain the world’s magical
                balance. Journeying through the ruined Mountain Stronghold, the
                hidden Underground Stronghold, and the final Coastal Stronghold,
                you rebuild forgotten magical defenses and battle waves of
                corrupted creatures and powerful guardians twisted by dark
                magic. Along the way, you uncover the truth behind the
                catastrophe: a Fallen Sorcerer who fused himself with corruption
                to seize control of the world’s arcane power. In a final
                desperate battle, you confront him and restore balance, forging
                your destiny as the first Arcane Guardian.
            </p>
        </div>
    );
}
export default App;

// Should what the game, story, reason for game, team member,
// home=> video, walkthrough, or screenshot, pictures
