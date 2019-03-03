export default function getUser() {
  const storedUser = localStorage.getItem('authData');
  if (!storedUser) return null;
  return JSON.parse(storedUser);
}