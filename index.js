const refs = {
  daysFace: document.querySelector('span[data-value="days"]'),
  hoursFace: document.querySelector('span[data-value="hours"]'),
  minsFace: document.querySelector('span[data-value="mins"]'),
  secsFace: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = this.targetDate - currentTime;
      const time = this.getTimeComponents(timeDifference);
      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
}

function updateTimer({ days, hours, mins, secs }) {
  refs.daysFace.textContent = days;
  refs.hoursFace.textContent = hours;
  refs.minsFace.textContent = mins;
  refs.secsFace.textContent = secs;
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2021"),
  onTick: updateTimer,
});

timer.start();
