import React, { useEffect, useState } from "react";
import {
  EuiCard,
  EuiIcon,
  EuiTitle,
  EuiFlexItem,
  EuiFlexGroup,
  EuiComment,
  EuiButtonIcon,
  EuiFlexGrid,
  EuiImage,
} from "@elastic/eui";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Services/user.service";
import AddUser from "./Add-User";

const UserProfile = () => {
  const [showDialog, setShowDialog] = useState(false);
  const userDetails = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  let props = { showDialog  };


  const userContent = [
    {
      timelineIcon: "user",
      type: "update",
      event: userDetails?.firstname + " " + userDetails?.lastname,
      username: "Name - ",
    },
    {
      timelineIcon: "email",
      type: "update",
      event: userDetails?.email,
      username: "Email - ",
    },

    {
      timelineIcon: "apmTrace",
      type: "update",
      event: "123456789",
      username: "Mobile - ",
    },
  ];

  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userToken"));
    dispatch(getUser(userId.id));
  }, []);

  const addUserHandler = (props) => {
    props.showDialog = true
    setShowDialog(props.showDialog);
  };

  const submitUserHandler = async (props, dispatch) => {
    setShowDialog(false);
  };

  return (
    <>
      <EuiFlexGroup className="p-3" justifyContent="spaceBetween">
        <EuiFlexItem>
          <EuiCard
            layout="horizontal"
            className="m-0"
            display="plain"
            title=""
            description=""
          >
            <EuiFlexGrid columns={2} direction="column">
              <EuiFlexItem>
                <EuiTitle style={{ color: "#006bb2" }} size="xs">
                  <div className="d-flex align-items-center">
                    <EuiImage
                      size="s"
                      hasShadow
                      alt="Accessible image alt goes here"
                      src={userDetails.profile ? userDetails.profileUrl : process.env.PUBLIC_URL + "/no-image-found.png"}
                    />
                  </div>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexGroup justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                  <EuiButtonIcon
                    className="mr-2 mt-2"
                    display="base"
                    iconType="pencil"
                    size="s"
                    aria-label="Edit"
                    onClick={addUserHandler}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexGrid>
            <div className="user-section mt-4">
              {userContent.map((e) => (
                <EuiComment
                  key={e.timelineIcon}
                  timelineIcon={e.timelineIcon}
                  type={e.type}
                  event={e.event}
                  username={e.username}
                />
              ))}
            </div>
          </EuiCard>
        </EuiFlexItem>
        <EuiFlexItem></EuiFlexItem>
      </EuiFlexGroup>
      {showDialog && <AddUser  {...props} userSubmitHandler={(e) => submitUserHandler()}  />}
    </>
  );
};

export default UserProfile;
