
import { NavLink } from "react-router-dom"

function Nav() {
    return(
        <div className="side-bar">
            <div className="side-logo">
                <span className="logo-name">Trakora</span>
                <span className="sub-logo">Gestione consulenze</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Dashboard</NavLink>
                <NavLink to="/ore"  className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Ore Lavorative</NavLink>
                <NavLink to="/permessi"  className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Permessi e Ferie</NavLink>
                <NavLink to="/report"  className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Report</NavLink>
            </nav>

            <div className="sidebar-user">
                <div className="avatar">MR</div>
                <div>
                    <div className="user-name">Rodrigo</div>
                    <div className="user-role">Frontend Dev</div>
                </div>
            
            </div>
        </div>
        
    )
}

export default Nav