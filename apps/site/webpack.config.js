const { composePlugins, withNx } = require('@nx/webpack')
const { withReact } = require('@nx/react')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.ignoreWarnings = [/Failed to parse source map/]
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.resolve.fallback = {
    assert: require.resolve('assert/'),
    crypto: require.resolve('crypto-browserify'),
    buffer: require.resolve('buffer/'),
    path: require.resolve('path-browserify'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
    zlib: require.resolve('browserify-zlib'),
  }
  return config
})
