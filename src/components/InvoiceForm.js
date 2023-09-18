import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./InvoiceForm.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      creditType: "$",
      currentDate: "",
      invoiceNumber: 1,
      sender: "",
      senderLastName: "",
      senderPhone: "",
      Receiver: "",
      ReceiverEmail: "",
      receiverPhone: "",
      notes: "",
      amount: "",
      creditType: "",
      dateOfIssue: new Date().toISOString().split("T")[0],
      isSubmitted: false,
    };
    this.editField = this.editField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.downloadPdfFile = this.downloadPdfFile.bind(this);
  }
  editField = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  handleCreditTypeChange = event => {
    this.setState({ creditType: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitted: true });
  };

  downloadPdfFile = () => {
    html2canvas(document.getElementById("invoice-form")).then(canvas => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297); // A4 size: 210 x 297 mm
      pdf.save("invoice.pdf");
    });
  };

  render() {
    if (this.state.isSubmitted) {
      return (
        <div>
          <div id="invoice-form">
            <div className="submission_cer">
              <h1 className="submission_cer-h1">
                CERTIFICATE OF <br />
                <br />
                <span className="submission_cer-h1-span">APPRECIATION</span>
              </h1>

              <p className="submission_cer-award">
                This cretificate is awarded to{" "}
              </p>
              <p className="submission_vol">
                {this.state.Receiver}&nbsp;
                {this.state.ReceiverEmail}
              </p>
              <p className="submission-amount">
                {this.state.amount}&nbsp;
                {this.state.creditType}
              </p>
              <p className="submission-note">{this.state.notes}</p>
              <div className="submission-date">
                <p className="submission-date-1">{this.state.dateOfIssue}</p>
                <p className="submission-date-2">Date</p>
              </div>
              <div className="submission-send">
                <p className="submission-send_1">
                  {this.state.sender}&nbsp;
                  {this.state.senderLastName}
                </p>
                <p className="submission-send_2">Presented By</p>
              </div>
            </div>
          </div>
          <div className="btnDiv">
            <button onClick={this.downloadPdfFile} className="button">
              Download PDF
            </button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={12} md={8} lg={9}>
              <Card className="p-4 p-xl-5 my-3 my-xl-4 form">
                <h1>
                  CERTIFICATE OF <br />
                  <br />
                  <span>APPRECIATION</span>
                </h1>
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div class="d-flex flex-row align-items-center container container-1">
                    <div class="d-flex flex-row align-items-center left-element">
                      <span className="fw-bold d-block me-2">
                        Current&nbsp;Date:&nbsp;
                      </span>
                      <span className=" current-date ">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-center right-element">
                      <span className="fw-bold d-block me-2">Date:</span>
                      <Form.Control
                        type="date"
                        value={this.state.dateOfIssue}
                        name={"dateOfIssue"}
                        onChange={event => this.editField(event)}
                        style={{
                          maxWidth: "150px",
                        }}
                        required="required"
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-1" />
                <Row className="mb-1">
                  <Col>
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <Form.Label className="fw-bold">
                            Volunteer:
                          </Form.Label>
                          <Form.Control
                            placeholder={"First Name"}
                            rows={40}
                            value={this.state.Receiver}
                            type="text"
                            name="Receiver"
                            className="my-2"
                            onChange={event => this.editField(event)}
                            autoComplete="given-name"
                            required="required"
                          />
                          <Form.Control
                            placeholder={"Last Name"}
                            value={this.state.ReceiverEmail}
                            type="text"
                            name="ReceiverEmail"
                            className="my-2"
                            onChange={event => this.editField(event)}
                            autoComplete="family-name"
                            required="required"
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <hr className="my-1" />
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <Form.Label className="fw-bold">Notes:</Form.Label>
                      <Form.Control
                        placeholder="Thanks for your time!"
                        name="notes"
                        value={this.state.notes}
                        onChange={event => this.editField(event)}
                        as="textarea"
                        className="my-2"
                        rows={1}
                      />
                    </div>
                  </div>
                </div>
                <hr className="my-1" />
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-6">
                      <Col>
                        <Form.Label className="fw-bold">sender:</Form.Label>
                        <Form.Control
                          placeholder={"First Name"}
                          rows={2}
                          value={this.state.sender}
                          type="text"
                          name="sender"
                          className="my-2"
                          onChange={event => this.editField(event)}
                          autoComplete="given-name"
                          required="required"
                        />
                        <Form.Control
                          placeholder={"Last Name"}
                          value={this.state.senderLastName}
                          type="text"
                          name="senderLastName"
                          className="my-2"
                          onChange={event => this.editField(event)}
                          autoComplete="family-name"
                          required="required"
                        />
                      </Col>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={3} lg={3}>
              <div className="sticky-top pt-md-3 pt-xl-4">
                <Form.Group className="my-3">
                  <Form.Label className="fw-bold">Amount :</Form.Label>
                  <div>
                    <input
                      type="number"
                      placeholder="Amount"
                      id="amountNumber"
                      value={this.state.amount}
                      onChange={this.handleAmountChange}
                    ></input>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">
                    Preferred Credit type:
                  </Form.Label>
                  <Form.Select
                    onChange={this.handleCreditTypeChange}
                    className="btn btn-light my-1"
                    aria-label="Change Currency"
                    value={this.state.creditType}
                  >
                    <option>Hours</option>
                    <option>Days</option>
                    <option value="$">CAD (Canadian Dollar)</option>
                    <option value="$">USD (United States Dollar)</option>
                    <option value="€">EUR (Euro)</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="d-block w-100"
                >
                  Submit
                </Button>
                <br />
                <Button
                  variant="primary"
                  type="button"
                  className="d-block w-100"
                  onClick={this.resetForm}
                >
                  Cancle
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default InvoiceForm;
