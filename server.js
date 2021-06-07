const express = require('express');
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const db = require("./models/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.json())

app.use(cors());

app.use(morgan("dev"));

db.sequelize.sync({
  //force: true,
});

require("./routes/user.routes")(app);
require("./routes/client.routes")(app);
require("./routes/task.routes")(app);
require("./routes/seance.routes")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server started on PORT ${PORT}...`)
)



