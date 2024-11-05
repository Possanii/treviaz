export function sleep(delay: number = 5000) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
