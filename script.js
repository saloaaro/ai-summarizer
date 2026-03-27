async function summarize() {
  try {
    const text = document.getElementById("inputText").value;

    console.log("Sending text:", text);

    const res = await fetch("/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    console.log("Response:", res);

    const data = await res.json();
    console.log("Data:", data);

    document.getElementById("output").innerText = data.summary;
  } catch (error) {
    console.error("ERROR:", error);
  }
}
