const request = require("supertest");
const db = require("./db/connection");
const Restaurant = require("./models/Restaurant");
const app = require("./src/app");

beforeAll(async () => {
  await db.sync({ force: true });

  await Restaurant.bulkCreate([
    { name: "AppleBees", location: "Texas", cuisine: "FastFood" },
    { name: "LittleSheep", location: "Dallas", cuisine: "Hotpot" },
    { name: "Spice Grill", location: "Houston", cuisine: "Indian" },
  ]);
}, 15000);

afterAll(async () => {
  await db.close();
});

describe("/restaurant endpoint", () => {
  test("GET /restaurants", async () => {
    const response = await request(app).get("/restaurants");
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(200);
    expect(responseData.length).toBe(3);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "AppleBees", cuisine: "FastFood" }),
        expect.objectContaining({ name: "LittleSheep", cuisine: "Hotpot" }),
        expect.objectContaining({ name: "Spice Grill", cuisine: "Indian" }),
      ])
    );
  });

  test("GET /restaurants/:id", async () => {
    const response = await request(app).get("/restaurants/1");

    expect.arrayContaining([
      expect.objectContaining({ name: "AppleBees", cuisine: "FastFood" }),
    ]);
  });

  test("POST /restaurants server side validation", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "",
      location: "",
      cuisine: "",
    });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(400);
    expect(responseData.errors[0].msg).toBe("Invalid value");
    expect(responseData.errors[0].path).toBe("name");
    expect(responseData.errors[1].path).toBe("location");
    expect(responseData.errors[2].path).toBe("cuisine");
  });

  test("POST /restaurants", async () => {
    const response = await request(app).post("/restaurants").send({
      name: "Whata",
      location: "Dallas",
      cuisine: "burgers",
    });
    const responseData = JSON.parse(response.text);

    expect(responseData.name).toBe("Whata");
  });

  test("PUT /restaurants/:id", async () => {
    const response = await request(app).put("/restaurants/1").send({
      name: "Chipotle",
      location: "Dallas",
      cuisine: "burrito bowls",
    });
    const responseData = JSON.parse(response.text);

    expect(response.statusCode).toBe(201);
    expect(responseData.name).toBe("Chipotle");
  });

  test("DELETE /restaurants", async () => {
    const response = await request(app).delete("/restaurants/1");
    expect(response.statusCode).toBe(204);
  });
});
