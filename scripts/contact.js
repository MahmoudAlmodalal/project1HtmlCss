const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const submitButton = contactForm.querySelector(".contact-submit");
  const status = contactForm.querySelector("[data-form-status]");
  const defaultButtonLabel = submitButton.innerHTML;

  const setStatus = (message, state) => {
    status.textContent = message;
    status.dataset.state = state;
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const honeypot = contactForm.elements.namedItem("_honey");
    if (honeypot && honeypot.value) {
      setStatus("Thanks — your message is on its way.", "success");
      contactForm.reset();
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
    setStatus("Sending your enquiry…", "loading");

    try {
      const response = await fetch("https://formsubmit.co/ajax/mahmoudAlmoudalal@gmail.com", {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to send the message.");
      }

      contactForm.reset();
      setStatus("Message sent. We’ll be in touch soon.", "success");
    } catch (error) {
      setStatus("Something went wrong. Please email us directly instead.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = defaultButtonLabel;
    }
  });
}
