import React from "react";
import {
  EuiIcon,
  EuiFlexItem,
  EuiCard,
} from "@elastic/eui";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center position-fixed loader-view div-center">
      <EuiFlexItem style={{ minWidth: 200 }}>
        <EuiCard
        paddingSize="s"
          title=""
          icon={<EuiIcon type="logoAppSearch" size="xl" />}
          description=" Loading ...."
        />
      </EuiFlexItem>
    </div>
  );
};

export default Loading;
