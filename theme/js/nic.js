const copyButtonLabel = "Copy";

// use a class selector if available
// let blocks = document.querySelectorAll("pre");
let blocks = document.querySelectorAll("highlight");

blocks.forEach((block) => {
  // only add a button if browser supports Clipboard API
    if (navigator.clipboard) {
    let button = document.createElement("copy_button");
    button.innerText = copyButtonLabel;
    button.addEventListener("click", copyCode);
    block.appendChild(button);
    }
});

async function copyCode(event) {
    const button = event.srcElement;
    const pre = button.parentElement;
    let code = pre.querySelector("code");
    let text = code.innerText;
    await navigator.clipboard.writeText(text);
}

// ### Feedback after clicking

button.innerText = "Copied";

setTimeout(()=> {
    button.innerText = copyButtonLabel;
},1000)
