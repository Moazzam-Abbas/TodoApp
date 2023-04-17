import * as dotenv from 'dotenv'
dotenv.config()
import INotifier from "../../Domain/Abstractions/INotifier.js";

export default class SlackNotifier extends INotifier{

    constructor(slackClient) {
        super()
        this.client = slackClient;
    }

    async notify(data) {
        this.client.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: data,
        });
        console.log('Slack notification dispatched for user registartion')
    }
}

