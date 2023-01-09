const getRequestData = (req) => {
 // Write logic here to read the request body data
 return new Promise((resolve, reject) => {
  let data = "";
  try {
    req.on('data', (chunk => {
      data += chunk.toString();
    }))
    req.on('end', () => {
      resolve(data);
    });
  } 
  catch(err) {
    reject(err);  
  }
 })
 
}

module.exports = getRequestData