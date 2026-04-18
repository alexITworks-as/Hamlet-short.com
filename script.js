// Dialog and monologue content
const dialogs = {
    "dialog-1": `Ghost: "I am the spirit of your father, condemned to wander in the night..."
Hamlet: "Tell me, who committed this evil?"
Ghost: "Your uncle, the present king. Avenge me, but spare your mother."`,

    "dialog-2": `Hamlet: "Oh, if only this too solid flesh would melt..."
Hamlet: "The world seems to me exhausted, worn out, empty."`,

    "dialog-3": `Hamlet: "To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles..."`,

    "dialog-4": `Hamlet: "We shall play a scene resembling my father's death."
Horatio: "I will watch the king closely."
(During the play)
Claudius (rising): "Stop! Cease!"`,

    "dialog-5": `Hamlet: "A rat! A rat!"
(Thrusts his sword through the curtain)
Gertrude: "What have you done?"
Hamlet: "I thought it was the king."`,

    "dialog-6": `Ophelia: "Here is rosemary - this is for memory..."
(sings broken songs of death and betrayal)
Laertes: "Oh, my poor sister!"`,

    "dialog-7-funeral": `Laertes: "Oh, my golden sister!"
Hamlet: "Ophelia! I loved you more than life itself!"
(Soil is thrown on the coffin)
Horatio: "In dreams and in death she finds peace..."`,

    "dialog-8": `Laertes: "My sword is poisoned, and so is yours..."
Hamlet: "Poison! Then to the end!"
(They begin their duel)
Laertes and Hamlet exchange fierce blows.`,

    "dialog-9": `(Hamlet kills Claudius)
Hamlet: "Horatio, tell them my story..."
Hamlet falls
Horatio: "Now I regret my timid reserve!"
All falls silent in sorrow and emptiness.`,
};

// Elements
const panels = Array.from(document.querySelectorAll('.comic-panel'));
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSceneSpan = document.getElementById('currentScene');
const totalScenesSpan = document.getElementById('totalScenes');
const startStoryBtn = document.getElementById('startStoryBtn');

const dialogModal = document.getElementById('dialogModal');
const dialogText = document.getElementById('dialogText');
const dialogClose = document.getElementById('dialogClose');

let currentSceneIndex = 0; // 0-based

// Set total number of scenes
totalScenesSpan.textContent = panels.length.toString();

// Function to scroll to scene
function scrollToScene(index) {
    if (index < 0 || index >= panels.length) return;
    currentSceneIndex = index;
    const panel = panels[currentSceneIndex];
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    currentSceneSpan.textContent = (currentSceneIndex + 1).toString();
}

// Start story button
if (startStoryBtn) {
    startStoryBtn.addEventListener('click', () => {
        scrollToScene(0);
    });
}

// Navigation Next / Back
nextBtn.addEventListener('click', () => {
    if (currentSceneIndex < panels.length - 1) {
        scrollToScene(currentSceneIndex + 1);
    }
});

backBtn.addEventListener('click', () => {
    if (currentSceneIndex > 0) {
        scrollToScene(currentSceneIndex - 1);
    }
});

// Update current scene when scrolling
const sceneObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sceneNumber = parseInt(entry.target.dataset.scene, 10);
                currentSceneIndex = sceneNumber - 1;
                currentSceneSpan.textContent = sceneNumber.toString();
            }
        });
    },
    {
        threshold: 0.5,
    }
);

panels.forEach(panel => sceneObserver.observe(panel));

// Fade-in effect on scroll
const appearObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                appearObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

panels.forEach(panel => appearObserver.observe(panel));

// Open dialogs
document.querySelectorAll('.dialog-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const dialogId = btn.getAttribute('data-dialog');
        if (dialogId && dialogs[dialogId]) {
            dialogText.textContent = dialogs[dialogId];
            dialogModal.classList.add('active');
        }
    });
});

// Close modal window
dialogClose.addEventListener('click', () => {
    dialogModal.classList.remove('active');
});

dialogModal.addEventListener('click', (e) => {
    if (e.target === dialogModal) {
        dialogModal.classList.remove('active');
    }
});

// Arrow key navigation effect
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextBtn.click();
    } else if (e.key === 'ArrowLeft') {
        backBtn.click();
    } else if (e.key === 'Escape') {
        dialogModal.classList.remove('active');
    }
});
