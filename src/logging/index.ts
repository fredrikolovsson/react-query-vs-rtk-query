export const logRequest = async (requestDescription: string) => {
  console.info(`log request to: ${requestDescription}`)
}

export const logError = async (message: string, error?: any) => {
  console.error(`log error: ${message}`, error)
}
