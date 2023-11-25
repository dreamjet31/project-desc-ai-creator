import OpenAI from "openai";

const dalleApiKey: string | undefined = process.env.NEXT_PUBLIC_DALLE_API_KEY;

const dalleAPI = new OpenAI({ apiKey: dalleApiKey, dangerouslyAllowBrowser: true });

/**
 * The function `generateImage` generates an image using the DALL-E API based on a given prompt and
 * returns the URL of the generated image.
 * @param {string} prompt - The prompt is a string that describes the desired image or provides
 * instructions to the model on what to generate. It can be a simple description or a more detailed
 * prompt.
 * @returns The function `generateImage` returns the URL of the generated image.
 */
export const generateImage = async (prompt:string) => {
    const response = await dalleAPI.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    const image_url = response.data[0].url;
    return image_url;
}