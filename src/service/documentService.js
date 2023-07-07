import { request } from "../api.js";
import { DocumentTree, Document } from "../domain/index.js";

export const getDocumentTree = async () => {
  const documentTree = await request("/documents", {
    mothod: "GET",
  }).then((res) => {
    return new DocumentTree(res);
  });
  return documentTree.data;
};

export const getDocument = async () => {
  return await request(`/documents/${getDocumentIdByPathname()}`, {
    mothod: "GET",
  }).then((res) => {
    return new Document(res);
  });
};

export const getDocumentIdByPathname = () => {
  const { pathname } = window.location;
  const splitedPathname = pathname.split("/");
  const documentId = splitedPathname[splitedPathname.length - 1];
  return documentId;
};

export const saveDocumentToServer = async ({ title, content }) => {
  await request(`/documents/${getDocumentIdByPathname()}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
  });
};

export const updateDocumentTree = async ({ documentTree }) => {
  documentTree.state = await getDocumentTree();
};