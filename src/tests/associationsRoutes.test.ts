import request from 'supertest';
import app from '../app';
import mockAssociationTemplates from '../mocks/mockAssociation';

describe("test associations routes", () => {

  test("GET /api/associations", (done) => {
    request(app)
      .get("/api/associations")
      .expect(200)
      .then(response => {
        expect(response.body.msg).toEqual("Associations retrieved successfully");
      })
    done();
  });

  test("POST /api/association/add Should reject if input not a string", async (done) => {
    await request(app)
      .post("/api/association/add")
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Request field must be a string");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/add Should reject if input is empty", async (done) => {
    await request(app)
      .post("/api/association/add")
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Requested field can't be empty");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/add Should reject if invalid email", async (done) => {
    await request(app)
      .post("/api/association/add")
      .send(mockAssociationTemplates.mockAssociationFakeEmail)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Invalid email input");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/add", async (done) => {
    await request(app)
      .post("/api/association/add")
      .send(mockAssociationTemplates.mockAssociation)
      .expect(201);

    request(app)
      .get("/api/associations")
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).toEqual(mockAssociationTemplates.mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/update Should reject if input not a string", async (done) => {
    await request(app)
      .patch("/api/association/update")
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Request field must be a string");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/update Should reject if input is empty", async (done) => {
    await request(app)
      .patch("/api/association/update")
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Requested field can't be empty");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/update", (done) => {
    request(app)
      .patch("/api/association/update")
      .send({ name: mockAssociationTemplates.mockAssociation.name, continent: "Worldwide", country: "Worldwide" })
      .expect(200)
      .then(() => {
        done();
      });
  });

  test("POST /api/association/delete Should reject if input not a string", async (done) => {
    await request(app)
      .delete("/api/association/delete")
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Request field must be a string");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/delete Should reject if input is empty", async (done) => {
    await request(app)
      .delete("/api/association/delete")
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Requested field can't be empty");
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/association/delete", async (done) => {
    await request(app)
      .delete("/api/association/delete")
      .send({ name: mockAssociationTemplates.mockAssociation.name })
      .expect(200);

    request(app)
      .get("/api/associations")
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).not.toEqual(mockAssociationTemplates.mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });
});