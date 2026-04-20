const helloBtn = document.getElementById("helloBtn");
const tipBtn = document.getElementById("tipBtn");
const echoBtn = document.getElementById("echoBtn");

const helloOut = document.getElementById("helloOut");
const tipOut = document.getElementById("tipOut");
const echoOut = document.getElementById("echoOut");
const echoInput = document.getElementById("echoInput");

async function safeFetch(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

helloBtn.addEventListener("click", async () => {
  helloOut.textContent = "Loading...";
  try {
    const data = await safeFetch("/api/hello");
    helloOut.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    helloOut.textContent = `Error: ${error.message}`;
  }
});

tipBtn.addEventListener("click", async () => {
  tipOut.textContent = "Loading...";
  try {
    const data = await safeFetch("/api/tip");
    tipOut.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    tipOut.textContent = `Error: ${error.message}`;
  }
});

echoBtn.addEventListener("click", async () => {
  echoOut.textContent = "Loading...";
  try {
    const data = await safeFetch("/api/echo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: echoInput.value })
    });
    echoOut.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    echoOut.textContent = `Error: ${error.message}`;
  }
});
