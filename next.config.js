// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")([
  "@react-aria/focus",
  "@react-aria/interactions",
  "@react-aria/utils",
]);

module.exports = withTM({
  poweredByHeader: false,
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
});
