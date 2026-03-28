console.log("✅ JS LOADED");

async function summarize() {
  console.log("🟢 BUTTON CLICKED");

  const text = document.getElementById("inputText").value;
  const output = document.getElementById("output");

  if (!text) {
    alert("Kirjoita ensin teksti!");
    return;
  }

  // 🔄 Loading state
  output.innerText = "⏳ Tiivistetään...";

  try {
    const res = await fetch("/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    output.innerText = data.summary || "❌ Virhe: " + data.error;
  } catch (error) {
    console.error("❌ FETCH ERROR:", error);
    output.innerText = "❌ Yhteysvirhe";
  }
}
