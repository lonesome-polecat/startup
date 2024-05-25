import './App.css';
import './css/main.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import React from 'react'
import {Home} from "./home"
import {Login, Username} from "./login.jsx";
import {Menu} from "./menu"
import {Orders} from "./orders"
import {Contact} from "./contact"

function App() {
    let [isAuthenticated, setAuthenticated] = React.useState(false)

    function changeAuthentication() {
        setAuthenticated(!isAuthenticated)
    }

    return (
        <BrowserRouter>
            <header>
                <div className={"head"}>
                    <div>
                        <h2 className="pageTitle">Arizonuts</h2>
                    </div>
                    <Username isAuthenticated={isAuthenticated} changeAuthentication={changeAuthentication}/>
                </div>
                <nav>
                    <div>
                        <img id="burger-menu" src="img/Hamburger_icon.svg" />
                        <ul className="navbar">
                            <li>
                                <NavLink className='nav-link' to='index'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='menu'>Menu</NavLink>
                            </li>
                            <li>
                                <NavLink to='orders'>Orders</NavLink>
                            </li>
                            <li>
                                <NavLink to='contact'>Contact</NavLink>
                            </li>
                        </ul>
                        <div id="nav-pullout">
                            <ul className="navbar">
                                <li>
                                    <NavLink to='index'>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='menu'>Menu</NavLink>
                                </li>
                                <li>
                                    <NavLink to='orders'>Orders</NavLink>
                                </li>
                                <li>
                                    <NavLink to='contact'>Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Home />
                    }
                    exact
                />
                <Route path='/index' element={<Home />} />
                <Route path='/login' element={<Login changeAuthentication={changeAuthentication}/>} />
                <Route path='/menu' element={<Menu isAuthenticated={isAuthenticated} />} />
                <Route path='/orders' element={<Orders isAuthenticated={isAuthenticated} />} />
                <Route path='/contact' element={<Contact />} />
                {/*<Route path='*' element={<NotFound />} />*/}
            </Routes>
        </BrowserRouter>

    );
}

export default App;
