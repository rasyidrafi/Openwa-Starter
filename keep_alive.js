const http = require("http");
const PORT = process.env.PORT || 3618;

http
  .createServer(function(req, res) {
    res.write("I'm aliveoioi");
    res.end();
  })
  .listen(PORT, () => console.log(`server started on ${PORT}`));
