const mockUserTemplates = {
  mockUser: {
    email: "mock@mock.com",
    password: "mockPassword"
  },

  mockFakeEmailUser: {
    email: "notAnEmail",
    password: "mockPassword"
  },
  
  mockEmptyEmailUser: {
    email: "",
    password: "mockPassword"
  },
  
  mockEmptyPasswordUser: {
    email: "mock@mock.com",
    password: ""
  },
  
  mockShortPasswordUser: {
    email: "mock@mock.com",
    password: "a"
  },

  mockUser2: {
    email: "mock2@mock.com",
    password: "mockPassword"
  },
}

export default mockUserTemplates;