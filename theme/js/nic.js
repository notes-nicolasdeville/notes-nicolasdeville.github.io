// const copyButtonLabel = "Copy";

// // use a class selector if available
// // let blocks = document.querySelectorAll("pre");
// let blocks = document.querySelectorAll("highlight");

// blocks.forEach((block) => {
//   // only add a button if browser supports Clipboard API
//     if (navigator.clipboard) {
//     let button = document.createElement("button");
//     button.innerText = copyButtonLabel;
//     button.addEventListener("click", copyCode);
//     block.appendChild(button);
//     }
// });

// async function copyCode(event) {
//     const button = event.srcElement;
//     const pre = button.parentElement;
//     let code = pre.querySelector("code");
//     let text = code.innerText;
//     await navigator.clipboard.writeText(text);
// }

// // ### Feedback after clicking

// button.innerText = "Copied";

// setTimeout(()=> {
//     button.innerText = copyButtonLabel;
// },1000)

function copyToClipboard(code){
    /*Duplicate code to dummy code block*/
    let dummyCodeBlock = code.cloneNode(true);
    const buttons = dummyCodeBlock.getElementsByTagName("button");
    /*Remove buttons from dummy code block,
    otherwise, the button's caption will be also copied*/
    for(var i = 0; i < buttons.length; i++) {
        dummyCodeBlock.removeChild(buttons[i]);
    }
    /*Copy text from dummy code block to clipboard*/
    let codeText = dummyCodeBlock.innerText;
    const dummyTextArea = document.createElement('textarea');
    dummyTextArea.style.position = 'fixed';
    dummyTextArea.style.left = '0';
    dummyTextArea.style.top = '0';
    dummyTextArea.style.opacity = '0';
    dummyTextArea.value = codeText;
    document.body.appendChild(dummyTextArea);
    dummyTextArea.focus();
    dummyTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(dummyTextArea);
};
function showCopied(button) {
    let originalCaption = button.innerText;
    button.innerText = "Copied";
    button.classList.remove("dpw-copy-btn-enabled");
    button.classList.add("dpw-copy-btn-copied");
    setTimeout(function () {
        button.classList.remove('dpw-copy-btn-copied');
        button.innerText = originalCaption;
        button.classList.add('dpw-copy-btn-enabled');
    },1000);
};
function copyButtonClick(button) {
    copyToClipboard(button.parentElement);
    showCopied(button);
};

<script type="text/javascript">
window.addEventListener("load", function () {
    /* List all example code blocks */
    var codes = document.getElementsByClassName("highlight");
    /* For each example code block */
    for (var i = 0; i < codes.length; i++) {
        var button = document.createElement("button");
        button.className = "dpw-copy-btn dpw-copy-btn-enabled";
        button.style.display = "none";
        button.innerText = "Copy";
        /* Add onclick handler to copy button */
        button.addEventListener("click", function() {
          copyToClipboard(this.parentElement);
          showCopied(this);
        });
        code.appendChild(button);
        /* show/hide copy buttion when mouse move over/out code block */
        code.addEventListener("mouseover", function() {
           button.style.display = "block";
        });
        code.addEventListener("mouseout", function() {
           button.style.display = "none";
        })
    }
  }, false);
</script>
