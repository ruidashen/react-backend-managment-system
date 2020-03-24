const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  // Only bundles what are imported(using babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true // Bundle all css files.
  }),

  // Change the variable in the source Less code
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA57A" }
  })
);
