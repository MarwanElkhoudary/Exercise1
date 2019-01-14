const handlers = require ('./handler');
const checkAuth = require ('./cookieAndAuth');

const router = (request, response) => {
    const endpoint = request.url;
    const method = request.method;

    if (endpoint == "/" && method == "GET") {
       handlers.getHome("home", request, response);
  } else if (endpoint.includes("home") && method == "GET") {
       handlers.getHome("static", request, response);
  } else if (endpoint == "/signup" && method == "GET") {
    handlers.getPublicPages("signup", request, response);
  } else if (
    (endpoint.includes("public/login") ||
      endpoint.includes("public/signup") ||
      endpoint.includes("public/scripts")) &&
    method == "GET"
  ) {
    handlers.getPublicPages("static", request, response);
  } else if (endpoint == "/signup" && method == "POST") {
    handlers.postSignup(request, response);
  }
};

module.exports = router;