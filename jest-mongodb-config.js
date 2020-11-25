module.exports = {
  mongodbMemoryServer: {
    version: 'latest',
  },
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.2.3',
      skipMD5: true,
    },
    autoStart: false,
  },
};
