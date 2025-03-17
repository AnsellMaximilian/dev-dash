export const getCatchErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : "Unknown error";
};
