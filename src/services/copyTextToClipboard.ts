const copyTextToClipboard = async (text = '') => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (error) {
    console.error((error && error.message) || 'コピーに失敗しました')
  }
}

export default copyTextToClipboard
