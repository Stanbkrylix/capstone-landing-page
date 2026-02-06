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
                        <Route path="/about" element={<About />} />
                        <Route path="/company" element={<Company />} />
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
                <Link to="/about">About </Link>
                <Link to="/company">Company </Link>
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
                    <div className="download-btns-div">
                        <button className="download-game-btn">
                            Download Now
                        </button>
                        <button className="download-game-btn">Play Now</button>
                    </div>
                </div>
                <div className="qr-code-div">
                    <h1>QR Code</h1>
                </div>
            </div>
        </>
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

function Company() {
    return (
        <div className="company-page">
            <h1>About the company</h1>
        </div>
    );
}
export default App;

// Should what the game, story, reason for game, team member,
// home=> video, walkthrough, or screenshot, pictures
