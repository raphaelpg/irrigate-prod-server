const SERVER = {
  port: process.env.PORT || 8080,
}

const MONGO = {
  uri: process.env.MONGO_URI!,
  dbName: process.env.MONGO_DB_NAME!,
  associationsCollection: process.env.MONGO_TEMPORARY_ASSOCIATIONS_COLLECTION!,
  contactMessagesCollection: process.env.MONGO_CONTACT_MESSAGES_COLLECTION!,
  usersCollection: process.env.MONGO_USERS_COLLECTION!,
}

const JWT = {
  jwtSecret: process.env.JWT_KEY!,
  expirationTimeInSeconds: 600,
}

const config = {
  server: SERVER,
  mongo: MONGO,
  jwt: JWT,
}

export default config;