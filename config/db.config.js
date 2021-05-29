module.exports = {
    URL : "postgres://postgres:saad@1996@localhost:5432/clubEquitation",
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "saad@1996",
    DB: "clubEquitation",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };