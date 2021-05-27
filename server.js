const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json())

app.use(cors());

app.use(morgan("dev"));

db.sequelize.sync({
  //force: true,
});

require("./api/routes/user.routes")(app);
require("./api/routes/client.routes")(app);
require("./api/routes/task.routes")(app);
require("./api/routes/seance.routes")(app);

app.listen(process.env.PORT || 3000, () =>
    console.log('Server started ...')
)
