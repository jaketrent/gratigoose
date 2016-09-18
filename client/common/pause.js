export default function pause(delay) {
  return new Promise(resolve => {
    setTimeout(_ => {
      resolve()
    }, delay.millis)
  })
}
