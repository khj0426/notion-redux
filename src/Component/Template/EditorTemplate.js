export default function EditorTemplate (title, content) {
  return DOMPurify.sanitize(`
      <section class="editorContainer">   
        <input
          name="editorTitle"
          class="editorTitle"
          type="text"
          value="${title.trim()}"
        ></input>
        <div class="editorContentWrapper">
          <textarea name="editorContent" class="editorContent">
            ${content}
          </textarea>
        </div>
      </section>
    `)
}
