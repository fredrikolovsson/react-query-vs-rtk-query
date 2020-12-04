import React from 'react'

export const useIsCloseToBottomOfPage = (
  distanceToBottomConsideredClose = 40
) => {
  const [isCloseToBottomOfPage, setIsCloseToBottomOfPage] = React.useState(
    false
  )

  React.useEffect(() => {
    const callback = () => {
      const scrollIsCloseToBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - distanceToBottomConsideredClose

      if (!isCloseToBottomOfPage && scrollIsCloseToBottom) {
        setIsCloseToBottomOfPage(true)
      } else if (isCloseToBottomOfPage && !scrollIsCloseToBottom) {
        setIsCloseToBottomOfPage(false)
      }
    }

    window.addEventListener('scroll', callback)

    return () => window.removeEventListener('scroll', callback)
  }, [distanceToBottomConsideredClose, isCloseToBottomOfPage])

  return isCloseToBottomOfPage
}
