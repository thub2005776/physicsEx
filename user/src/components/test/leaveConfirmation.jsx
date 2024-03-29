import React from 'react';

const LeaveConfirmation = () => {
  const handleLeave = (e) => {
    const message = 'Bạn có chắc muốn rời khỏi trang này? Thay đổi của bạn có thể không được lưu.';
    e.returnValue = message;  // For modern browsers
    return message; // For older browsers
  };

  React.useEffect(() => {
    window.addEventListener('routeChangeStart', handleLeave);
    return () => {
      window.removeEventListener('routeChangeStart', handleLeave);
    };
  }, []);

  return null;
};

export default LeaveConfirmation;