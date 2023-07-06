import Component from "./Component.js";

export default class DocumentTreeComponent extends Component {
  render() {
    this.$target.innerHTML = ``;
    const $rootUl = document.createElement("ul");
    $rootUl.className = "rootUl";
    this.$target.appendChild($rootUl);
    this.getTemplate(this.state).forEach((child) => $rootUl.appendChild(child));
    const rootButton = document.createElement("button");
    rootButton.className = "addRootDocumentButton addDocumentButton";
    rootButton.textContent = "+";
    this.$target.appendChild(rootButton);
  }

  getTemplate(documentTree) {
    return documentTree.map((doc) => {
      const $li = document.createElement("li");
      $li.textContent = doc.title;
      $li.id = `${doc.id}`;

      $li.innerHTML = `
        <span class="documentLicontainer">
          <a class="documentLink" href="/documents/${doc.id}">${doc.title}</a>
          <span class="documentTreeButtonContainer">
            <button class="addDocumentButton" data-id="${doc.id}">+</button>
            <button class="deleteDocumentButton" data-id="${doc.id}">x</button>
          </span>
        </span>
      `;

      if (doc.documents.length > 0) {
        const $ul = document.createElement("ul");
        const children = this.getTemplate(doc.documents);
        children.forEach((child) => $ul.appendChild(child));
        $li.appendChild($ul);
      }

      return $li;
    });
  }
}