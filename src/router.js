const handlers = require ('./handler');
const checkAuth = require ('./cookieAndAuth');

const router = (request, response) => {
    const endpoint = request.url;
    const method = request.method;

    if (endpoint == "/" && method == "GET") {
       handlers.getHome("home", request, response);
  } else if (endpoint.includes("home") && method == "GET") {
       handlers.getHome("static", request, response);
  }
};

module.exports = router;