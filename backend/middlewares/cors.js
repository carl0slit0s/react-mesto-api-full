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

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
};
