var React = require('react');
var DefaultLayout = require('./layouts/default');
var NavBarlayout = require('./layouts/navbar');
var HeaderTilelayout = require('./layouts/headerTile');
var FeatureLayout = require('./layouts/features');
var FooterLayout = require('./layouts/footer');
function IndexPage(props) {
  return (
    <DefaultLayout title={props.title}>
      <NavBarlayout></NavBarlayout>
      <HeaderTilelayout></HeaderTilelayout>
      <FeatureLayout></FeatureLayout>
      <FooterLayout></FooterLayout>
    </DefaultLayout>
  );
}

module.exports = IndexPage;