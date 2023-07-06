export default function CreateButton({ $target, initialState, onClick }) {
  const $button = document.createElement('button');
  $target.appendChild($button);

  this.state = initialState;

  this.render = () => {
    $button.textContent = this.state.text;
  };

  $button.addEventListener('click', () => {
    onClick();
  });

  this.render();
}