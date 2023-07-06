import { route } from "../router/route.js";
import { removeDocumentFromStorage } from "../storage/index.js";
import { request } from "../api.js";
import { updateDocumentTree } from "../service/index.js";

export const documentLinkClickEvent = async ({
  event,
  app,
  component,
  url,
}) => {
  event.preventDefault();
  route({ app, component, url });
};

export const addDocumentButtonClickEvnet = async ({ event, target }) => {
  const $input = document.createElement("input");
  $input.placeholder = "제목";
  $input.className = "documentInput";
  if (target === null) {
    event.target.parentNode.insertBefore($input, event.target);
    return;
  }
  target.appendChild($input);
};

export const deleteDocumentButtonClickEvent = async ({
  documentTree,
  target,
}) => {
  const { id } = target;
  await request(`/documents/${id}`, {
    method: "DELETE",
  }).then((res) => {
    removeDocumentFromStorage(res.id);
    history.pushState(null, null, "/");
  });
  updateDocumentTree({ documentTree });
};

export const documentInputChangeEvent = async ({
  event,
  documentTree,
  target,
}) => {
  const { value } = event.target;
  await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: value,
      parent: target ? target.id : null,
    }),
  });
  updateDocumentTree({ documentTree });
};