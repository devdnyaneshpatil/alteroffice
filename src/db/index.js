const mongoose = require("mongoose");

class DatabaseConnector {
  constructor() {
    this.MONGO_DB_URI = process.env.MONGO_DB_URI;
    this.MONGO_RETRY_COUNT = 0;
    this.MONGO_RETRY_LIMIT = 3;
    this.RETRY_TIMEOUT = 5 * 1000; // 5 seconds
  }

  handleDBConnectionError(db, error) {
    switch (db) {
      case "mongo":
        if (this.MONGO_RETRY_COUNT < this.MONGO_RETRY_LIMIT) {
          console.error("MongoDB connection error", error);
          this.MONGO_RETRY_COUNT += 1;
          setTimeout(() => {
            console.info("Retrying...");
            this.connectToMongo();
          }, this.RETRY_TIMEOUT);
        } else {
          console.error("MongoDB connection error", error);
          console.info("Retry Limit Exceeded. Terminating process");
          process.exit(0);
        }
        break;

      default:
        break;
    }
  }

  async connectToMongo() {
    try {
      mongoose
        .connect(this.MONGO_DB_URI)
        .catch((error) => this.handleDBConnectionError("mongo", error));
      mongoose.connection
        .on("open", () => console.log("Connected to MongoDB"))
        .on("close", () => console.log("Disconnected from Mongo"));
    } catch (error) {
      this.handleDBConnectionError("mongo", error);
    }
  }
}

const db = new DatabaseConnector();

module.exports = db;
