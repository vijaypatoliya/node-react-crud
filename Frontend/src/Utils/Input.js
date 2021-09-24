import React from "react";
import { Controller } from "react-hook-form";
import {
  EuiFieldText,
  EuiFormRow,
  EuiFormControlLayout,
  EuiTextColor,
  EuiTextArea,  
  EuiFieldPassword
} from "@elastic/eui";

const InputField = ({ name, label, errors,control , placeholder, disabled , required , type, handleChange, value }) => {
  return (
    <>
      <Controller render={({field: { onChange, ref }, fieldState: { invalid }}) => {
        return (
          <EuiFormRow label={label}>
            <EuiFormControlLayout>
                {type === 'Input' && 
              <EuiFieldText
                className={`${invalid && "invalid-input"}`}
                onChange={(e) => {
                  if (handleChange) handleChange(e);
                  onChange(e)
                }}
                value={value}
                name={name}
                inputRef={ref}
                placeholder={placeholder}
                disabled={disabled}
              /> }

               
            </EuiFormControlLayout>
          </EuiFormRow>
        )}}
        name={name}
        control={control}
        rules={{ required }}
      />
      <EuiTextColor className="mt-2" color="danger">
        {errors[name]?.type === "required" && "This field is required"}
      </EuiTextColor>
    </>
  );
};

export default InputField;
