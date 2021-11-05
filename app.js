const KM_TO_MI = 1.609344
Vue.createApp({
  data() {
    return {
      speed: 6.2,
      speedUnits: 'mph',
      paceUnits: 'min/km'
    }
  },
  methods: {
    increment() {
      this.speed += 0.1;
    },
    decrement() {
      this.speed -= 0.1;
    },
    setSpeedUnits(unit) {
      if (this.speedUnits !== unit) {
        switch (unit) {
          case 'mph': this.speed /= KM_TO_MI; break
          case 'km/h': this.speed *= KM_TO_MI; break
        }
        this.speedUnits = unit
      }
    },
    setPaceUnits(unit) {
      this.paceUnits = unit
    }
  },
  computed: {
    pace() {
      const kphSpeed = Math.round(10 * (this.speedUnits === 'km/h' ? this.speed : this.speed * KM_TO_MI)) / 10.0;
      switch (this.paceUnits) {
        case 'min/km': {
          let secs = (60 * 60) / kphSpeed
          return Math.floor(secs / 60) + "'" + Number(Math.floor(secs % 60)).toFixed(0).padStart(2, '0') + "\""
        }
        case 'min/mi': {
          let secs = (KM_TO_MI * 60 * 60) / kphSpeed
          return Math.floor(secs / 60) + "'" + Number(Math.floor(secs % 60)).toFixed(0).padStart(2, '0') + "\""
        }
        case '5k': {
          let secs = (5 * 60 * 60) / kphSpeed
          return Math.floor(secs / 60) + "'" + Number(Math.floor(secs % 60)).toFixed(0).padStart(2, '0') + "\""
        }
      }
    }
  }
}).mount('body')
