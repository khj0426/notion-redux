const initState = [];

const setEditorChildList = (newList) => ({
  type: 'SET_EDITOR_CHILD',
  payload: newList,
});

export default function editorChild(state = initState, action) {
  switch (action.type) {
    case 'SET_EDITOR_CHILD':
      return {
        editorChildList: action.payload,
      };
    default:
      return {
        editorChildList: state,
      };
  }
}
