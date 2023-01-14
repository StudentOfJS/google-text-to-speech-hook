import { google, speech_v1 } from 'googleapis';

const createGoogleSpeechToText = async (): Promise<speech_v1.Speech> => {
  const auth = await google.auth.getClient({
    keyFile: 'path/to/apiKey.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  return google.speech({ version: 'v1', auth });
};

export { createGoogleSpeechToText };
