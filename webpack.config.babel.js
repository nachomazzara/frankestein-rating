import webpack from 'webpack'
import path from 'path'

export default {
  context: __dirname + "/app",
  entry: [
      './index.js'
  ],
  output: {
      filename: 'rater.js',
      //filename: 'rater.min.js',
      path: path.join(__dirname, 'build'),
      publicPath: 'build'
  },
  module: {
      loaders: [
      { test: /\.js?$/, query: { /*plugins: ['lodash']*/ }, exclude: /node_modules/, loader: 'babel' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=/img/[name].[ext]' },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMap&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]', 'sass?sourceMap'] },
    ],
  },
  sassLoader: {
    data: '$env: ' + process.env.NODE_ENV + ';',
  },
  resolve: {
    root: path.resolve('./app'),
  },
  /*plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ]*/
};
