import React, { Component } from "react";
import { Upload, Modal, message } from "antd";
import { reqDeleteImg } from "../../api";
import PropTypes from "prop-types";
import { BASE_IMG_URL } from "../../utils/constants";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends Component {
  constructor(props) {
    super(props);
    console.log();
    let fileList = [];
    const { imgs } = this.props;
    console.log(imgs);
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: BASE_IMG_URL + img,
      }));
    }
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList,
    };
  }

  static propTypes = {
    imgs: PropTypes.array,
  };
  getImgs = () => {
    return this.state.fileList.map((file) => file.name);
  };

  // Hide modal
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    // console.log("handleChange()", file, fileList);

    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("Picture Uploaded!");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("Picture Upload Failed!");
      }
    } else if (file.status === "removed") {
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success("Picture Deleted");
      } else {
        message.error("Picture Deletion Failed!");
      }
    }
    this.setState({ fileList });
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <div>Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          name="image"
          accept="image/*"
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
