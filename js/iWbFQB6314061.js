
    console.log("javascript is working....................")
    function applyParams({inputUrl}) {
      console.log(inputUrl)
      const inputUrlObj = new URL(inputUrl, window.location.origin);
      const currentPageParams = new URLSearchParams(window.location.search);
      const inputUrlParams = new URLSearchParams(inputUrlObj.search);
    
      // Iterate over all parameters in the current page's URL
      for (const [key, value] of currentPageParams) {
        // If the input URL does not already contain the parameter, add it
        if (!inputUrlParams.has(key)) {
          inputUrlParams.append(key, value);
        }
      }
    
      // Construct the final URL
      const finalUrl = inputUrlObj.origin + inputUrlObj.pathname + '?' + inputUrlParams.toString();
      console.log(finalUrl)
      return finalUrl;
    }

    const formatDate = (options = { slated: false, addDate: 0 }) => {
      const defaultOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    
      const today = new Date();
    
      if (options.slated) {
        const day = (today.getDate() + (options.addDate || 0)).toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
      }
    
      if(options.addDate){
        today.setDate(today.getDate()+options.addDate)
      }
      const formattedDate = today.toLocaleDateString(undefined, defaultOptions);
    
      return formattedDate;
    };
    
    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };
    function runDelayedFunctions(data) {
      document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
      if(data?.setDisplayed){
        localStorage.setItem(data?.setDisplayed, true);
      }
    }
  
    (function() {
      document.addEventListener('DOMContentLoaded', function () {
        document.addEventListener("keydown", function (e) {
          e.ctrlKey && e.preventDefault();
        }),
        (document.onkeydown = function (e) {
          if (123 == e.keyCode) return !1;
        }),
        document.addEventListener("contextmenu", (e) => e.preventDefault());
      });
    })();
    
    (function() {
      const accordionTitles = document.querySelectorAll(".atomicat-accordion-title");
      accordionTitles.forEach((title, index) => {
        title.addEventListener("click", () => {
          // Toggle the "active" class to open/close the accordion
          title.classList.toggle("atomicat-title-active");
          const accordionContent = title.nextElementSibling;
          const toggleSymbol = title.querySelector(".atomicat-accordion-toggle");
          title.childNodes[1].childNodes[0].classList.toggle('atomicat-hidden')
          title.childNodes[1].childNodes[1].classList.toggle('atomicat-hidden')
          accordionContent.classList.toggle("atomicat-content-inactive");
        });
      });
    })();
      (function() {
        const countdownList = [{"compKey":"15a5ddb9-8fbb-4bbc-bd1a-3a1f3aba1ffd","misc":{"items":[{"text":"1 dia","show":false},{"text":"Hours","show":false},{"text":"Minutes","show":false},{"show":false,"text":"Seconds"}],"tag":"div","countdownType":"evergreen","dateTime":"00:15","type":"countdown","labelTag":"span"}}];

        countdownList.forEach(function(countdown) {
          const countdownType = countdown.misc.countdownType;
          const dateTime = countdown.misc.dateTime;
          const compKey = countdown.compKey.slice(0, 7);
          const intervalName = 'atomicat_countdown_interval_' + compKey;

          window[intervalName] = setInterval(function updateCountdown() {
            let targetTime;
            if (countdownType === "evergreen") {
              const sessionStorageKey = 'atomicat_countdown_start_' + compKey;
              let countdownStart = sessionStorage.getItem(sessionStorageKey);
              if (!countdownStart) {
                countdownStart = new Date().getTime();
                sessionStorage.setItem(sessionStorageKey, countdownStart);
              }
              const [hours, minutes] = dateTime.split(":").map(Number);
              targetTime = new Date(parseInt(countdownStart));
              targetTime.setHours(targetTime.getHours() + hours);
              targetTime.setMinutes(targetTime.getMinutes() + minutes);
            } else if (countdownType === "due_date") {
              targetTime = new Date(dateTime);
            }

            const now = new Date();
            const distance = targetTime - now;

            if (distance <= 0) {
              clearInterval(window[intervalName]);
              const countdownContainer = document.querySelector('.atomicat-countdown-' + compKey);
              if(countdownContainer) {
                const countdownDigits = countdownContainer.querySelectorAll('.atomicat-countdown-digits');
                countdownDigits.forEach(digit => digit.textContent = '00');
              }
              return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownContainer = document.querySelector('.atomicat-countdown-' + compKey);
            if(countdownContainer) {
              if(countdownContainer.querySelector('.atomicat-countdown-days')){
                countdownContainer.querySelector('.atomicat-countdown-days').textContent = days < 10 ? `0${days}` : days;
              }
              if(countdownContainer.querySelector('.atomicat-countdown-hours')){
                countdownContainer.querySelector('.atomicat-countdown-hours').textContent = hours < 10 ? `0${hours}` : hours;
              }
              if(countdownContainer.querySelector('.atomicat-countdown-minutes')){
                countdownContainer.querySelector('.atomicat-countdown-minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
              }
              if(countdownContainer.querySelector('.atomicat-countdown-seconds')){
                countdownContainer.querySelector('.atomicat-countdown-seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
              }
            }
          }, 1000);
        });
    })();