import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import InputField from "../../Utils/Input";
import {
  EuiButton,
  EuiButtonEmpty,
  EuiForm,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiTitle,
  EuiFlexItem,
  EuiFlexGrid,
  EuiModalBody,
  EuiFlexGroup,
} from "@elastic/eui";
import { useSelector } from "react-redux";
import { getUser, updateUser } from "../../Services/user.service";

const formSchema = {
  email: null,
  firstname: null,
  lastname: null,
  role: null,
  mobile: null,
  id: null,
  unitId: null,
};

const AddUser = (props) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(props.showDialog);
  const userDetails = useSelector((state) => state.user.user);
  const [editData, setEditData] = useState(userDetails);
  const [profileUrl, setProfileUrl] = useState(null);
  const [files, setFiles] = useState(null);
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem("userToken"));
    dispatch(getUser(userId.id));
  }, []);

  const submitHandler = (event) => {
    let user = {
      email: event.email,
      firstname: event.firstname,
      lastname: event.lastname,
      profileImage: files,
      id: userDetails ? userDetails._id : null,
    };
    dispatch(updateUser(user));
    reset(formSchema);
    props.userSubmitHandler()
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm(formSchema);

  const closeModal = () => {
    reset(formSchema);
    props.userSubmitHandler()
  };

  useEffect(() => {
    if (userDetails) {
      setValue("firstname", userDetails.firstname);
      setValue("lastname", userDetails.lastname);
      setValue("id", userDetails["_id"]);
      setValue("email", userDetails.email);

      setProfileUrl(userDetails.profileUrl)
    }
  }, [dispatch, setValue, userDetails]);

  const handleChanges = (value, field) => {
    setValue(field, value);
    setEditData({ ...userDetails, [field]: value });
  };

  const onChangeUser = (event) => {
    const file = event.nativeEvent.srcElement.files[0];
    const reader = new FileReader();

    if (file) {
      setFiles(file);
      reader.readAsDataURL(file);
    }

    reader.addEventListener(
      "load",
      () => {
        setProfileUrl(reader.result);
      },
      false
    );
  };

  return (
    isModalVisible && (
      <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <EuiTitle size="xs">
              <div className="d-flex align-items-center"> Edit User</div>
            </EuiTitle>
          </EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          <EuiForm
            component="form"
            onSubmit={handleSubmit(submitHandler)}
            noValidate
          >
            <EuiFlexGrid columns={2} direction="row">
              <EuiFlexItem>
                <div className="d-flex align-items-center">
                  <div className="user">
                    <label title="Upload photo">
                      <img
                        className="user-image"
                        src={
                          profileUrl
                            ? profileUrl
                            : process.env.PUBLIC_URL + "/upload-image.png"
                        }
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChangeUser(e)}
                      />
                    </label>
                  </div>
                </div>
              </EuiFlexItem>
              </EuiFlexGrid>
              <EuiFlexGrid columns={2} direction="row">
              <EuiFlexItem>
                <InputField
                  name="firstname"
                  type="Input"
                  placeholder="Enter First Name"
                  control={control}
                  errors={errors}
                  required="true"
                  register={register}
                  value={editData.firstname}
                  handleChange={(e) =>
                    handleChanges(e.target.value, "firstname")
                  }
                />
              </EuiFlexItem>

              <EuiFlexItem>
                <InputField
                  name="lastname"
                  type="Input"
                  placeholder="Enter Last Name"
                  control={control}
                  errors={errors}
                  required="true"
                  register={register}
                  value={editData.lastname}
                  handleChange={(e) =>
                    handleChanges(e.target.value, "lastname")
                  }
                />
              </EuiFlexItem>

              <EuiFlexItem>
                <InputField
                  name="email"
                  type="Input"
                  placeholder="Enter Email"
                  control={control}
                  errors={errors}
                  required="true"
                  value={editData.email}
                  register={register}
                  handleChange={(e) => handleChanges(e.target.value, "email")}
                />
              </EuiFlexItem>
            </EuiFlexGrid>

            <EuiFlexGroup justifyContent="flexEnd">
              <EuiFlexItem grow={false}>
                <EuiFlexGroup>
                  <EuiFlexItem grow={false}>
                    <EuiButtonEmpty size="s" onClick={closeModal}>
                      Cancel
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton type="submit" size="s" fill>
                      Save
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
        </EuiModalBody>
      </EuiModal>
    )
  );
};

export default React.memo(AddUser);
