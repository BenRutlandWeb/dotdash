function stepDown(target) {
  if (target.disabled || target.readOnly) return;
  target.stepDown();
}

function stepUp(target) {
  if (target.disabled || target.readOnly) return;
  target.stepUp();
}

function input() {
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("command", ({ command, target, source }) => {
      if (command === "--clear-input") {
        target.value = "";
        target.focus();

        source.hidden = true;
      }
    });
  });
  document.querySelectorAll('[command="--clear-input"]').forEach((invoker) => {
    const input = invoker.commandForElement;

    function setInvokerState(value) {
      invoker.hidden = value;
    }

    setInvokerState(!input.value);

    input.addEventListener("input", ({ target }) =>
      setInvokerState(!target.value),
    );
  });
}

function inputPassword() {
  document.querySelectorAll('input[type="password"]').forEach((number) => {
    number.addEventListener("command", ({ command, target }) => {
      if (command === "--toggle-visibility") {
        const isVisible = target.type === "text";

        target.type = isVisible ? "password" : "text";
        target.focus();

        source.setAttribute("aria-pressed", String(!isVisible));
      }
    });
  });
}

function inputNumber() {
  document.querySelectorAll('input[type="number"]').forEach((number) => {
    number.addEventListener("command", ({ command, target }) => {
      switch (command) {
        case "--step-down":
          stepDown(target);
          break;
        case "--step-up":
          stepUp(target);
          break;
      }
    });
  });
}

export { input, inputNumber, inputPassword };
