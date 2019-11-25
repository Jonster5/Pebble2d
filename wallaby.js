module.exports = function (wallaby) {
  return {
    files: [
      'public/**/*.js',
      'public/*.js'
    ],

    tests: [
      'public/*.js'
    ]
    ...
  };
};
