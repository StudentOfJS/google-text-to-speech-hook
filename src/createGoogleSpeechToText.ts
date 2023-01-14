import { google, speech_v1 } from 'googleapis';

export const createGoogleSpeechToText = async (): Promise<speech_v1.Speech> => {
  const auth = await google.auth.getClient({
    keyFile: 'path/to/apiKey.json',
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  // global
  google.options({
    // All requests made with this object will use these settings unless overridden.
    timeout: 1000,
    auth: auth,
  });
  return google.speech({ version: 'v1', auth });
};
