import axios from 'axios';
import { toBase64 } from './toBase64';
/**
 * The `uploadFile` function takes a file as input, converts it to base64 format, and sends it to an
 * API endpoint for uploading.
 * @param {any} file - The `file` parameter is the file object that you want to upload. It can be
 * obtained from an input element of type "file" in HTML or from any other source that provides a file
 * object.
 */
export const uploadFile = async (file: any) => {
  let file_base64: any = await toBase64(file);
  const file_base64_array: string[] = file_base64.split('base64,');
  const send_json = JSON.stringify({
    name: file.name,
    base64: file_base64_array[1],
  });

  try {
    const response = await axios.post('https://g8uv4l3j8i.execute-api.eu-west-2.amazonaws.com/default/uploadImage', send_json);
    if (response) {
      console.log(response.data.base);
    }
  } catch (error) {
    console.log(error);
  }
};