import { getDocuments, postDocument } from "../../api/document.js";

export default function Edit({ appElement }) {
  const containerElement = document.createElement("div");

  this.state = {
    title: "",
    content: "",
  };

  this.setState = (nextState) => {
    this.state = nextState;
  };

  containerElement.addEventListener("input", (e) => {
    if (e.target.closest(".title")) {
      this.setState({ ...this.state, title: e.target.value });
    }
  });

  containerElement.addEventListener("input", (e) => {
    if (e.target.closest(".edit")) {
      this.setState({ ...this.state, content: e.target.innerHTML });
    }
  });

  containerElement.addEventListener("click", async (e) => {
    if (e.target.closest(".api-button")) {
      postDocument(this.state);
    }
    if (e.target.closest(".temp-button")) {
      const tempData = await getDocuments();
      console.log(tempData);
    }
  });

  this.render = () => {
    appElement.append(containerElement);

    containerElement.innerHTML = `
      <h2>문서 작업 페이지<h2>
      <input type="text" class="title" />
      <div contentEditable class="edit"></div> 
      <button class="api-button">호출 버튼</button>
      <button class="temp-button">데이터 확인</button>
    `;
  };
}
