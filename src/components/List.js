import {
  setOpenDocument,
  setCloseDocumet,
  getCurrOpenState,
} from '../utils/StorageHandler.js';

export default class List {
  constructor(target, initialState, depth, showDocument, onRemove, onCreate) {
    this.$target = target;
    this.state = {
      documentInfo: initialState,
      isOpen: getCurrOpenState(initialState.id),
    };
    this.depth = depth;
    this.showDocument = showDocument;
    this.onRemove = onRemove;
    this.onCreate = onCreate;
    this.$ul = null;
    this.children = [];
    this.initUl();
    this.render();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  initUl = () => {
    this.$ul = document.createElement('ul');
    this.$ul.className = 'document-ul';
    this.$target.appendChild(this.$ul);
  };

  removeCurrNode = async (id) => {
    this.$target.removeChild(this.$ul);
    setCloseDocumet(id);
    this.onRemove(id);
  };

  render = () => {
    this.$ul.innerHTML = `
      <li data-id=${this.state.documentInfo.id} class=depth-0${this.depth}>
        <button class='open-toggle-button'>${
          this.state.isOpen === true ? '▼' : '▶︎'
        }</button>
        <span>${this.state.documentInfo.title === null ? '제목 없음' : this.state.documentInfo.title}</span>
        <button class='add-toggle-button'>﹢</button>
        <button class='delete-toggle-button'>X</button>
      </li>
    `;

    if (this.state.isOpen === true) {
      this.renderChild();
    }
    this.addUlEvent();
  };

  renderChild = () => {
    if (this.state.documentInfo.documents.length > 0) {
      this.state.documentInfo.documents.forEach((document) => {
        new List(this.$ul, document, this.depth + 1, this.showDocument, this.onRemove, this.onCreate);
      });
    } else {
      const $li = document.createElement('div');

      $li.className = `depth-0${this.depth + 1}`;
      $li.innerText = '하위 페이지 없음';
      this.$ul.appendChild($li);
    }
  };

  addUlEvent = () => {
    this.$ul.addEventListener('click', (event) => {
      event.stopImmediatePropagation();
      const $li = event.target.closest('li');
      const $button = event.target.closest('button');
      const { id } = $li.dataset;

      if ($button === null) {
        this.showDocument(id);
      } else {
        this.checkButtonType($button, id);
      }
    });
  };

  checkButtonType = async($button, id) => {
    if ($button.className === 'open-toggle-button') {
      const nextState = {
        ...this.state,
        isOpen: !this.state.isOpen,
      };
      nextState.isOpen === true ? setOpenDocument(id) : setCloseDocumet(id);
      this.setState(nextState);
    } else if ($button.className === 'add-toggle-button') {
      const nextState = {
        ...this.state,
        isOpen: true,
      };
      setOpenDocument(id);
      this.setState(nextState);
      this.onCreate(id);
    } else if ($button.className === 'delete-toggle-button') {
      this.removeCurrNode(id);
    }
  };
}
