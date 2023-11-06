
export const generateId = (existingIds: string[]): string => {
  const id = Math.random().toString(36).substring(2, 9);
  if (existingIds.includes(id)) {
    return generateId(existingIds);
  }
  return id;
}
