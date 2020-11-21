var React = require("react");

function SubHeaderTilelayout(props) {
  return (
    <div className="page-hero-section bg-image hero-mini sub-header-background">
      <div className="hero-caption">
        <div className="container fg-white ">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-6">
              <h3 className="mb-4 fw-medium">{props.titleText}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = SubHeaderTilelayout;
