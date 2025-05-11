export const parseJson = (req, res) => {
  let statusCode = 200;

  res.status = (code) => {
    statusCode = code;
    return res;
  };

  res.json = (data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  res.send = (data) => {
    if (typeof data === 'object') {
      res.json(data);
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/plain" });
      res.end(String(data));
    }
  };
};
