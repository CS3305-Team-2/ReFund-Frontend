export default function getUser() {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) return null;
  return JSON.parse(storedUser);
}