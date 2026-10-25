import { input, inputNumber, inputPassword } from "./components/input.js";

input();
inputNumber();
inputPassword();

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

App.registerCommand("--copy-to-clipboard", async ({ target, source }) => {
  const content =
    target.value !== undefined ? target.value : target.textContent;

  await navigator.clipboard.writeText(content.trim());

  source.setAttribute("aria-pressed", true);

  setTimeout(() => {
    source.setAttribute("aria-pressed", false);
  }, 5000);
});
