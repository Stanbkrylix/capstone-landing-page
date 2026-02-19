import { use, useEffect, useState } from "react";
import {
    Link,
    Routes,
    Route,
    useParams,
    BrowserRouter,
    Outlet,
} from "react-router-dom";
import "./App.css";

import img1 from "./assets/adeptus-mechanicus.png";
import img2 from "./assets/dark-angel-tyranids.png";
import img3 from "./assets/dark-magician.png";
import img4 from "./assets/man-in-fantasy-battlefield.png";
import img5 from "./assets/spacewolf-daemon.png";
import img6 from "./assets/warhammer-bloodAngel-necrons.png";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/story" element={<Story />} />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
            </BrowserRouter>
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
    return (
        <>
            <div className="about-page">
                <h1>This the about page </h1>
            </div>
        </>
    );
}

function Home() {
    const [btnEnable, setBtnEnable] = useState(true);

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
                    <button className="download-game-btn" disabled={btnEnable}>
                        Download Now
                    </button>
                    {/* <button className="download-game-btn">Play Now</button> */}
                </div>
                <div className="qr-code-div">
                    <h1>QR Code</h1>
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

    function handleSubmit(e) {
        e.preventDefault();
        if (!formInput.name || !formInput.age || !formInput.email) {
            alert("Please fill out all of the inputs");
            return;
        }

        if (formInput.age < 13) {
            alert("You are to young for this game");
            return;
        }

        console.log(formInput);
        resetFormInputs();
        toEnableBtn();

        // return;
    }
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
            setInd(picture.length - 1);
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
