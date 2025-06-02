import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './home.scss';

library.add(fab);

const PackageList = ({ dependencies, heading, className }) => {
  if (!dependencies) {
    return '';
  }
  const packages = Object.keys(dependencies).map(key => (
    <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
      {key}
      <span className="badge badge-primary badge-pill">{dependencies[key]}</span>
    </li>
  ));
  return (
    <div style={{ flexGrow: 2 }} className={className}>
      <h1 className="text-secondary">{heading}</h1>
      <ul className="list-group">
        {packages}
      </ul>
    </div>
  );
};

const Scripts = ({ scripts, className }) => {
  if (!scripts) {
    return '';
  }
  const scriptsList = Object.keys(scripts).map(key => (
    <div key={key} className="card">
      <div className="card-body">
        <h5 className="card-subtitle mb-2 text-muted">{key}</h5>
        <pre className="card-text">
          {scripts[key]}
        </pre>
      </div>
    </div>
  ));
  return (
    <div className={className}>
      <h1 className="text-secondary">Scripts</h1>
      {scriptsList}
    </div>
  );
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      packageJson: {}
    };
  }

  componentDidMount() {
    const { routeHeader } = this.props;
    routeHeader(<h2 className="mb-0">Sample single page application</h2>);
    fetch('/api/packages')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(data => this.setState({ packageJson: data }));
  }

  render() {
    const { packageJson } = this.state;
    return (
      <div className="container home-section">
        <div className="row justify-content-start">
          <div className="col col-sm-12">
            <p>
              This is sample SPA writtern using below packages.
              <a href="https://github.com/harikrishnapachava/microservices_code_repo">
                <FontAwesomeIcon size="lg" color="black" icon={['fab', 'github']} />
              </a>
            </p>
          </div>
          <Scripts className="col col-sm-12" scripts={packageJson.scripts} />
          <div className="mt-3 col col-sm-12 d-flex flex-wrap align-content-start">
            <PackageList dependencies={packageJson.dependencies} heading="Dependencies" />
            <PackageList className="devDependencies" dependencies={packageJson.devDependencies} heading="Dev Dependencies" />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
