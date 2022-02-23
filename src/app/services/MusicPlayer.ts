export class MusicPlayer {
  private isPlaying = false;

  private isPaused = false;

  private currentVolume = 1;

  private currentPlaylist = Array<string>();

  private currentTrack = -1;

  private audio = new Audio();

  private isLooping = false;

  getCurrentPlayingTrack() {
    if (this.isPlaying && this.isPaused) {
      return this.currentPlaylist[this.currentTrack];
    }
    return null;
  }

  getIsPaused() {
    return this.isPaused;
  }

  addToPlaylist(srcArray: Array<string>) {
    this.currentPlaylist = this.currentPlaylist.concat(srcArray);
  }

  setPlayList(srcArray: Array<string>, isLooping = false) {
    this.isLooping = isLooping;
    this.stop();
    this.currentPlaylist = srcArray;
    this.currentTrack = -1;
  }

  scrollTrackTo(porc: number) {
    if (this.audio) {
      this.audio.play().then(
        () => {
          this.audio.currentTime = (this.audio.duration / 100) * porc;
        },
        (e) => {
          console.error(e);
        },
      );
    }
  }

  play() {
    if (this.currentPlaylist.length <= 0) {
      return new Promise(() => {});
    }

    if (this.currentTrack === -1) {
      this.currentTrack = 0;
    }
    console.log(this.audio.volume);
    if (!this.isPlaying && !this.isPaused) {
      this.audio.src = this.currentPlaylist[this.currentTrack];
      this.audio.volume = this.currentVolume;

      this.audio.onended = () => {
        if (this.currentTrack < this.currentPlaylist.length - 1) {
          this.stop();
          return this.next();
        }

        if (this.isLooping) {
          this.stop();
          return this.next();
        }
        return null;
      };

      this.isPlaying = true;
      this.isPaused = false;
      return this.audio.play().catch((e) => {
        console.error(e);
        this.isPlaying = false;
      });
    }

    if (this.isPaused) {
      this.isPlaying = true;
      this.isPaused = false;
      return this.audio.play().catch((e) => {
        console.error(e);
        this.isPlaying = false;
      });
    }

    return new Promise(() => {});
  }

  setVolume(value: number) {
    this.currentVolume = value;
    this.audio.volume = value;
  }

  getIsPlayingState() {
    return this.isPlaying;
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPaused = false;
    this.isPlaying = false;
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.isPaused = true;
    }
  }

  prev() {
    this.stop();
    if (this.currentTrack > 0) {
      this.currentTrack--;
    } else {
      this.currentTrack = this.currentPlaylist.length - 1;
    }
    return this.play();
  }

  next() {
    this.stop();
    if (this.currentTrack < this.currentPlaylist.length - 1) {
      this.currentTrack++;
    } else {
      this.currentTrack = 0;
    }
    return this.play();
  }
}
