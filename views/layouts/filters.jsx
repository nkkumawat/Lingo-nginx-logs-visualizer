var React = require('react');
function FilterLayout(props) {
  return (
    <>
      <form method="GET" id="filter-form" action={props.url}><br/><br/><br/>
        <div className="form-row">
          <div className="form-group col-md-2">
            <label for="ip-input" className="col-sm-2 col-form-label">Ip</label>
            <input type="text" className="form-control" name="ip-input" id="ip-input" placeholder="Ip" />
          </div>
          <div className="form-group col-md-2">
            <label for="endpoint-input" className="col-sm-2 col-form-label">Endpoint</label>
            <input type="text" className="form-control" id="endpoint-input" name="endpoint-input" placeholder="End Point" />
          </div>
          <div className="form-group col-md-2">
            <label for="order-select" className="col-sm-2 col-form-label">Order</label>
            <select id="order-select" name="order-select" className="form-control">            
              <option selected value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label for="date-input" className="col-sm-2 col-form-label">Date</label>
            <input type="date" id="date-input" name="date-input" className="form-control" />
          </div>
          <div className="form-group col-md-2">
            <label for="time-input" className="col-sm-2 col-form-label">Hour</label>
            <select id="time-input" name="time-input" className="form-control">            
              <option selected value="">--</option>
              <option value="00">00</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <button type="submit" id="submit-btn" className="btn btn-primary">Update</button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-sm12 col-md-6 col-lg-6">File Under View: <a target="_blank" href="/files/" >{props.fileName}</a> </div>
      </div>
    </>
  );
};

module.exports = FilterLayout;
