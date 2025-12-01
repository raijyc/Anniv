document.addEventListener("DOMContentLoaded", () => {
    // ====================
    // ELEMENTS
    // ====================
    const startBtn = document.getElementById("startBtn");
    const popup = document.getElementById("anniversary-popup");
    const submitBtn = document.getElementById("submitBtn");
    const cancelBtn = document.getElementById("cancelBtn");
  
    const mmInput = document.getElementById("mm");
    const ddInput = document.getElementById("dd");
    const yyyyInput = document.getElementById("yyyy");
  
    const locationPopup = document.getElementById("location-popup");
    const locationInput = document.getElementById("location-input");
    const locationSubmit = document.getElementById("location-submit");
    const locationCancel = document.getElementById("location-cancel");
  
    const card = document.querySelector(".card");
    const dashboard = document.getElementById("icon-dashboard");
  
    // ====================
    // CORRECT ANSWERS
    // ====================
    const correctDate = "12/02/2024";
    const correctLocation = "MOA ARENA";
  
    // ====================
    // OPEN ANNIVERSARY POPUP
    // ====================
    function openAnniversaryPrompt() {
      popup.style.display = "flex";
      popup.style.justifyContent = "center";
      popup.style.alignItems = "center";
      mmInput.focus();
    }
  
    // ====================
    // CLOSE ANY POPUP
    // ====================
    function closePopup(popupElement) {
      popupElement.style.display = "none";
    }
  
    // ====================
    // SUBMIT ANNIVERSARY DATE
    // ====================
    function submitAnniversary() {
      const mm = mmInput.value.trim().padStart(2, "0");
      const dd = ddInput.value.trim().padStart(2, "0");
      const yyyy = yyyyInput.value.trim();
      const enteredDate = `${mm}/${dd}/${yyyy}`;
  
      if (!mm || !dd || !yyyy) {
        alert("Please complete all boxes, mahal 💗");
        return;
      }
  
      if (enteredDate === correctDate) {
        closePopup(popup);
        locationPopup.style.display = "flex";
        locationInput.focus();
      } else {
        alert("Oops! That’s not the right date. Try again 💌");
        mmInput.value = "";
        ddInput.value = "";
        yyyyInput.value = "";
        mmInput.focus();
      }
    }
  
    // ====================
    // SUBMIT LOCATION
    // ====================
    function submitLocation() {
      const enteredLocation = locationInput.value.trim();
  
      if (!enteredLocation) {
        alert("Please type where we met 💖");
        locationInput.focus();
        return;
      }
  
      if (enteredLocation.toLowerCase() === correctLocation.toLowerCase()) {
        closePopup(locationPopup);
        card.style.display = "none";
        dashboard.style.display = "flex"; // show dashboard
  
      } else {
        alert("Hmm, that’s not right. Try again 💗");
        locationInput.value = "";
        locationInput.focus();
      }
    }
  
    // ====================
    // EVENT LISTENERS
    // ====================
    startBtn.addEventListener("click", openAnniversaryPrompt);
    submitBtn.addEventListener("click", submitAnniversary);
    cancelBtn.addEventListener("click", () => {
      closePopup(popup);
      card.style.display = "block";
    });
  
    locationSubmit.addEventListener("click", submitLocation);
    locationCancel.addEventListener("click", () => {
      closePopup(locationPopup);
      card.style.display = "block";
    });
  
    // ENTER key support
    [mmInput, ddInput, yyyyInput].forEach(input => {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") submitAnniversary();
      });
    });
  
    locationInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitLocation();
    });
  
    // ====================
    // MESSAGES
    // ====================
    const messages = [
      "Hi baby! Happy Anniversary! We've been in love for more than a year now...(mahal na kita bago pa maging tayo hehe xD)",
      "A year full of happiness and challenges, and my love for you has only grown stronger...",
      "Loving you is the easiest and best thing I have ever done... Falling in love with you was the easiest decision of my life.",
      "Please stay with me forever, mahal.. Let's spend every 2nd of December together.",
      "You are in for a lifetime ride with me, baby! I love you!",
      "Love, Rai <3"

    ];
  
    let currentMsgIndex = 0;
    let typing = false;
  
    function typeMessage(elementId, message, speed = 50) {
      if (typing) return;
      typing = true;
      const el = document.getElementById(elementId);
      el.textContent = "";
      let i = 0;
      function typeChar() {
        if (i < message.length) {
          el.textContent += message.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          typing = false;
        }
      }
      typeChar();
    }
  
    function showMessage(index) {
      typeMessage("message-text", messages[index]);
    }
  
    document.getElementById("next-msg").addEventListener("click", () => {
      if (currentMsgIndex < messages.length - 1) {
        currentMsgIndex++;
        showMessage(currentMsgIndex);
      }
    });
  
    document.getElementById("prev-msg").addEventListener("click", () => {
      if (currentMsgIndex > 0) {
        currentMsgIndex--;
        showMessage(currentMsgIndex);
      }
    });
  
    document.getElementById("message-icon").addEventListener("click", () => {
      dashboard.style.display = "none";
      document.getElementById("messages-screen").style.display = "block";
      currentMsgIndex = 0;
      showMessage(currentMsgIndex);
    });
  
    document.querySelector("#messages-screen .back-btn").addEventListener("click", () => {
      document.getElementById("messages-screen").style.display = "none";
      dashboard.style.display = "flex";
    });
  
    // ====================
    // MUSIC PLAYER
    // ====================
    const musicScreen = document.getElementById("music-screen");
    const spotifyList = document.getElementById("spotify-list");
    const spotifyPlayer = document.getElementById("spotify-player");
  
    document.getElementById("music-icon").addEventListener("click", () => {
      dashboard.style.display = "none";
      musicScreen.style.display = "block";
    });
  
    document.querySelector("#music-screen .back-btn").addEventListener("click", () => {
      musicScreen.style.display = "none";
      dashboard.style.display = "flex";
    });
  
    spotifyList.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", () => {
        const trackURL = item.getAttribute("data-spotify");
        spotifyPlayer.src = trackURL;
      });
    });
  
    // ====================
    // TIME SINCE ANNIVERSARY
    // ====================
    const timeIcon = document.getElementById("time-icon");
    const timeScreen = document.getElementById("time-screen");
    const timeSince = document.getElementById("time-since");
    let timeInterval;
  
    const anniversaryDate = new Date(1990, 0, 1); // January 1, 1990
  
    function updateTime() {
      const now = new Date();
      const diff = now - anniversaryDate;
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      timeSince.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  
    timeIcon.addEventListener("click", () => {
      dashboard.style.display = "none";
      timeScreen.style.display = "block";
      updateTime();
      timeInterval = setInterval(updateTime, 1000);
    });
  
    timeScreen.querySelector(".back-btn").addEventListener("click", () => {
      timeScreen.style.display = "none";
      dashboard.style.display = "flex";
      clearInterval(timeInterval);
    });
  
  });
  