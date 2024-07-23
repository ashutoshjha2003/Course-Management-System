import React from 'react';

const Footer = () => {
  // Inline CSS styles for the footer
  const footerStyle = {
    backgroundColor: '#282c34',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    // position: '',
    bottom: 0,
    width: '100%',
  };

  return (
    <footer style={footerStyle}>
      <p>© 2024 Course Management System</p>
      <p>Made By: </p>
      <p>Arghya Ghosh</p>
      <p>Ashutosh Kumar Jha </p>
      <p>Arpita Kar</p>
      <p>Deedhiti Dingal</p>
    </footer>
  );
};

export default Footer;