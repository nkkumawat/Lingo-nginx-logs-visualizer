var React = require("react");

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="Mobile Application HTML5 Template" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="stylesheet" href="/css/maicons.css" />
        <link rel="stylesheet" href="/vendor/animate/animate.css" />
        <link
          rel="stylesheet"
          href="/vendor/owl-carousel/css/owl.carousel.min.css"
        />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/mobster.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <script src="/js/charts.min.js"></script>
      </head>
      <body>
        {props.children}
        <script src="/js/jquery-3.5.1.min.js"></script>
        <script src="/js/jquery.form.js"></script>
        <script src="/js/bootstrap.bundle.min.js"></script>
        <script src="/vendor/owl-carousel/js/owl.carousel.min.js"></script>
        <script src="/vendor/wow/wow.min.js"></script>
        <script src="/js/mobster.js"></script>
        <script src="/js/nginx.js"></script>
        <script src="/js/nginx4xx.js"></script>
      </body>
    </html>
  );
}

module.exports = DefaultLayout;
