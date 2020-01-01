const { addExternalBabelPlugins, babelInclude } = require("customize-cra");
const path = require('path');

const {
  override,
  // addDecoratorsLegacy,
  // disableEsLint,
  // addBundleVisualizer,
  // addWebpackAlias,
  // adjustWorkbox
} = require("customize-cra");

module.exports = override(
  ...addExternalBabelPlugins(
    "@babel/plugin-proposal-class-properties"
  ),
  babelInclude([
    path.resolve("src"),
    path.resolve("node_modules/terminal-in-react")
  ])
)
