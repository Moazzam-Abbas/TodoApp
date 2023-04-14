import { container } from "../../Infrastructure/DI/container.js";
import NotificationService from "./notification.service.js";
import EmailNotifier from "../../Infrastructure/Notifiers/emailNotifier.js";
import { OAuth2Client } from 'google-auth-library'

function createNotificationService() {

    const notificationService = new NotificationService();
    notificationService.addObserver(container.resolve('emailNotifier'));
    notificationService.addObserver(container.resolve('slackNotifier'));
    return notificationService
}

export {createNotificationService}

