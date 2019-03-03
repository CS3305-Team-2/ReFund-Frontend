export default function toggleModal (modalType) {
  console.log('togglemodal', this);
  const bodyClass = document.body.className;
  if (bodyClass.includes(' modal-open')) {
    document.body.className = bodyClass.replace(' modal-open', '');
    this.setState({[modalType]: false });
  } else {
    document.body.className += ' modal-open';
    this.setState({[modalType]: true});
  }
}
