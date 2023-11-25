import toast, { Toaster } from 'react-hot-toast';

/**
 * The `infoAlert` function displays an error toast notification with the provided text.
 * @param {string} text - The `text` parameter is a string that represents the message or content of
 * the success alert.
 */
export const infoAlert = (text: string) => {
  toast.error(text, {
    duration: 4000,
    position: 'top-right',
  });
};

/**
 * The `successAlert` function displays a success toast notification with the provided text.
 * @param {string} text - The `text` parameter is a string that represents the message or content of
 * the success alert.
 */
export const successAlert = (text: string) => {
  toast.success(text, {
    duration: 4000,
    position: 'top-right',
  });
};

