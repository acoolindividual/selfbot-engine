# selfbot-engine
engine for selfbots. pretty self explanatory, download the zip release and replace the values in config.json with your configuration.

## How to get token?
Using the browser version of Discord (since desktop has disabled this functionality in Electron), enter developer mode with Ctrl+Shift+I, then, under the "Console" tab, paste `javascript:document.getElementsByTagName("body")[0].innerHTML = localStorage.getItem("token");`. Copy the value (without quotes). This is the easy way, but if you're not willing to run code in console, other ways exist on [google](https://www.google.com/search?q=discord+get+token).