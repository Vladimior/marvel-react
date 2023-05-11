import './appHeader.scss';
import logo from '../../resources/img/Marvel_Logo.svg.png'
import {Link, NavLink} from 'react-router-dom';
const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <a href="#">
                <img src={logo} alt="marvel logo"/>
            </a>
            <nav className="app__menu">
                <ul>
                    <li><NavLink activeStyle={{'color': '#9f0013'}} to="/">Characters</NavLink></li>
                    /
                    <li><NavLink activeStyle={{'color': '#9f0013'}} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;