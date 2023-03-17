import { OAuth2Client } from 'google-auth-library'

export default class googleAuth {

// Set up OAuth2 client
static client = new OAuth2Client({
    clientId: process.env.Google_Client_ID,
    clientSecret: process.env.Google_Client_SECRET,
    redirectUri: process.env.Google_Client_REDIRECTURI,
  });

static generateAuthUrl(){
    const authUrl = this.client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/gmail.send"],
      });
      return authUrl;
}

static async generateAccessToken(code){
    const { tokens } = await this.client.getToken(code);
    this.client.setCredentials(tokens);
    console.log("Authorization successful!")
    return {'access_token' : `Bearer ${tokens.access_token}`, 'refresh_token' : `Bearer ${tokens.refresh_token}` };
}

static async refreshAccessToken(refreshToken){
    this.client.setCredentials({ refresh_token: refreshToken });
    const tokens = await this.client.refreshAccessToken();
    return tokens.credentials.access_token
}



}