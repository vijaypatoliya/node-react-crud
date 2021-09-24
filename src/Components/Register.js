import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  EuiSpacer,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiFlexItem,
  EuiCard,
  EuiFlexGroup,
  EuiFormControlLayout,
  EuiIcon,
  EuiButtonEmpty,
  EuiTitle
} from "@elastic/eui";
import { useHistory } from "react-router-dom";
import { registerUser } from '../Services/auth.service'
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/auth";

const formSchema = {
  firstname: '',
  lastname: '',
  password: '',
  email: '',  
};

const Register = () => {
  const history = useHistory();
  const isUserRegistered = useSelector((state) => state.auth.isUserRegistered);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset ,
    formState: { errors },
  } = useForm(formSchema);

  useEffect(() => {
    if (isUserRegistered) {
      dispatch(authActions.signUp(false))
      history.push('/login')
    }
  }, [dispatch, isUserRegistered, history]);

  const registerHandler = async (event, dispatch) => {
    await dispatch(registerUser(event))
    reset(formSchema)
  };

  return (
    <div className="hold-transition login-page">
     <div className="login-box text-center mb-2">
     <EuiTitle style={{ color: "#006bb2" }}  >
                <div className="d-flex align-items-center justify-content-center">
                  Logo
                </div>
              </EuiTitle>
      </div>
      <div className="login-content">
      <EuiCard paddingSize="s" title="" description="Register a new company">
          <EuiFlexGroup
            className="h-100 m-0"
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <EuiFlexItem className="justify-content-center" style={{ minWidth: 400 }} >
              <EuiForm component="form" onSubmit={handleSubmit((e) => registerHandler(e, dispatch))} noValidate >
                <EuiFormRow isInvalid={!!errors.firstname} error={errors?.firstname?.message} >
                  <EuiFormControlLayout prepend={<EuiIcon type="user" color="primary" />} >
                    <input autoFocus type='text' placeholder="First name"
                      className={`euiFieldText euiFieldText--inGroup ${errors?.firstname && "invalid-input"}`}
                      {...register("firstname", { required: "firstname is required" })}
                      id="firstname"
                    />
                  </EuiFormControlLayout>
                </EuiFormRow>
                <EuiSpacer  size="s"/>
                <EuiFormRow isInvalid={!!errors.lastname} error={errors?.lastname?.message} >
                  <EuiFormControlLayout prepend={<EuiIcon type="user" color="primary" />} >
                    <input autoFocus type='text' placeholder="Last name"
                      className={`euiFieldText euiFieldText--inGroup ${errors?.lastname && "invalid-input"}`}
                      {...register("lastname", { required: "lastname is required" })}
                      id="lastname"
                    />
                  </EuiFormControlLayout>
                </EuiFormRow>
                <EuiSpacer  size="s"/>

                <EuiFormRow isInvalid={!!errors.email} error={errors?.email?.message} >
                  <EuiFormControlLayout prepend={<EuiIcon type="email" color="primary" />} >
                    <input autoFocus type='email' placeholder="Email"
                      className={`euiFieldText euiFieldText--inGroup ${errors?.email && "invalid-input"}`}
                      {...register("email", { required: "Email is required" })}
                      id="email"
                    />
                  </EuiFormControlLayout>
                </EuiFormRow>                
                <EuiSpacer  size="s"/>
                
                <EuiFormRow isInvalid={!!errors.password} error={errors?.password?.message} >
                  <EuiFormControlLayout prepend={<EuiIcon type="lock" color="primary" />} >
                    <input autoFocus type="password" placeholder="Password"
                      className={`euiFieldText euiFieldText--inGroup ${errors?.password && "invalid-input"}`}
                      {...register("password", { required: "Password is required" })}
                      id="password"
                    />
                  </EuiFormControlLayout>
                </EuiFormRow>
                <EuiSpacer  size="s"/>
                <EuiFlexGroup  alignItems='center' justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiButtonEmpty onClick={() => { history.push('/login') }}>
                      Already Have Membership?
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton type="submit" size="s" fill>
                      Register
                    </EuiButton>{" "}
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiForm>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiCard>
      </div>
    </div>
  );
};

export default React.memo(Register);
