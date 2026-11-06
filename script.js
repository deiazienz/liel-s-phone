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

// Swipe-up & click unlock handlers
let startY = 0;
const lockScreen = document.getElementById('lock-screen');

if (lockScreen) {
    lockScreen.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });

    lockScreen.addEventListener('touchend', (e) => {
        let endY = e.changedTouches[0].clientY;
        // If dragged up by more than 50 pixels, unlock
        if (startY - endY > 50) {
            unlockPhone();
        }
    });

    // Fallback click/tap on lock screen (makes desktop testing easy)
    lockScreen.addEventListener('click', (e) => {
        // Only trigger if they didn't click the passcode keypad buttons
        if (!e.target.closest('.keypad') && !e.target.closest('.passcode-section')) {
            unlockPhone();
        }
    });
}

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
        if (dot) {
            if (i < enteredPasscode.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
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
    const lock = document.getElementById('lock-screen');
    const home = document.getElementById('home-screen');
    if (lock) lock.classList.remove('active');
    if (home) home.classList.add('active');
    enteredPasscode = "";
    updatePasscodeDots();
}

function goHome() {
    document.querySelectorAll('.app-container').forEach(app => {
        app.style.display = 'none';
    });
    const home = document.getElementById('home-screen');
    if (home) home.classList.add('active');
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