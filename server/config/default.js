module.exports = {
  host: 'localhost',
  port: 3030,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50,
  },
  database: {
    db: 'cook-scribe',
    host: (() => {
      return process.env.DB_HOST || 'localhost'
    })(),
    port: (() => {
      const port = process.env.DB_PORT && parseInt(process.env.DB_PORT)
      return port || 28015
    })(),
  },
  authentication: {
    entity: 'User',
    service: 'users',
    secret: 'DyAgWrWdLf0ndcv+eYAPhNuzBgs=',
    authStrategies: [
      'jwt',
      'local',
    ],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      usernameField: 'email',
      passwordField: 'password',
    },
  },
}
