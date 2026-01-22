import { useState } from "react";
import {
    Link,
    Routes,
    Route,
    useParams,
    BrowserRouter,
    Outlet,
} from "react-router-dom";
import "./App.css";

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

function Company() {
    return (
        <div className="company-page">
            <h1>About the company</h1>
        </div>
    );
}
export default App;
