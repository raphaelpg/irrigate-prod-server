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
}

export default mockUserTemplates;