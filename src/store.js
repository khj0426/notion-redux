class Store {
  constructor (initState) {
    this.subscribers = []

    this.state = new Proxy(initState, {
      set: (state, key, value) => {
        state[key] = value
        // 상태 변경을 알림
        this.notify()
        return true
      }
    })
  }

  subscribe (component) {
    this.subscribers.push(component)
  }

  notify () {
    this.subscribers.forEach((subscriber) => {
      subscriber.setState(this.state)
    })
  }
}

export default Store
