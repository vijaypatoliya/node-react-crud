import React, { useState , useEffect} from "react";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPopover,
  EuiAvatar,
  EuiListGroup,
  EuiIcon,
  EuiListGroupItem,
  EuiTitle
} from "@elastic/eui";
import { useHistory } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { logout } from '../Services/auth.service'


const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
 
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  const navigateClickHandler = (url) => {
    history.push(url)
  };

  const logoutHandler = () => {
    dispatch(logout())
  }
  
  useEffect(() => {
    if(!isAuthenticated){
      history.push('/login')
    }
  }, [isAuthenticated , history])
 
 
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem grow={false}>
              <EuiIcon
                type="menu"
                color="primary"
                data-widget="pushmenu"
                style={{ cursor: "pointer", marginLeft: "15px" }}
              />{" "}
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
            <EuiTitle style={{ color: "#006bb2" }} size="xs">
                <div className="d-flex align-items-center">
                  Logo
                </div>
              </EuiTitle>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup alignItems="center">
          
            <EuiFlexItem grow={false}>
              <EuiPopover
                className="mr-2 mt-2"
                button={
                  <EuiAvatar
                    type="space"
                    onClick={onButtonClick}
                    name="J D"
                    color="#006BB4"
                  />
                }
                isOpen={isPopoverOpen}
                closePopover={closePopover}
              >
                <EuiListGroup className="p-0">
                  

                  <EuiListGroupItem
                    label="User Profile"
                    iconType="user"
                    size="s"
                    onClick={() => navigateClickHandler("/user-profile")}
                  />

                  <EuiListGroupItem
                    label="Logout"
                    iconType="logstashOutput"
                    size="s"
                    onClick={logoutHandler}
                  />
                </EuiListGroup>
              </EuiPopover>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </nav>
  );
};

export default React.memo(Header);
