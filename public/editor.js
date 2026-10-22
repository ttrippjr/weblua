const submitButton = document.getElementById("submit");
const input = document.getElementById("input");
const output = document.getElementById("output");
const canvas = document.getElementById("canvas");

input.value = 
   `local msg = "Hello World!";
  \nlog(msg);`;

async function runLua() {
    const factory = new wasmoon.LuaFactory('/wasmoon/glue.wasm');
    const lua = await factory.createEngine();

    try {
        lua.global.set('sleep', (ms) => new Promise((resolve) => setTimeout(resolve, ms)))
        lua.global.set('log', (text) => {
            const newline = document.createElement("span");
            newline.innerText = text;
            output.prepend(newline);
        });

        await lua.doString(input.value);
    } catch (err) {
        message.innerText = "Error: " + err.message;
    } finally {
        lua.global.close();
    }
}

submitButton.addEventListener("click", (event)=>{
    runLua();
});
