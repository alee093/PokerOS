export function getApiErrorMessage(
  error: any,
  fallbackMessage: string
): string {
  const response = error.response?.data;

  if (
    Array.isArray(
      response?.errors
    )
  ) {
    return response.errors
      .map(
        (item: {
          message: string;
        }) => item.message
      )
      .join(". ");
  }

  return (
    response?.message ??
    fallbackMessage
  );
}