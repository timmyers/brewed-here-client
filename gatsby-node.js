const path = require('path'); 

exports.modifyWebpackConfig = function ({ config, env }) {
  config.merge({
    resolve: {
      alias: {
        Components: path.resolve(__dirname, 'src/components/'),
        Images: path.resolve(__dirname, 'src/images/'),
      }
    }
  });
  return config;
}