const CORRECT_PASSCODE = "0127";
let enteredPasscode = "";

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    // 12-hour format styling
    hours = hours % 12 || 12;
    const timeString = `${hours}:${minutes}`;

    document.querySelectorAll('.time-display, .home-time, #current-time').forEach(el => {
        el.innerText = timeString;
    });

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.innerText = dateString;
    }
}

setInterval(updateClock, 1000);
updateClock();

function pressKey(num) {
    if (enteredPasscode.length < 4) {
        enteredPasscode += num.toString();
        updatePasscodeDots();
        
        if (enteredPasscode.length === 4) {
            setTimeout(checkPasscode, 200);
        }
    }
}

function deleteKey() {
    enteredPasscode = enteredPasscode.slice(0, -1);
    updatePasscodeDots();
}

function updatePasscodeDots() {
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (i < enteredPasscode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    }
}

function checkPasscode() {
    if (enteredPasscode === CORRECT_PASSCODE) {
        unlockPhone();
    } else {
        // Shake or reset on wrong code
        setTimeout(() => {
            enteredPasscode = "";
            updatePasscodeDots();
        }, 300);
    }
}

function unlockPhone() {
    document.getElementById('lock-screen').classList.remove('active');
    document.getElementById('home-screen').classList.add('active');
    enteredPasscode = "";
    updatePasscodeDots();
}

function goHome() {
    document.querySelectorAll('.app-container').forEach(app => {
        app.style.display = 'none';
    });
    document.getElementById('home-screen').classList.add('active');
}

function openApp(appName) {
    const appElement = document.getElementById(`app-${appName}`);
    if (appElement) {
        appElement.style.display = 'flex';
    }
}

function closeApp() {
    document.querySelectorAll('.app-container').forEach(app => {
        app.style.display = 'none';
    });
}

function openChat(chatId) {
    const chatElement = document.getElementById(`chat-${chatId}`);
    if (chatElement) {
        chatElement.style.display = 'flex';
    }
}

function closeChat() {
    document.querySelectorAll('.app-container.sub-app').forEach(chat => {
        chat.style.display = 'none';
    });
}