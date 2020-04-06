import React, { Component } from "react";
import { Card, Icon, List } from "antd";
import LinkButton from "../../components/link-button";
import { reqCategory } from "../../api";
import { BASE_IMG_URL } from "../../utils/constants";
const Item = List.Item;

export default class ProductDetail extends Component {
  state = {
    cName1: "", // Lv1 category name
    cName2: "" // Lv2 category name
  };

  async componentDidMount() {
    // Get current product category id

    const { pCategoryId, categoryId } = this.props.location.state.product;

    if (pCategoryId === "0") {
      // product is in Lv1 category
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({ cName1 });
    } else {
      // request Lv1 category and Lv2 category names at the same time
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId)
      ]);
      const cName1 = results[0].data.name;
      const cName2 = results[1].data.name;

      this.setState({
        cName1,
        cName2
      });
    }
  }
  render() {
    // Get product from props
    const {
      name,
      desc,
      price,
      detail,
      imgs
    } = this.props.location.state.product;
    let imgTags = imgs.map(img => {
      return (
        <span key={img}>
          {" "}
          <img className="product-img" src={BASE_IMG_URL + img} alt="img" />
        </span>
      );
    });
    const { cName1, cName2 } = this.state;
    const title = (
      <span>
        <LinkButton>
          <Icon
            type="arrow-left"
            style={{ marginRight: 10, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          ></Icon>
        </LinkButton>
        <span>Products</span>
      </span>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="left">Product Name:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="left">Product Description:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="left">Product Price:</span>
            <span>${price}</span>
          </Item>
          <Item>
            <span className="left">Category:</span>
            <span>
              {cName1} --> {cName2}
            </span>
          </Item>
          <Item>
            <span className="left">Product Images:</span>
            {imgTags}
          </Item>
          <Item>
            <span className="left">Product Detail:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </Item>
        </List>
      </Card>
    );
  }
}
