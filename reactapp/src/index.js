import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'babel-polyfill';
import 'jquery/dist/jquery.slim';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/scss/bootstrap.scss';

import Home from './home';
import UsersPage from './users';
import BooksPage from './books';
import './main.scss';
import SideBar, { SidebarToggle } from './components/sidebar';
import NotFound from './notfound';

class ReactApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: ''
    };
  }

  componentDidMount = () => {
    NProgress.done();
  }

  setHeader = (header1) => {
    this.setState({ header: header1 });
  }

  render = () => {
    const { header } = this.state;
    return (
      <Router>
        <div className="nodeapp-wrapper">
          <Helmet titleTemplate="%s | Sample nodeapp">
            <title>Home</title>
          </Helmet>
          <SideBar />
          <div className="w-100 mb-3">
            <nav className="navbar navbar-dark bg-dark justify-content-start mb-3">
              <SidebarToggle />
              <div style={{ marginLeft: '27px' }} className="text-white">
                {header}
              </div>
            </nav>
            <div className="main-section d-flex justify-content-center align-items-start">
              <Switch>
                <Route exact path="/" render={props => <Home {...props} routeHeader={this.setHeader} />} />
                <Route path="/users/:userId?" render={props => <UsersPage {...props} routeHeader={this.setHeader} />} />
                <Route path="/books/:bookId?" render={props => <BooksPage {...props} routeHeader={this.setHeader} />} />
                <Route render={props => <NotFound {...props} routeHeader={this.setHeader} />} />
              </Switch>
            </div>
            <footer className="mt-2 text-center font-weight-light">
              some awesome footer with copyright and privacy declaration.
            </footer>
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<ReactApp />, document.getElementById('root'));
