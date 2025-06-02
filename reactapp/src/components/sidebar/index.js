import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Yogi from './yogi.jpg';
import './navigation.scss';

const toggleSidebar = () => {
  document.getElementById('sidebarCollapse').classList.toggle('active');
  document.getElementById('sidebar').classList.toggle('active');
};

class Sidebar extends React.Component {
  activeClass(path) {
    const { location } = this.props;
    if (path === location.pathname) {
      return 'active';
    }
    return '';
  }

/*
  <li className="active">
    <Link className={`nav-link ${this.activeClass('/')}`} to="/">Home</Link>
    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
    <ul className="collapse list-unstyled" id="homeSubmenu">
      <li>
        <a href="#">Home 1</a>
      </li>
      <li>
        <a href="#">Home 2</a>
      </li>
      <li>
        <a href="#">Home 3</a>
      </li>
    </ul>
  </li>
  <ul className="list-unstyled CTAs">
    <li>
      <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">Download source</a>
    </li>
    <li>
      <a href="https://bootstrapious.com/p/bootstrap-sidebar" className="article">Back to article</a>
    </li>
  </ul>
*/

  render() {
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <img src={Yogi} width="50" height="50" className="rounded d-inline-block align-top" alt="" />
        </div>
        <ul className="list-unstyled components">
          <li className={`${this.activeClass('/')}`}>
            <Link to="/" onClick={toggleSidebar}>Home</Link>
          </li>
          <li className={`${this.activeClass('/users')}`}>
            <Link to="/users" onClick={toggleSidebar}>Users</Link>
          </li>
          <li className={`${this.activeClass('/books')}`}>
            <Link to="/books" onClick={toggleSidebar}>books</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidebar);

export const SidebarToggle = () => (
  <button type="button" id="sidebarCollapse" className="navbar-btn" onClick={toggleSidebar}>
    <span />
    <span />
    <span />
  </button>
);
