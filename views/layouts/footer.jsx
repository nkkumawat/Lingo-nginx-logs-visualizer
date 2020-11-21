var React = require("react");
function FooterLayout(props) {
  return (
    <div className="page-footer-section bg-dark fg-white">
      <div className="container mb-5">
        <div className="row justify-content-center text-center wow fadeInUp">
          <div className="col-lg-8">
            <div className="text-center mb-3">
              <img src="/favicon-light.png" alt="" height="80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = FooterLayout;
