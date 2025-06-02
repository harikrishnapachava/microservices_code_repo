import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  address = (address) => {
    const {
      line1, line2, city, state, zip, country
    } = address;
    return (
      <address>
        {line1}
        {line1 && line2 ? (
          <span>
            {','}
            <br />
          </span>
        ) : ''}
        {line2}
        {(line1 || line2) && (city || state) ? (
          <span>
            {','}
            <br />
          </span>
        ) : ''}
        {address.city}
        {city && state ? ', ' : ''}
        {address.state}
        {(line1 || line2 || city || state) && (zip || country) ? (
          <span>
            {','}
            <br />
          </span>
        ) : ''}
        {address.zip}
        {zip && state ? ', ' : ''}
        {address.country}
      </address>
    );
  }

  getUsers = () => {
    const { history } = this.props;
    let { users } = this.props;
    users = users.map((user, index) => (
      <tr key={user.email} style={{ cursor: 'pointer' }} onClick={() => history.push(`/users/${user._id}`)}>
        <th scope="row">{index + 1}</th>
        <td>{user.email}</td>
        <td>{user.name}</td>
        <td>{this.address(user.address)}</td>
      </tr>
    ));
    return (
      <tbody>
        {users}
      </tbody>
    );
  }

  render = () => (
    <div>
      <table className="table bg-white">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        {this.getUsers()}
      </table>
    </div>
  )
}

export default withRouter(UserList);
