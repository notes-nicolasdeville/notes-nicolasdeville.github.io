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

// v2/3
// function copyToClipboard(code){
//     /*Duplicate code to dummy code block*/
//     let dummyCodeBlock = code.cloneNode(true);
//     const buttons = dummyCodeBlock.getElementsByTagName("button");
//     /*Remove buttons from dummy code block,
//     otherwise, the button's caption will be also copied*/
//     for(var i = 0; i < buttons.length; i++) {
//         dummyCodeBlock.removeChild(buttons[i]);
//     }
//     /*Copy text from dummy code block to clipboard*/
//     let codeText = dummyCodeBlock.innerText;
//     const dummyTextArea = document.createElement('textarea');
//     dummyTextArea.style.position = 'fixed';
//     dummyTextArea.style.left = '0';
//     dummyTextArea.style.top = '0';
//     dummyTextArea.style.opacity = '0';
//     dummyTextArea.value = codeText;
//     document.body.appendChild(dummyTextArea);
//     dummyTextArea.focus();
//     dummyTextArea.select();
//     document.execCommand('copy');
//     document.body.removeChild(dummyTextArea);
// };
// function showCopied(button) {
//     let originalCaption = button.innerText;
//     button.innerText = "Copied";
//     button.classList.remove("dpw-copy-btn-enabled");
//     button.classList.add("dpw-copy-btn-copied");
//     setTimeout(function () {
//         button.classList.remove('dpw-copy-btn-copied');
//         button.innerText = originalCaption;
//         button.classList.add('dpw-copy-btn-enabled');
//     },1000);
// };
// function copyButtonClick(button) {
//     copyToClipboard(button.parentElement);
//     showCopied(button);
// };

// <script type="text/javascript">
// window.addEventListener("load", function () {
//     /* List all example code blocks */
//     var codes = document.getElementsByClassName("highlight");
//     /* For each example code block */
//     for (var i = 0; i < codes.length; i++) {
//         var button = document.createElement("button");
//         button.className = "dpw-copy-btn dpw-copy-btn-enabled";
//         button.style.display = "none";
//         button.innerText = "Copy";
//         /* Add onclick handler to copy button */
//         button.addEventListener("click", function() {
//           copyToClipboard(this.parentElement);
//           showCopied(this);
//         });
//         code.appendChild(button);
//         /* show/hide copy buttion when mouse move over/out code block */
//         code.addEventListener("mouseover", function() {
//            button.style.display = "block";
//         });
//         code.addEventListener("mouseout", function() {
//            button.style.display = "none";
//         })
//     }
//   }, false);
// </script>

// v4

const svgCopy =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
const svgCheck =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';

const addCopyButtons = (clipboard) => {
    // 1. Look for pre > code elements in the DOM
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
      // 2. Create a button that will trigger a copy operation
      const button = document.createElement("button");
      button.className = "clipboard-button";
      button.type = "button";
      button.innerHTML = svgCopy;
      button.addEventListener("click", () => {
        clipboard.writeText(codeBlock.innerText).then(
          () => {
            button.blur();
            button.innerHTML = svgCheck;
            setTimeout(() => (button.innerHTML = svgCopy), 2000);
          },
          (error) => (button.innerHTML = "Error")
        );
      });
      // 3. Append the button directly before the pre tag
      const pre = codeBlock.parentNode;
      pre.parentNode.insertBefore(button, pre);
    });
  };

  if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
  } else {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js";
    script.integrity = "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=";
    script.crossOrigin = "anonymous";
    script.onload = () => addCopyButtons(clipboard);
    document.body.appendChild(script);
  }
  