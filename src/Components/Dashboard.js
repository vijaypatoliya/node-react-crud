import React from "react";
import {
  EuiFlexItem,
  EuiFlexGroup,
  EuiCard,
  EuiTitle,
  EuiAvatar,
  EuiIcon,
} from "@elastic/eui";

const content = [
  {
    heading: "In Manufacturing",
    title: "350,897",
    type: "stats",
    color: "#f04e98",
    totalPercentage: "34%",
    titleDesc: "Since last month",
    iconType: "sortUp",
  },
  {
    heading: "Direct Rough Sales",
    title: "2,356",
    type: "user",
    color: "#0077cc",
    totalPercentage: "34%",
    titleDesc: "Since last month",
    iconType: "sortDown",
  },
  {
    heading: "Production Completed",
    title: "924",
    type: "storage",
    color: "#fec514",
    totalPercentage: "34%",
    titleDesc: "Since last month",
    iconType: "sortUp",
  },
  {
    heading: "Sales",
    title: "49.65%",
    type: "visBarVerticalStacked",
    color: "#00bfb3",
    totalPercentage: "34%",
    titleDesc: "Since last month",
    iconType: "sortDown",
  },
];
 
 
const Dashboard = () => {
  return (
    <div className="p-1">
      <EuiFlexGroup>
        {content.map(
          ({
            heading,
            title,
            type,
            color,
            iconType,
            totalPercentage,
            titleDesc,
          }) => {
            return (
              <EuiFlexItem key={title}>
                <EuiCard title="" paddingSize="m">
                  <EuiFlexGroup
                    justifyContent="spaceBetween"
                    alignItems="center"
                  >
                    <EuiFlexItem grow={false}>
                      <EuiTitle size="xxs" style={{ color: "#b1b1b1" }}>
                        <div className="d-flex align-items-center">
                          {heading}
                        </div>
                      </EuiTitle>
                      <EuiTitle size="s" className="mt-0">
                        <div className="d-flex align-items-center">{title}</div>
                      </EuiTitle>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiAvatar
                        size="l"
                        name="Medium size"
                        color={color}
                        iconType={type}
                      />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  <EuiFlexGroup>
                    <EuiFlexItem>
                      <div className="d-flex">
                        <EuiIcon color="#bd271e" type={iconType} />
                        <p style={{ color: "#bd271e" }} className="mr-2">
                          {totalPercentage}
                        </p>
                        <p>{titleDesc}</p>
                      </div>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiCard>
              </EuiFlexItem>
            );
          }
        )}
      </EuiFlexGroup>
    </div>
  );
};

export default React.memo(Dashboard);
