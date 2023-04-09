import { container } from "../../http/DI/container.js";
import NotificationService from "./notification.service.js";
import EmailNotifier from "../../Infrastructure/Notifiers/emailNotifier.js";
import { OAuth2Client } from 'google-auth-library'

function createNotificationService() {

    const notificationService = new NotificationService();
    notificationService.addObserver(container.resolve('emailNotifier'));
    return notificationService
}

export {createNotificationService}

