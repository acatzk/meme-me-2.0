export const extractUsernameFromPath = (pathname: string): string => {
  const match = pathname.match(/\/@([^/]+)/)
  return match ? match[1] : ''
}
