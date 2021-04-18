// connect plugins to the file
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: [autoprefixer, cssnano({ preset: "default" })],
};
