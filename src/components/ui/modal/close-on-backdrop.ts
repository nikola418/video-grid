export const closeOnBackdrop = (
  e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  dialog: HTMLDialogElement,
) => {
  const modalDimensions = dialog.getBoundingClientRect();

  if (
    e.clientX < modalDimensions.left ||
    e.clientX > modalDimensions.right ||
    e.clientY < modalDimensions.top ||
    e.clientY > modalDimensions.bottom
  ) {
    dialog?.close();
  }
};
