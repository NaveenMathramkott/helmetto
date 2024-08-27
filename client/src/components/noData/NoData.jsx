import React from "react";
import { Empty } from "antd";

const NoData = ({ title }) => {
  return (
    <div>
      <Empty description={title} />
    </div>
  );
};

export default NoData;
