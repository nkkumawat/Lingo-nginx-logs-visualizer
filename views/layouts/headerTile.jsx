var React = require('react');

function HeaderTilelayout(props) {
  return (
    <div className="page-hero-section bg-image hero-home-1 background-head" >
      <div className="hero-caption pt-5">
        <div className="container h-100">
          <div className="row align-items-center h-100">
            <div className="col-lg-6 wow fadeInUp">
              {/* <div className="badge mb-2">
                <span className="icon mr-1">
                  <span className="mai-globe">nk</span>
                </span> 
              #2 Editor Choice App of 2020</div> */}
              <h1 className="mb-4">Manage your Logs easier</h1>
              <p className="mb-4"> make it simple searching, analyzing your logs. You will spend less time debugging and more time shipping new awesome features</p>
              {/* <a href="#" className="btn btn-primary rounded-pill">Get App Now</a> */}
            </div>
            <div className="col-lg-6 d-none d-lg-block wow zoomIn">
              <div className="img-place mobile-preview shadow floating-animate">
                <img src="/img/app_preview_1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = HeaderTilelayout;


