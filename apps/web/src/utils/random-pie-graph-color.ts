export function randomGraphColor(min = 1, max = 5) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return `hsl(var(--chart-${Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)}))`
}
