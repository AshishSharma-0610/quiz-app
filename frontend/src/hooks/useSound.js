import { useCallback } from 'react';

export const useSound = () => {
  // playSound function that generates sound based on frequency and duration
  const playSound = useCallback((frequency, duration) => {
    // Create a new audio context (necessary for generating sound)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an oscillator (used to generate sound waves)
    const oscillator = audioContext.createOscillator();

    // Create a gain node (used to control the volume of the sound)
    const gainNode = audioContext.createGain();

    // Connect the oscillator to the gain node, and the gain node to the audio context's destination (the speakers)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set the frequency of the oscillator to the provided value (frequency controls pitch)
    oscillator.frequency.value = frequency;

    // Start the oscillator (starts playing the sound)
    oscillator.start();

    // Set the initial gain (volume) of the sound to a low value
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    // Gradually reduce the gain to silence over the given duration (exponential fade-out)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    // Stop the oscillator after the specified duration and close the audio context
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, duration * 1000); // duration in seconds, multiplied by 1000 to convert to milliseconds
  }, []);

  // Function to play a "correct" sound (high frequency, short duration)
  const playCorrect = useCallback(() => {
    playSound(800, 0.15); // 800 Hz frequency for 0.15 seconds
  }, [playSound]);

  // Function to play an "incorrect" sound (low frequency, short duration)
  const playIncorrect = useCallback(() => {
    playSound(300, 0.15); // 300 Hz frequency for 0.15 seconds
  }, [playSound]);

  // Function to play a "complete" sound (a two-tone sound indicating completion)
  const playComplete = useCallback(() => {
    playSound(600, 0.3); // 600 Hz frequency for 0.3 seconds
    setTimeout(() => playSound(800, 0.3), 300); // Followed by 800 Hz after 300ms
  }, [playSound]);

  // Return the functions that can be used elsewhere in the app
  return { playCorrect, playIncorrect, playComplete };
};
