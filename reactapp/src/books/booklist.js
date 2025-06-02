import React from 'react';
import { withRouter } from 'react-router-dom';

class BookList extends React.Component {
  getBooks = () => {
    const { history } = this.props;
    let { books } = this.props;
    books = books.map((book, index) => (
      <tr key={book.name} style={{ cursor: 'pointer' }} onClick={() => history.push(`/books/${book._id}`)}>
        <th scope="row">{index + 1}</th>
        <td>{book.name}</td>
        <td>{book.pages}</td>
      </tr>
    ));
    return (
      <tbody>
        {books}
      </tbody>
    );
  }

  render = () => (
    <div>
      <table className="table bg-white">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Pages</th>
          </tr>
        </thead>
        {this.getBooks()}
      </table>
    </div>
  )
}

export default withRouter(BookList);
