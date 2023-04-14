import * as dotenv from 'dotenv'
dotenv.config()
import INotifier from "../../Domain/Abstractions/INotifier.js";
import { google } from 'googleapis'

export default class EmailNotifier extends INotifier{

    constructor(googleOAuth2Client) {
        super()
        this.client = googleOAuth2Client;
        this.client.setCredentials({
            refresh_token: process.env.Google_Client_RefreshToken
        });
    }

    async notify(data) {
        // Send email notification
        const gmail = google.gmail({ version: "v1", auth: this.client });
        const {recipient, subject, body} = data;
        const message = `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
        const encodedMessage = Buffer.from(message)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
        const response = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: encodedMessage,
            },
        });
        if(response.status === 200) {
            console.log('Email dispatched for user registartion succesfully')
        }
    }
}

