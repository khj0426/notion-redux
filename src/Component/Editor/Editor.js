import INIT_DOCUMENT from '../../constants/document';
import EditorTemplate from '../Template/EditorTemplate';
import EditorChildList from './EditorChildList';
import EditorChildListTemplate from '../Template/EditorChildListTemplate';
import store from '../../store/store';

export default function Editor({
  $target,
  initalState = INIT_DOCUMENT,
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.className = 'editor';

  this.state = {
    initalState,
    isFirstRender: false,
  };

  $target.appendChild($editor);

  this.setState = (nextState) => {
    const $editorTitle = $editor.querySelector('.editorTitle');
    const $editorContent = $editor.querySelector('.editorContent');

    this.state = nextState;

    const { title, content, documents } = this.state;

    if ($editorTitle) {
      $editorTitle.value = title || '';
    }

    if ($editorContent) {
      $editorContent.value = content || '';
    }

    store.dispatch(
      {
        type: 'SET_EDITOR_CHILD',
        payload: documents,
      },
      documents
    );

    this.render();

    const $editorChildList = document.createElement('div');
    $editorChildList.innerHTML = EditorChildListTemplate(
      store.getState().editorChildList
    );

    $editor.querySelector('.editorChildList').replaceChildren($editorChildList);
  };

  this.setEvent = () => {
    $editor.addEventListener('keyup', (e) => {
      const { target } = e;
      const name = target.getAttribute('name');

      if (name.includes('Title')) {
        this.setState({
          ...this.state,
          title: target.value,
        });
      } else if (name.includes('Content')) {
        this.setState({
          ...this.state,
          content: target.value,
        });
      }
      onEditing(this.state);
    });
  };

  this.render = () => {
    if (!this.state.isFirstRender) {
      const { title, content } = this.state;
      $editor.innerHTML = EditorTemplate(title, content || '');
      this.setState({
        ...this.state,
        isFirstRender: true,
      });
    }
  };

  this.setEvent();
}
