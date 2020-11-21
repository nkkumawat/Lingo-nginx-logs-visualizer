var React = require("react");
function FeatureLayout(props) {
  return (
    <div className="page-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 py-3">
            <div className="img-place mobile-preview shadow wow zoomIn">
              {/* style="visibility: visible; animation-name: zoomIn;" */}
              <img src="/img/app_preview_2.png" alt="" />
            </div>
          </div>
          <div className="col-lg-6 py-3 mt-lg-5">
            <div className="iconic-list">
              <div className="iconic-item wow fadeInUp">
                <div className="iconic-md iconic-text bg-warning fg-white rounded-circle">
                  {/* style="visibility: visible; animation-name: fadeInUp;" */}
                  <span className="mai-cube"></span>
                </div>
                <div className="iconic-content">
                  <h5>Powerful Filters</h5>
                  <p className="fs-small">
                    Instantly create understandable statistics from your logs.
                    This offers the possibility of graphing and visualizing your
                    data very easily.
                  </p>
                </div>
              </div>
              <div className="iconic-item wow fadeInUp">
                {/* style="visibility: visible; animation-name: fadeInUp;" */}
                <div className="iconic-md iconic-text bg-info fg-white rounded-circle">
                  <span className="mai-shield"></span>
                </div>
                <div className="iconic-content">
                  <h5>Fully Secured</h5>
                  <p className="fs-small">Your data is secured with us.</p>
                </div>
              </div>
              <div className="iconic-item wow fadeInUp">
                {/* style="visibility: visible; animation-name: fadeInUp;" */}
                <div className="iconic-md iconic-text bg-indigo fg-white rounded-circle">
                  <span className="mai-desktop-outline"></span>
                </div>
                <div className="iconic-content">
                  <h5>Easy Monitoring</h5>
                  <p className="fs-small">
                    Instantly create understandable statistics from your logs.
                    This offers the possibility of graphing and visualizing your
                    data very easily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = FeatureLayout;
