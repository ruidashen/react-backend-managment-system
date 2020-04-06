import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string
  };

  constructor(props) {
    super(props);
    const html = this.props.detail;
    if (html) {
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState
      };
    } else {
      this.state = EditorState.createEmpty();
    }
  }

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/manage/img/upload");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const url = response.data.url;
        resolve({ data: { link: url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  getDetail = () => {
    try {
      let content = this.state.editorState.getCurrentContent();
      if (content) {
        return draftToHtml(convertToRaw(content));
      }
    } catch (e) {
      return "";
    }
  };
  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        editorStyle={{
          border: "1px solid black",
          minHeight: 200,
          paddingLeft: 10
        }}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: {
            uploadCallback: this.uploadImageCallBack,
            alt: { present: true, mandatory: true },
            previewImage: true
          }
        }}
      />
    );
  }
}
