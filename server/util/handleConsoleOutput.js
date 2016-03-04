var handleConsoleOutput = function (err, stdout) {
  if (err) {
    throw err;
    console.error(err);
  } else {
    console.log(stdout);
  }
};

module.exports = handleConsoleOutput;
