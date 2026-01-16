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
                <h1>Home page</h1>
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
