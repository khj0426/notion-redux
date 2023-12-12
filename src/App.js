import { initRouter } from './route';
import DocumentEditPage from './Page/DocumentEditPage';
import DocumentPage from './Page/DocumentPage';
import NotFoundModal from './Component/NotFoundModal';

export default function App({ $target, initalState }) {
  const documentPage = new DocumentPage({
    $target,
    initalState,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initalState: {
      documentId: 'new',
      document: {
        title: '',
        content: '',
      },
    },
    onChangeEditorTitle: () => {
      documentPage.render();
    },
  });

  const notFoundModal = new NotFoundModal({
    $target,
  });

  this.route = () => {
    const { pathname } = window.location;
    documentPage.render();
    notFoundModal.closeModal();

    if (pathname === '/') {
      documentEditPage.setState({
        documentId: 'new',
      });
      return;
    }

    if (pathname.includes('/documents/')) {
      const [, , documentId] = pathname.split('/');
      documentId && documentEditPage.setState({ documentId });
      return;
    }

    notFoundModal.showModal(pathname);
  };

  this.route();

  initRouter(this.route);
}
