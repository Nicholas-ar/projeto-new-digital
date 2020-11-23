module.exports = {
  mongodbMemoryServer: {
    version: 'latest',
  },
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.1.1',
      skipMD5: true,
    },
    autoStart: false,
  },
};
