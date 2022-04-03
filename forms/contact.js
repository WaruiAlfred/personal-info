(function () {
  "use strict";

  let form = document.querySelector(".js-email-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let thisForm = this;

    thisForm.querySelector(".loading").classList.add("d-block");
    thisForm.querySelector(".error-message").classList.remove("d-block");
    thisForm.querySelector(".sent-message").classList.remove("d-block");

    // let formData = new FormData(thisForm);
    // console.log(formData);

    const sender = document.getElementById("name").value;
    const senderEmail = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.querySelector("textarea").value;
    console.log(process.env);
    sendEmail(sender, senderEmail, subject, message, thisForm);
  });

  function sendEmail(sender, senderEmail, subject, message, thisForm) {
    console.log(sender, senderEmail, subject, message);
    Email.send({
      SecureToken: "032a0444-8455-4f1a-87ca-1983d29f22d1",
      To: "alfredwarui17@gmail.com",
      From: senderEmail,
      Subject: subject,
      Body: `Sender: ${sender}
      Message: ${message}`,
    })
      // .then((message) => alert(message));
      .then((message) => {
        thisForm.querySelector(".loading").classList.remove("d-block");

        if (message.trim() == "OK") {
          thisForm.querySelector(".sent-message").classList.add("d-block");
          thisForm.reset();
        } else {
          throw new Error(message);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector(".loading").classList.remove("d-block");
    thisForm.querySelector(".error-message").innerHTML = error;
    thisForm.querySelector(".error-message").classList.add("d-block");
  }
})();
