export const applyTextStyle = ({ $textMenu, color, backgroundColor }) => {
  document.execCommand('foreColor', false, color || 'inherit');
  document.execCommand('backColor', false, backgroundColor || 'inherit');
  $textMenu.classList.add('hidden');
};

export const toggleTextStyleMenu = ({ $textMenu }) => {
  if ($textMenu.classList.contains('hidden')) $textMenu.classList.remove('hidden');
  else $textMenu.classList.add('hidden');
};
