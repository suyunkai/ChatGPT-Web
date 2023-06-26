import React from 'react';
import { notification } from 'antd';

type NotificationWrapperProps = {
  key: string | number;
  title: string;
  content: string;
};

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({ key, title, content }) => {
  React.useEffect(() => {
    notification.open({
      key,
      message: title,
      description: content,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }, [key, title, content]);

  return null;
};

export default NotificationWrapper;