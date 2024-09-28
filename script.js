let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let rateControl = document.getElementById("rate");
let pitchControl = document.getElementById("pitch");
let rateValue = document.getElementById("rate-value");
let pitchValue = document.getElementById("pitch-value");

// Load available voices
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Update speech rate and pitch
rateControl.addEventListener("input", () => {
    speech.rate = rateControl.value;
    rateValue.textContent = rateControl.value; // Update displayed value
});

pitchControl.addEventListener("input", () => {
    speech.pitch = pitchControl.value;
    pitchValue.textContent = pitchControl.value; // Update displayed value
});

// Listen button click event
document.querySelector("button").addEventListener("click", () => {
    const textArea = document.querySelector("textarea");
    if (textArea.value.trim() === "") {
        alert("Please enter some text before listening."); // Alert for empty text
        return;
    }
    
    speech.text = textArea.value;
    speech.rate = rateControl.value; // Set rate before speaking
    speech.pitch = pitchControl.value; // Set pitch before speaking
    window.speechSynthesis.speak(speech);
});
