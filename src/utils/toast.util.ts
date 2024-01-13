import toast, { ToastOptions } from "react-hot-toast";

const defaultTostConfig: ToastOptions = {
  duration: 1500,
  position: "bottom-right",
};

export const successTost = (message: string) =>
  toast.success(message, defaultTostConfig);

export const errorTost = (message: string) =>
  toast.error(message, defaultTostConfig);

export const laodingTost = (message: string) =>
  toast.loading(message, defaultTostConfig);
