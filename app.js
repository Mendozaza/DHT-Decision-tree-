
const TREE = {
  text: "What do you want to decide?",
  options: [
    {
      label: "Technology choice",
      next: {
        text: "What matters most?",
        options: [
          {
            label: "Speed",
            next: { result: "Go with a lightweight, static solution." }
          },
          {
            label: "Flexibility",
            next: { result: "Use a modular framework later on." }
          }
        ]
      }
    },
    {
      label: "Process decision",
      next: {
        text: "Who is involved?",
        options: [
          {
            label: "Small team",
            next: { result: "Keep it informal and fast." }
          },
          {
            label: "Many stakeholders",
            next: { result: "Create a structured decision framework." }
          }
        ]
      }
    }
  ]
};

let history = [];
let current = TREE;

const q = document.getElementById("question");
const c = document.getElementById("choices");
const r = document.getElementById("result");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");

function render(node) {
  current = node;
  q.textContent = node.text || "Result";
  c.innerHTML = "";
  r.style.display = "none";

  backBtn.disabled = history.length === 0;

  if (node.result) {
    r.textContent = node.result;
    r.style.display = "block";
    return;
  }

  node.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = () => {
      history.push(node);
      render(opt.next);
    };
    c.appendChild(btn);
  });
}

backBtn.onclick = () => render(history.pop());
restartBtn.onclick = () => {
  history = [];
  render(TREE);
};

render(TREE);
