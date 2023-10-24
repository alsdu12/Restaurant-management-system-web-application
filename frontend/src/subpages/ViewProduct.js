import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ViewProduct(props) {
  return (
    <div>
      <Navbar name="ADMIN" logout={props.logout} />
      <Sidebar
        pos1="Add Account"
        pos2="Add Product"
        pos3="Delete Product"
        pos4="Update Product"
        pos5="View Product"
      />
    </div>
  );
}
