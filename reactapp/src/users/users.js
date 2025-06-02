import React from 'react';
import _ from 'lodash';
import omitEmpty from 'omit-empty';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './users.scss';
import Alert from 'Components/alert';
import UserList from './userlist';

const emptyUser = {
  email: '',
  name: '',
  address: {
    line1: '',
    line2: '',
    zip: '',
    city: '',
    state: '',
    country: ''
  }
};

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      alert: {},
      user: _.cloneDeep(emptyUser)
    };
  }

  componentDidMount = () => {
    const { match, routeHeader } = this.props;
    this.fetchUsers();
    routeHeader(<h2 className="mb-0">Manage users</h2>);
    if (match.params.userId) {
      this.fetchUser(match.params.userId);
    }
  }

  componentDidUpdate = (prevProps) => {
    const { match } = this.props;
    const oldEmail = _.get(prevProps, 'match.params.userId', undefined);
    if (match.params.userId && oldEmail !== match.params.userId) {
      this.fetchUser(match.params.userId);
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = document.getElementById('user-form');
    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    if (isValid) {
      this.postUser();
    }
  }

  postUser = () => {
    let { user } = this.state;
    user = omitEmpty(user);
    (async () => {
      const rawResponse = await fetch(`/api/users/${user._id || ''}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (rawResponse.status >= 500) {
        const message = (
          <div>
            <strong>Something went wrong! </strong>
            while adding/updating user.
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else if (rawResponse.status >= 400) {
        const res = await rawResponse.json();
        const message = (
          <div>
            <strong>Can&#39;t save user!</strong>
            <div style={{ fontSize: '13px' }}>
              {res.message}
              .
            </div>
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else {
        this.setState({ user: _.cloneDeep(emptyUser), alert: { message: 'User is added/updated successfully.', type: 'success' } },
          () => {
            const { history } = this.props;
            history.push('/users');
            this.fetchUsers();
            document.getElementById('user-form').classList.remove('was-validated');
          });
      }
    })();
  }

  fetchUsers = () => {
    (async () => {
      const rawResponse = await fetch('/api/users/', {
        method: 'GET',
        headers: { Accept: 'application/json', }
      });
      if (rawResponse.status >= 400) {
        const message = (
          <div>
            <strong>Something went wrong! </strong>
            while fetching users.
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else {
        const users = await rawResponse.json();
        this.setState({ users });
      }
    })();
  }

  fetchUser = (email) => {
    (async () => {
      const rawResponse = await fetch(`/api/users/${email}`, {
        method: 'GET',
        headers: { Accept: 'application/json', }
      });
      if (rawResponse.status >= 400) {
        const message = (
          <div>
            <strong>Something went wrong! </strong>
            while fetching user
            {email}
            .
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else {
        let user = await rawResponse.json();
        user = _.merge(_.cloneDeep(emptyUser), user);
        this.setState({ user });
      }
    })();
  }

  handleChange = (event) => {
    const user = _.set(this.state, event.target.name, event.target.value);
    this.setState(user);
  }

  dismissAlert = () => {
    setTimeout(() => this.setState({ alert: {} }), 1000);
  }

  render = () => {
    const { user, alert, users } = this.state;
    return (
      <div className="container users-page">
        <Helmet>
          <title>Users</title>
          <meta name="description" content="Manager users" />
        </Helmet>
        <div className="row justify-content-start">
          {alert.message ? <Alert {...alert} dismiss={this.dismissAlert} /> : ''}
        </div>
        <div className="row justify-content-start">
          <form className="col col-md-12" onSubmit={this.handleSubmit} id="user-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input value={user.email} onChange={this.handleChange} required type="email" className="form-control" id="email" name="user.email" aria-describedby="emailHelp" placeholder="sample@example.com" />
              <div className="invalid-feedback">
                Please provide email address.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input value={user.name} onChange={this.handleChange} required type="text" className="form-control" id="name" name="user.name" placeholder="First Last" />
              <div className="invalid-feedback">
                Please provide name.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="line1">Address</label>
              <input value={user.address.line1} onChange={this.handleChange} type="text" className="form-control" id="line1" name="user.address.line1" placeholder="1234 Main St" />
            </div>
            <div className="form-group">
              <label htmlFor="line2">Address 2</label>
              <input value={user.address.line2} onChange={this.handleChange} type="text" className="form-control" id="line2" name="user.address.line2" placeholder="Apartment, studio, or floor" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label htmlFor="zip">Zip</label>
                <input value={user.address.zip} onChange={this.handleChange} type="text" className="form-control" id="zip" name="user.address.zip" placeholder="411019" />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="city">City</label>
                <input value={user.address.city} onChange={this.handleChange} type="text" className="form-control" id="city" name="user.address.city" placeholder="Sacramento" />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="state">State</label>
                <input value={user.address.state} onChange={this.handleChange} type="text" className="form-control" id="state" name="user.address.state" placeholder="CA" />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="country">Country</label>
                <input value={user.address.country} onChange={this.handleChange} required type="text" className="form-control" id="country" name="user.address.country" placeholder="USA" />
                <div className="invalid-feedback">
                  Please provide country.
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="row justify-content-start">
          <div className="col col-md-12 pt-5">
            <UserList users={users} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UsersPage);
