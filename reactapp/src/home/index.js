import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'Components/loader';

const LoadableComponent = Loadable({
  loader: () => import('./home'),
  loading: Loading,
});

export default props => (
  <LoadableComponent {...props} />
);
