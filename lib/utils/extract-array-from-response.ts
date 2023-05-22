export const extractArrayFromResponse = <T>(response: { docs: T[]}): T[] => {
  return (response?.docs ?? []) as unknown as T[]
}