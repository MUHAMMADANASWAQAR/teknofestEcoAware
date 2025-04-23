
// Collection of ambient nature sounds for the EcoAware app
const SOUNDS = {
  // Base ambient sounds
  FOREST: '/sounds/forest-ambient.mp3',
  WATER: '/sounds/water-flowing.mp3',
  BIRDS: '/sounds/birds-chirping.mp3',
  WIND: '/sounds/gentle-wind.mp3',
  
  // Interactive sounds
  CLICK: '/sounds/leaf-rustle.mp3',
  SUCCESS: '/sounds/success-chime.mp3',
  ERROR: '/sounds/soft-error.mp3',
  NOTIFICATION: '/sounds/bell-chime.mp3',
  
  // Special interaction sounds
  TREE_GROW: '/sounds/tree-growing.mp3',
  PORTAL_OPEN: '/sounds/magic-portal.mp3',
  ACHIEVEMENT: '/sounds/achievement.mp3',
};

// Sound instances cache for performance
const soundInstances: Record<string, HTMLAudioElement> = {};
let isMuted = false;
let ambientSoundPlaying: string | null = null;
let ambientVolume = 0.2; // Default ambient volume

// Initialize sound by preloading the most common ones
export const initSounds = () => {
  // Only preload the most essential sounds to save bandwidth
  const essentialSounds = [SOUNDS.CLICK, SOUNDS.SUCCESS, SOUNDS.NOTIFICATION];
  
  essentialSounds.forEach(sound => {
    if (!sound) return; // Skip if sound path doesn't exist
    
    try {
      const audio = new Audio();
      audio.src = sound;
      audio.preload = 'auto';
      audio.volume = 0.3;
      soundInstances[sound] = audio;
      
      // Suppress console errors for missing files in development
      audio.onerror = () => {
        console.log(`Note: Sound file not found: ${sound} - Using the app without sounds.`);
      };
    } catch (error) {
      console.log('Sound system initialization skipped');
    }
  });
};

// Play a one-shot sound effect
export const playSound = (sound: keyof typeof SOUNDS, volume = 0.5) => {
  if (isMuted) return;
  
  const soundPath = SOUNDS[sound];
  if (!soundPath) return;
  
  try {
    let audio = soundInstances[soundPath];
    
    if (!audio) {
      audio = new Audio(soundPath);
      audio.volume = volume;
      soundInstances[soundPath] = audio;
    } else {
      audio.volume = volume;
      audio.currentTime = 0;
    }
    
    // Some browsers block autoplay, so wrap in user gesture handler
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(e => {
        // Autoplay was prevented, will require user interaction first
        console.log('Audio autoplay was prevented by the browser');
      });
    }
  } catch (error) {
    console.log('Sound playback error:', error);
  }
};

// Play a looping ambient sound
export const playAmbient = (sound: keyof typeof SOUNDS, fadeIn = true) => {
  if (isMuted) return;
  
  const soundPath = SOUNDS[sound];
  if (!soundPath) return;
  
  // Stop any currently playing ambient sound
  stopAmbient();
  
  try {
    let audio = soundInstances[soundPath];
    
    if (!audio) {
      audio = new Audio(soundPath);
      soundInstances[soundPath] = audio;
    }
    
    // Set up the ambient sound
    audio.loop = true;
    audio.volume = fadeIn ? 0 : ambientVolume;
    
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(e => {
        console.log('Ambient audio autoplay was prevented');
      });
    }
    
    ambientSoundPlaying = soundPath;
    
    // Gradually fade in the sound
    if (fadeIn) {
      let volume = 0;
      const fadeInterval = setInterval(() => {
        if (volume < ambientVolume) {
          volume += 0.01;
          audio.volume = volume;
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    }
  } catch (error) {
    console.log('Ambient sound playback error:', error);
  }
};

// Stop the currently playing ambient sound
export const stopAmbient = (fadeOut = true) => {
  if (!ambientSoundPlaying) return;
  
  const audio = soundInstances[ambientSoundPlaying];
  if (!audio) return;
  
  if (fadeOut) {
    // Gradually fade out the sound
    const initialVolume = audio.volume;
    let volume = initialVolume;
    const fadeInterval = setInterval(() => {
      if (volume > 0.01) {
        volume -= 0.01;
        audio.volume = volume;
      } else {
        clearInterval(fadeInterval);
        audio.pause();
        audio.currentTime = 0;
      }
    }, 50);
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
  
  ambientSoundPlaying = null;
};

// Toggle mute state for all sounds
export const toggleMute = () => {
  isMuted = !isMuted;
  
  if (isMuted) {
    // Stop any playing sounds
    stopAmbient(false);
    Object.values(soundInstances).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
  
  return isMuted;
};

// Set ambient volume level
export const setAmbientVolume = (volume: number) => {
  ambientVolume = Math.max(0, Math.min(1, volume));
  
  if (ambientSoundPlaying) {
    const audio = soundInstances[ambientSoundPlaying];
    if (audio) audio.volume = ambientVolume;
  }
  
  return ambientVolume;
};

// Clean up all audio resources
export const cleanup = () => {
  stopAmbient(false);
  
  Object.values(soundInstances).forEach(audio => {
    audio.pause();
    audio.src = '';
  });
};

export default {
  SOUNDS,
  initSounds,
  playSound,
  playAmbient,
  stopAmbient,
  toggleMute,
  setAmbientVolume,
  cleanup,
};
