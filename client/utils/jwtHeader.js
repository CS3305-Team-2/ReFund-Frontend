import getCurrentUser from './getCurrentUser';

function jwtHeader() {
  let authData = localStorage.getItem('authData');
  if (!authData) return null;
  const token = JSON.parse(authData).token;
  return ({
    'JWT-TOKEN': token
  });
};

export default jwtHeader;