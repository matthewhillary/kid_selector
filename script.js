document.addEventListener('DOMContentLoaded', function () {

    const children = ['Bella', 'Zach', 'Lucia', 'George'];
    const gridContainer = document.getElementById('grid');
    const resultDiv = document.getElementById('result');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    // Create child boxes
    children.forEach(child => {
        const box = document.createElement('div');
        box.className = 'child-box';
        box.textContent = child;
        box.onclick = () => toggleSelection(box);
        gridContainer.appendChild(box);
    });

    function toggleSelection(box) {
        box.classList.toggle('selected');
        playSound(440, 0.1); // Play a short beep
    }

    window.selectRandomChild = function () {
    const selectedChildren = Array.from(document.querySelectorAll('.child-box.selected')).map(box => box.textContent);

    if (selectedChildren.length < 2) {
    resultDiv.textContent = 'Please select at least two names.';
    return;
    }

        playSound(660, 0.3); // Play a longer and higher-pitched beep
        
        const randomIndex = Math.floor(Math.random() * selectedChildren.length);
        const selectedChild = selectedChildren[randomIndex];
        
        resultDiv.innerHTML = `<strong>${selectedChild}</strong>`;
    }
})