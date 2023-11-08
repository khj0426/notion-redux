export default function EditorChildListTemplate (documents) {
  if (!(documents instanceof Array)) {
    return ''
  }
  return DOMPurify.sanitize(`
        <ul>
            ${documents
              .map((docs) => {
                return `<li><a href = "/documents/${docs.id}">${docs.title}</a></li>`
              })
              .join('')}
        </ul>
    `)
}
