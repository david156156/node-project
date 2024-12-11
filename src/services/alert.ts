import { Bounce, toast } from "react-toastify";

export const msgSuccess = (msg: string, darkMode: boolean) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: darkMode ? "dark" : "light",
    transition: Bounce,
  });
};

export const msgError = (msg: string, darkMode: boolean) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: darkMode ? "dark" : "light",
    transition: Bounce,
  });
};
