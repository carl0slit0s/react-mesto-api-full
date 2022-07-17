const allowedCors = [
  'localhost:3000',
  'https://project-mesto72.nomoredomains.xyz/',
  'http://project-mesto72.nomoredomains.xyz/',
  'http://api.project-mesto72.nomoredomains.xyz/',
  'http://api.project-mesto72.nomoredomains.xyz/',
];
module.exports.isCors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
