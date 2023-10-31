const request = require("supertest");
const app = require("../server/app");
const {Item} = require("../server/models/Item");
const { describe, test, expect } = require("@jest/globals");
const { db } = require("../server/db");
const {items} = require('../server/seedData');

describe("Inventory testing", () => {
  beforeEach(async () => {
    //await db.sync({ force: true });
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
    await seed();
  });


  //Get All/Single Item 

  describe("Get All Items", ()=>{

    it("successfully retrieves a list of items", async()=>{
      const allItems = await Item.findAll(); //Sequelize 
      const response = await  request(app).get('/api/items')
      const data = JSON.stringify(response.body)

      expect(response.statusCode).toBe(200);
      expect(data).toBe(JSON.stringify(allItems));

    })
  })
});
