import { useState, useEffect } from 'react';
import { google } from 'googleapis';
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

    let speechToText:google.speech.v1.Speech;
    let listener: google.Listener;

    const startListening = async () => {
        try {
            speechToText = await createGoogleSpeechToText();
            listener = speechToText.listen((transcription) => {
                setTranscription(transcription);
            }, {
                interimResults: true
            });
            setIsListening(true);
        } catch (err) {
            setError(err);
        }
    };

    const stopListening = async () => {
        try {
            listener.stop();
            setIsListening(false);
        } catch (err) {
            setError(err);
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
