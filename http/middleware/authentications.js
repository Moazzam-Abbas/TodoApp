import axios from 'axios'

function isAuthenticated (req, res, next) {
    if (req.session.user) next()
    else res.send("Please login first to access")
  }

async function authenticateOAuth2 (req, res, next) {

    const clientId = process.env.Google_Client_ID
    const token = req.headers.authorization.split(' ')[1];
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;
  
    try {
        const response = await axios.get(url);
        console.log("Full response "+JSON.stringify(response.data))
        const data = response.data;
        // Check if the token is still valid and the user is signed in
        if (data.aud === clientId && !data.error) {
          console.log('Token is valid successfully authenticated')
          next();
        } else {
          res.status(401).send('Invalid token kindly Login first');
        }
      } catch (error) {
        console.log(JSON.stringify(error.message))
        res.status(401).send("Invalid Token or Authentication Failure Kindly Login");
      }

}

export {authenticateOAuth2}