export default function simpleAction(type, payload) {
  return (value) => {
    return {
      type,
      payload: value,
    }
  }
}