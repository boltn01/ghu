import { Howl } from 'howler';
import { useCallback } from 'react';

const sounds = {
  hover: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
    volume: 0.2,
  }),
  click: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'],
    volume: 0.3,
  }),
};

export const useSound = () => {
  const playHover = useCallback(() => {
    sounds.hover.play();
  }, []);

  const playClick = useCallback(() => {
    sounds.click.play();
  }, []);

  return { playHover, playClick };
};