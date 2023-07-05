import Sidebar from '../components/sidebar/Sidebar'
import Editor from '../components/editor/Editor'
import {
  createNewDocument,
  deleteDocument,
  editDocument,
} from '../utils/fetchData'
import { getItem, setItem } from '../utils/storage'
import { DATA, ENV } from '../utils/constants'
import { navigate } from '../routes/URLRouter'
import { createComponent } from '../utils/domUtils'

export default function MainPage({ $target, updateState }) {
  const $main = createComponent('div', {
    className: 'main',
    parentElement: $target,
  })

  this.documents = []

  this.setDocuments = (nextDocuments) => {
    this.documents = nextDocuments
    sidebar.setState(nextDocuments)
  }

  this.content = null

  this.setContent = (nextContent) => {
    this.content = nextContent
    editor.setState(nextContent)
  }

  const sidebar = new Sidebar({
    $target: $main,
    initialState: this.documents,
    onClick: (id) => {
      navigate(`/documents/${id}`)
      updateState(DATA.CONTENT, id)
    },
    onAdd: async (id) => {
      const newDocument = await createNewDocument(id)
      navigate(`/documents/${newDocument.id}`)
      updateState(DATA.ALL, newDocument.id)
    },
    onToggle: async (target, id, event = '') => {
      const $toggle = target.closest('.toggle')
      const $nestedList = $toggle.closest('li').querySelector('.nested')

      if (event !== 'add' || $nestedList.classList.contains('hidden')) {
        $nestedList.classList.toggle('hidden')
      }

      const isOpen = !$nestedList.classList.contains('hidden')
      saveToggleState(id, isOpen)
      this.setDocuments(this.documents)
    },
    onDelete: async (id) => {
      const pathId = location.pathname.split('/').at(-1)
      await deleteDocument(id)

      if (pathId === id) {
        navigate('/')
        updateState(DATA.DOCUMENT)
        editor.setState(null)
      } else {
        updateState(DATA.DOCUMENT)
      }
    },
  })

  let timer = null

  const saveToggleState = (id, isOpen) => {
    const currState = getItem(ENV.TOGGLE_STATE_SAVE_KEY)
    const nextState = {
      ...currState,
      [id]: isOpen,
    }
    setItem(ENV.TOGGLE_STATE_SAVE_KEY, nextState)
  }

  const editor = new Editor({
    $target: $main,
    initialState: this.content,
    onEdit: async (post, name) => {
      if (timer) {
        clearTimeout(timer)
      }
      // 디바운스
      timer = setTimeout(async () => {
        const currState = getItem(ENV.TEMP_POST_SAVE_KEY)
        const { id, title, content } = post

        const nextState = {
          ...currState,
          [id]: post,
        }
        setItem(ENV.TEMP_POST_SAVE_KEY, nextState)
        await editDocument(id, title, content)

        name === 'content' && updateState(DATA.CONTENT, id)
        name === 'title' && updateState(DATA.ALL, id)
      }, 1000)
    },
    onClick: (id) => {
      navigate(`/documents/${id}`)
      updateState(DATA.CONTENT, id)
    },
  })
}
