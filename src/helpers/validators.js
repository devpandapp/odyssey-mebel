import { helpers } from "@vuelidate/validators";

export const supportedFileType = (value) => {
  if (!helpers.req(value)) {
    return true;
  }

  const allowedFormats = ["jpg", "png", "jpeg", "svg"];
  const extension = value.split(".").pop();

  return allowedFormats.includes(extension);
};
