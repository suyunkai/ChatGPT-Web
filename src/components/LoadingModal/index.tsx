import React from 'react';
import { Modal, Spin } from 'antd';
import { SmileFilled } from '@ant-design/icons';

const LoadingModal = () => {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Spin indicator={<SmileFilled spin />} size="large" />
        <div style={{ marginTop: 16 }}>Loading...</div>
      </div>
    );
};

export default LoadingModal;