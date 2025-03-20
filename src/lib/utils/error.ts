export const getCatchErrorMessage = (
  error: unknown,
  defaultMsg: string = "Unknown error"
) => {
  return error instanceof Error ? error.message : defaultMsg;
};
