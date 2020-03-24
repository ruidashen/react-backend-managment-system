import React, { Component } from "react";
import {
  Card,
  Icon,
  List
} from 'antd';
import LinkButton from '../../components/link-button';
import product_pic from '../../assests/images/product.jpg';
const Item = List.Item;



export default class ProductDetail extends Component {
  render() {
    // Get product from props
    const { name, desc, price, detail } = this.props.location.state.product;
    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left"
            style={{ marginRight: 10, fontSize: 20 }}
            onclick={() => this.props.history.goBack()}></Icon>
        </LinkButton>
        <span>Products</span>
      </span>
    )
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
            <span>Computer --> Laptop</span>
          </Item>
          <Item>
            <span className="left">Product Images:</span>
            <span>
              <img
                className="product-img"
                src={product_pic}
                alt="img"
              />
              <img className="product-img" src={product_pic} alt="" />
            </span>
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
