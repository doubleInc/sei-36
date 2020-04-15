import restana from "restana";
import fs from "fs";
import queryParser from "connect-query";
import axios from "axios";

const service = restana();
service.use(queryParser());

service.get("/", async (req, res) => {
  await fs.readFile("./public/index.html", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });

  console.log("Page loaded...");
});

service.get("/book", async (req, res) => {
  const fetch = await axios(
    `https://www.googleapis.com/books/v1/volumes?q=title:${req.query.booktitle}`
  );

  const { items } = fetch.data;

  //volumeInfo.imageLinks.thumbnail

  res.send({ items });
});

service.start();
