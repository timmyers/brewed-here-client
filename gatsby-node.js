const path = require('path'); 

exports.modifyWebpackConfig = function ({ config, stage }) {
  config.merge({
    resolve: {
      alias: {
        Components: path.resolve(__dirname, 'src/components/'),
        Images: path.resolve(__dirname, 'src/images/'),
      }
    },
  });

  if(stage === "build-html") {
    config.loader("null", {
      test: /(mapbox-gl)\.js$/,
      loader: "null-loader",
    });
  }

  return config;
}