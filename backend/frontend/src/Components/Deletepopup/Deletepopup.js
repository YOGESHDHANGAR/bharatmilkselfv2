const { Button, Modal, ModalHeader, ModalBody, ModalFooter } = Reactstrap;
// use v4 font awesome, easier on codepen

class DeleteModal extends React.Component {
  state = { isOpen: true };

  toggleModal = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div class="text-center">
        <h2>Example Delete Modal</h2>
        <Button color="danger" onClick={this.toggleModal}>
          Delete
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
          <ModalHeader className="text-center" toggle={this.toggleModal}>
            <div className="icon-box">
              <i className={`fa red-circle fa-trash`}></i>
            </div>
            <h2>Are you sure?</h2>
          </ModalHeader>
          <ModalBody>
            Do you really want to delete these records? This process cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>{" "}
            <Button color="danger" onClick={this.toggleModal}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<DeleteModal />, document.getElementById("app"));
