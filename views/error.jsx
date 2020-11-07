var React = require('react');
var util = require('util');
var DefaultLayout = require('./layouts/default');

function ErrorPage(props) {
  return (
    <DefaultLayout>
      {util.inspect(props.error)}
    </DefaultLayout>
  );
}

module.exports = ErrorPage;