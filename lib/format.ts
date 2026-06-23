export function shortenAddress(address?: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export function formatTimestamp(timestamp: bigint): string {
  // Solidity timestamps are seconds; JS Date expects milliseconds.
  const date = new Date(Number(timestamp) * 1000)
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
