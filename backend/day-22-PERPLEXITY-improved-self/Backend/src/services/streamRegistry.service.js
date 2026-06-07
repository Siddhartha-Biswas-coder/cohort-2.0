// Map to register and hold active AbortController objects by their socket IDs.
// Key: socketId (string) -> Value: AbortController instance

export const activeStreams = new Map()
