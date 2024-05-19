const fs = require('fs');
const path = require('path');

const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, 'data.json'));
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
};

const sendErrorResponse = (error, res) => {
  const errorObj = { statusCode: error.statusCode || 500, error: error.message }
  res.status(errorObj.statusCode)
      .send({
          success: false,
          error: errorObj.error || error,
          errorCode: error.message || error.name || error
      })
}
const customResponse = (statusCode, data, res) =>{
      res.statusCode = statusCode
      res.send({
          success: true,
          data: data
      })
}

module.exports = {
    customResponse,
    sendErrorResponse,
    readData,
    writeData
}