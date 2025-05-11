export const parseUrl = (baseUrl) => (req, res) => {
  const parsedUrl = new URL(req.url, baseUrl);
  const pathname = parsedUrl.pathname;

  const segments = pathname.split("/").filter(Boolean);

  const params = {};
  if (segments[0] === "api" && segments[1] === "users" && segments[2]) {
    params.userId = segments[2];
  }

  const queryParams = {};
  parsedUrl.searchParams.forEach((value, key) => (queryParams[key] = value));

  req.pathname = pathname;
  req.queryParams = queryParams;
  req.params = params; 
};
