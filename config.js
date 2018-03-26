const env = process.env;

const nodeEnv = module.exports = env.NODE_ENV || 'development';

const config = module.exports = {
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};

