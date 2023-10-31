const request = require("supertest");
const app = require("../server/app");
const Item = require("../server/models/Item");
const { describe, test, expect } = require("@jest/globals");
const { db } = require("../server/db");
const {items} = require('./seedData.js');

describe("Inventory testing", () => {
  beforeEach(async () => {
    await db.sync({ force: true });

    const seed = async () => {
      try {
        // drop and recreate tables per model definitions
        await db.sync({ force: true });

        // insert data
        await Promise.all(items.map((item) => Item.create(item)));

        console.log("db populated!");
      } catch (error) {
        console.error(error);
      }
    };

    seed();
  });
});
