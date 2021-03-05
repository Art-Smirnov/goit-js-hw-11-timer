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
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, mins, secs };
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

console.log(timer.start());
