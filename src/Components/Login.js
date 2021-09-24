import React , { useEffect } from "react";
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
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
 import { loginUser } from '../Services/auth.service'

const formSchema = {
  email: "",
  password: "",
};

const Login = () => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formSchema);

  const loginHandler = (event) => {
      dispatch(loginUser(event))
  };

  useEffect(() => {
    if(isAuthenticated){
      history.push('/dashboard')
    }
  }, [isAuthenticated, history])

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
        <EuiCard title="" description="" paddingSize="s">
          <EuiFlexGroup
            className="h-100 m-0"
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <EuiFlexItem
              className="justify-content-center"
              style={{ minWidth: 400 }}
            >
              <EuiForm
                component="form"
                onSubmit={handleSubmit(loginHandler)}
                noValidate
              >
                  <EuiFormRow isInvalid={!!errors.email} error={errors?.email?.message} >
                  <EuiFormControlLayout prepend={<EuiIcon type="email" color="primary" />} >
                    <input autoFocus type='email' placeholder="Email"
                      className={`euiFieldText euiFieldText--inGroup ${errors?.email && "invalid-input"}`}
                      {...register("email", { required: "Email is required" })}
                      id="email"
                    />
                  </EuiFormControlLayout>
                </EuiFormRow>  
                <EuiSpacer size="s" />
                <EuiFormRow
                  isInvalid={!!errors.password}
                  error={errors?.password?.message}
                >
                  <EuiFormControlLayout
                    prepend={<EuiIcon type="lock" color="primary" />}
                  >
                    <input
                      autoFocus
                      type='password'
                      className={`euiFieldText euiFieldText--inGroup ${
                        errors?.password && "invalid-input"
                      }`}
                      placeholder="Password"
                      {...register("password", {
                        required: "This is required",
                      })}
                      id="password"
                    />
                  </EuiFormControlLayout>
                </EuiFormRow>
                <EuiSpacer size="s" />
                <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}>
                    <EuiButtonEmpty
                      onClick={() => {
                        history.push("/register");
                      }}
                    >
                      Register a new company
                    </EuiButtonEmpty>
                  </EuiFlexItem>
                  
                </EuiFlexGroup>
                <EuiSpacer size="s" />
                <EuiFlexGroup alignItems="center" justifyContent="spaceBetween">
                  <EuiFlexItem grow={false}></EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      type="submit"
                      size="s"
                      fill
                    >
                      Login
                    </EuiButton>
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

export default React.memo(Login);
