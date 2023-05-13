// Import required modules
const express = require("express");
const ping = require("ping");

// Create an instance of the Express application
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// Define a route for pinging
app.get("/", (req, res) => {
  res.render("index", { result: null });
});

app.post("/ping", async (req, res) => {
  //   const host = req.params.host;
  const host = req.body.host;

  try {
    const response = await ping.promise.probe(host);

    // if (response.alive) {
    //   res.send(`${host} is alive`);
    // } else {
    //   res.send(`${host} is unreachable`);
    // }
    const result = response.alive
      ? `${host} is alive`
      : `${host} is unreachable`;
    res.render("index", { result });
  } catch (error) {
    // res.status(500).send("Error occurred while pinging the host");
    const result = "Error occurred while pinging the host";
    res.render("index", { result });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
