import { useState, useEffect } from 'react';
import { createGoogleSpeechToText } from './createGoogleSpeechToText';

interface ITranscription {
  transcription: string;
  error: Error | null;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
}

export const useGoogleSpeechToText = (): ITranscription => {
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isListening, setIsListening] = useState(false);

  let speechToText;
  let listener: { stop: () => void };

  const startListening = async () => {
    try {
      speechToText = await createGoogleSpeechToText();
      listener = speechToText.listen(
        (transcription: string) => {
          setTranscription(transcription);
        },
        {
          interimResults: true,
        }
      );
      setIsListening(true);
    } catch (err) {
      setError(err as Error);
    }
  };

  const stopListening = async () => {
    try {
      listener.stop();
      setIsListening(false);
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    return () => {
      if (listener) {
        listener.stop();
      }
    };
  }, []);

  return { transcription, error, isListening, startListening, stopListening };
};
