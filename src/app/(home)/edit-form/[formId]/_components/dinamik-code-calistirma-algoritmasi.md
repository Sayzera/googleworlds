function runCode(code) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  
    const iframeWindow = iframe.contentWindow;
    iframeWindow.eval(code);
  
    document.body.removeChild(iframe);
  }
  
  const userCode = "console.log('Hello from sandbox!');";
  runCode(userCode);