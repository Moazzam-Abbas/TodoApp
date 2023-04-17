import { container } from "../../Infrastructure/DI/container.js";
import NotificationService from "./notification.service.js";

function createNotificationService() {
    const notificationService = new NotificationService();
    notificationService.addObserver(container.resolve('emailNotifier'));
    notificationService.addObserver(container.resolve('slackNotifier'));
    return notificationService
}

export {createNotificationService}

