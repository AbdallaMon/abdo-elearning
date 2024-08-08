"use client";
import InputField from "../../MUIInputs/InputField";
import { useForm } from "react-hook-form";
import SelectField from "../../MUIInputs/SelectField";
import { Button, Typography } from "@mui/material";

export default function MainForm({
  inputs,
  onSubmit,
  differentButton,
  btnText,
  formTitle,
  subTitle,
  formStyle,
  variant,
  children,
  _className,
}) {
  const { formState, register, handleSubmit, watch, trigger, control } =
    useForm();
  const { errors } = formState;
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={
        "flex flex-col items-center justify-center w-full  p-5 py-6 bg-gray-100 rounded shadow-md   " +
        _className
      }
      style={{
        ...formStyle,
      }}
    >
      <Typography
        variant="h4"
        className="mb-4 font-bold text-[--color_primary]"
      >
        {formTitle}
      </Typography>
      {subTitle && (
        <Typography
          variant="subtitle1"
          className="mb-4 font-bold text-[--color_secondary]"
        >
          {subTitle}
        </Typography>
      )}
      <div className={"w-full "}>
        {inputs.map((input) => {
          if (input.data.type === "select") {
            return (
              <SelectField
                key={input.data.id}
                select={input}
                register={register}
                errors={errors}
                variant={variant}
              />
            );
          } else {
            return (
              <InputField
                key={input.data.id}
                input={input}
                register={register}
                errors={errors}
                variant={variant}
                watch={watch}
                trigger={trigger}
              />
            );
          }
        })}
        {children}
      </div>
      {differentButton ? (
        differentButton
      ) : (
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          className={" w-full  p-3 capitalize  font-bold"}
          sx={{
            backgroundColor: "--color_primary",
            "&:hover": {
              backgroundColor: "--color_primary",
            },
            mt: 1,
            color: "white",
          }}
        >
          {btnText}
        </Button>
      )}
    </form>
  );
}
