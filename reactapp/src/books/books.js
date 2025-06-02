import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Alert from 'Components/alert';
import BookList from './booklist';

const emptyBook = {
  name: '',
  pages: 1
};

class BooksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      alert: {},
      book: _.cloneDeep(emptyBook)
    };
  }

  componentDidMount = () => {
    const { match, routeHeader } = this.props;
    routeHeader(<h2 className="mb-0">Manage books</h2>);
    this.fetchBooks();
    if (match.params.bookId) {
      this.fetchBook(match.params.bookId);
    }
  }

  componentDidUpdate = (prevProps) => {
    const { match } = this.props;
    const oldEmail = _.get(prevProps, 'match.params.bookId', undefined);
    if (match.params.bookId && oldEmail !== match.params.bookId) {
      this.fetchBook(match.params.bookId);
    }
  }

  fetchBook = (bookName) => {
    (async () => {
      const rawResponse = await fetch(`/api/books/${bookName}`, {
        method: 'GET',
        headers: { Accept: 'application/json', }
      });
      if (rawResponse.status >= 400) {
        const message = (
          <div>
            <strong>Something went wrong! </strong>
            while fetching book
            {bookName}
            .
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else {
        let book = await rawResponse.json();
        book = _.merge(_.cloneDeep(emptyBook), book);
        this.setState({ book });
      }
    })();
  }

  fetchBooks = () => {
    (async () => {
      const rawResponse = await fetch('/api/books/', {
        method: 'GET',
        headers: { Accept: 'application/json', }
      });
      if (rawResponse.status >= 400) {
        const message = (
          <div>
            <strong>Something went wrong! </strong>
            while fetching books.
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else {
        const books = await rawResponse.json();
        this.setState({ books });
      }
    })();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = document.getElementById('book-form');
    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    if (isValid) {
      this.postBook();
    }
  }

  postBook = () => {
    const { book } = this.state;
    (async () => {
      const rawResponse = await fetch(`/api/books/${book._id || ''}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
      if (rawResponse.status >= 500) {
        const message = (
          <div>
            <strong>Something went wrong! </strong>
            while adding/updating book.
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else if (rawResponse.status >= 400) {
        const res = await rawResponse.json();
        const message = (
          <div>
            <strong>Can&#39;t add/update book! </strong>
            <div style={{ fontSize: '13px' }}>
              {res.message}
              .
            </div>
          </div>
        );
        this.setState({ alert: { message, type: 'danger' } });
      } else {
        this.setState({ book: _.cloneDeep(emptyBook), alert: { message: 'Book is added/updated successfully.', type: 'success' } },
          () => {
            const { history } = this.props;
            history.push('/books');
            this.fetchBooks();
            document.getElementById('book-form').classList.remove('was-validated');
          });
      }
    })();
  }

  handleChange = (event) => {
    const value = event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value;
    const book = _.set(this.state, event.target.name, value);
    this.setState(book);
  }

  dismissAlert = () => {
    setTimeout(() => this.setState({ alert: {} }), 1000);
  }

  render = () => {
    const { book, alert, books } = this.state;
    return (
      <div className="container books-page">
        <Helmet>
          <title>Books</title>
          <meta name="description" content="Manager books" />
        </Helmet>
        <div className="row justify-content-start">
          {alert.message ? <Alert {...alert} dismiss={this.dismissAlert} /> : ''}
        </div>
        <div className="row justify-content-start">
          <form className="col col-md-12" onSubmit={this.handleSubmit} id="book-form" noValidate>
            <div className="form-group">
              <label htmlFor="name">Book name</label>
              <input value={book.name} onChange={this.handleChange} required type="text" className="form-control" id="name" name="book.name" placeholder="Lorem Ipsum" />
              <div className="invalid-feedback">
                Please provide book name.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pages">Number of pages</label>
              <input value={book.pages} onChange={this.handleChange} required min="1" step="1" type="number" className="form-control" id="pages" name="book.pages" />
              <div className="invalid-feedback">
                Please provide number of pages.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="row justify-content-start">
          <div className="col col-md-12 pt-5">
            <BookList books={books} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BooksPage);
