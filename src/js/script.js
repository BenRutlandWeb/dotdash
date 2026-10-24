const App = new (class {
  commands = new Map();
  constructor() {
    this.el = document.documentElement;

    this.el.addEventListener(
      "command",
      (e) => {
        if (this.commands.has(e.command)) {
          this.commands.get(e.command).call(this, e);
        }
      },
      { capture: true },
    );

    /* Assign the root element to any invokers without a target */
    document
      .querySelectorAll("[command]:not([commandfor])")
      .forEach((invoker) => {
        invoker.commandForElement = this.el;
      });
  }
  registerCommand(command, callback) {
    this.commands.set(command, callback);
  }
})();

App.registerCommand("--change-theme", ({ target, source }) => {
  const isChecked = source.getAttribute("aria-checked") === "true";

  target.style.setProperty(
    "color-scheme",
    !isChecked ? "only dark" : "only light",
  );

  source.setAttribute("aria-checked", String(!isChecked));
});

App.registerCommand("--toggle-visibility", ({ target, source }) => {
  const isVisible = target.type === "text";

  target.type = isVisible ? "password" : "text";
  target.focus();

  source.setAttribute("aria-pressed", String(!isVisible));
});

App.registerCommand("--clear-input", ({ target, source }) => {
  target.value = "";
  target.focus();

  source.hidden = true;
});

App.registerCommand("--copy-to-clipboard", async ({ target, source }) => {
  const content =
    target.value !== undefined ? target.value : target.textContent;

  await navigator.clipboard.writeText(content.trim());

  source.setAttribute("aria-pressed", true);

  setTimeout(() => {
    source.setAttribute("aria-pressed", false);
  }, 5000);
});

document.querySelectorAll('[command="--clear-input"]').forEach((invoker) => {
  const search = invoker.commandForElement;

  function setInvokerState(value) {
    invoker.hidden = value;
  }

  setInvokerState(!search.value);

  search.addEventListener("input", ({ target }) =>
    setInvokerState(!target.value),
  );
});
