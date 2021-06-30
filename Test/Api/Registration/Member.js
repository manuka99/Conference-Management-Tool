const { expect } = require("chai");
const request = require("supertest");
const app = require("../../../app");
const {
  connect,
  close,
  clearDatabase,
} = require("../../../Startups/Database/index");

describe("POST /public/auth/register", () => {
  /**
   * Connect to a new in-memory database before running any tests.
   */
  before((done) => {
    connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  /**
   * Remove and close the db and server.
   */
  after((done) => {
    close()
      .then(() => done())
      .catch((err) => done(err));
  });

  /**
   * Clear all test data after every test.
   */
  beforeEach((done) => {
    clearDatabase()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("Registering as a attendee works", (done) => {
    request(app)
      .post("/api/public/register")
      .send(validAttendee)
      .then((res) => {
        const { user, token } = res.body.data;
        expect(user).to.contain.property("_id");
        expect(token).to.not.be.empty;
        expect(user).to.contain.property("password", null);
        done();
      })
      .catch((err) => done(err));
  });

  it("Attendee requires payment", (done) => {
    request(app)
      .post("/api/public/register")
      .send({ ...validAttendee, payment: null })
      .then((res) => {
        const { params } = res.body.data;
        expect(params).to.have.property("payment");
        expect(params).to.have.property("email");
        done();
      })
      .catch((err) => done(err));
  });

  it("Innovator requires submission and payment", (done) => {
    request(app)
      .post("/api/public/register")
      .send(inValidInnovator)
      .then((res) => {
        const { params } = res.body.data;
        expect(params).to.have.property("payment");
        expect(params).to.have.property("file");
        expect(params).to.have.property("email");
        done();
      })
      .catch((err) => done(err));
  });

  it("Researcher requires submission", (done) => {
    request(app)
      .post("/api/public/register")
      .send(inValidResearcher)
      .then((res) => {
        const { params } = res.body.data;
        expect(params).to.have.property("file");
        expect(params).to.have.property("email");
        done();
      })
      .catch((err) => done(err));
  });

  it("Presenter requires submission", (done) => {
    request(app)
      .post("/api/public/register")
      .send(inValidPresenter)
      .then((res) => {
        const { params } = res.body.data;
        expect(params).to.have.property("file");
        expect(params).to.have.property("email");
        done();
      })
      .catch((err) => done(err));
  });
});

const member = {
  firstName: "test fname",
  lastName: "test lname",
  phone: "0775588963",
  email: "test@gmail.com",
  date_of_birth: "2021-06-30",
  address: "test address",
  password: "123456789",
  confirm_password: "123456789",
  role: "MEMBER",
};

const validAttendee = {
  ...member,
  payment: "testPayID",
  sub_role: "ATTENDEE",
};

const inValidInnovator = {
  ...member,
  sub_role: "INNOVATOR",
};

const inValidResearcher = {
  ...member,
  sub_role: "RESEARCHER",
};

const inValidPresenter = {
  ...member,
  sub_role: "PRESENTER",
};
