import { notification } from 'antd';

type ToastType = 'success' | 'info' | 'warning' | 'error';
export const openNotificationWithIcon = (
    type: ToastType,
    message?: string,
    description?: string
) => {
    notification[type]({
        message,
        description,
    });
};
