const input = document.getElementById("wordInput");
const resultBox = document.getElementById("result");
const wordTitle = document.getElementById("wordTitle");
const definition = document.getElementById("definition");
const errorMsg = document.getElementById("error");
const audioPlayer = document.getElementById("audioPlayer");

input.focus();

input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const word = input.value.trim();
    if (!word) return;

    resultBox.classList.add("hidden");
    errorMsg.classList.add("hidden");
    errorMsg.textContent = "";
    audioPlayer.classList.add("hidden");
    audioPlayer.src = "";

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) throw new Error("Word not found.");

      const data = await res.json();
      const entry = data[0];
      const phonetics = entry.phonetics.find(p => p.audio && p.audio.trim() !== "");
      const meaning = entry.meanings[0].definitions[0].definition;

      wordTitle.textContent = entry.word;
      definition.textContent = meaning;

      if (phonetics) {
        audioPlayer.src = phonetics.audio;
        audioPlayer.classList.remove("hidden");
      }

      resultBox.classList.remove("hidden");
    } catch (error) {
      errorMsg.textContent = error.message || "Something went wrong.";
      errorMsg.classList.remove("hidden");
    }
  }
});
