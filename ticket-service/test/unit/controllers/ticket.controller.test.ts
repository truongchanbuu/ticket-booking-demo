import app from "@/app";
import request from "supertest";

describe("POST /tickets", () => {
  it("should return 201 when ticket is created", async () => {
    const res = await request(app).post("/tickets").send({
      eventID: "e1",
      ticketName: "Standard",
      ticketDesc: "Basic",
      ticketType: "standard",
      basePrice: 100,
      count: 1,
      ticketDiscount: 0,
    });

    expect(res.status).toBe(201);
    expect(res.body[0]).toHaveProperty("ticketID", "t1");
  });

  it("should return 400 when missing required field", async () => {
    const res = await request(app).post("/tickets").send({
      ticketName: "Standard", // thiếu eventID
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it("should return 500 when service throws error", async () => {
    const res = await request(app).post("/tickets").send({
      eventID: "",
      ticketName: "Standard",
      ticketDesc: "desc",
      ticketType: "vip",
      basePrice: 100,
      count: 1,
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toMatch(/missing/i);
  });

  it("should return 400 when basePrice is not a number", async () => {
    const res = await request(app).post("/tickets").send({
      eventID: "e1",
      ticketName: "Standard",
      ticketDesc: "Basic",
      ticketType: "standard",
      basePrice: "abc",
      count: 1,
    });

    expect(res.status).toBe(400);
  });
});
