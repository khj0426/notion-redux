import { getDocument } from '../api';

export default function Document({ targetElement, documentId }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.state = { documentId };
  this.setState = ({ documentId }) => {
    this.state = { ...this.state, documentId };
    this.render();
  };

  this.render = async () => {
    const { documentId } = this.state;
    if (!documentId) {
      targetElement.innerHTML = '';
      return;
    }

    targetElement.innerHTML = `
      <input class="document-title"/>
      <textarea class="document-content"></textarea>
    `;
    const [documentTitleElement, documentContentElement] = targetElement.children;

    const { title, content } = await getDocument(documentId);
    documentTitleElement.value = title;
    documentContentElement.value = content;
  };

  this.init();
}
