import { GlobalConstants } from '../../GlobalConstants';

class MusicPlayer {
  private isPlaying = false;

  private currentVolume = 1;

  private currentPlaylist = Array<string>();

  private currentTrack = -1;

  private audio = new Audio();

  addToPlaylist(srcArray: Array<string>) {
    this.currentPlaylist = this.currentPlaylist.concat(srcArray);
  }

  setPlayList(srcArray: Array<string>) {
    this.currentPlaylist = srcArray;
    console.log(this.currentPlaylist);
  }

  public scrollTrackTo(porc: number) {
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

  public switchPlay() {
    console.log('gg');
    if (this.currentPlaylist.length === 0) {
      return;
    }
    if (this.currentTrack === -1) {
      this.currentTrack = 0;
    }
    if (!this.isPlaying) {
      this.audio.currentTime = 0;
      this.audio.volume = this.currentVolume;
      this.audio.src = `${GlobalConstants.DEFAULT_API_URL}/${this.currentPlaylist[this.currentTrack]}`;
      this.audio.addEventListener('ended', () => {
        if (this.currentTrack < this.currentPlaylist.length - 1) {
          this.isPlaying = !this.isPlaying;
          this.stop();
          this.next();
        }
      });

      this.audio.play().then(
        () => {
        },
        (e) => {
          console.error(e);
          this.isPlaying = false;
        },
      );
    } else {
      if (this.audio) {
        this.audio.pause();
      }
      this.isPlaying = !this.isPlaying;
    }
  }

  public play() {
    if (!this.isPlaying) {
      this.stop();
      this.switchPlay();
    }
  }

  public setVoulume(value: number) {
    this.currentVolume = value;
    this.audio.volume = value;
  }

  getIsPlayingState() {
    return this.isPlaying;
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  prev() {
    this.stop();
    if (this.currentTrack > 0) {
      this.currentTrack--;
    } else {
      this.currentTrack = this.currentPlaylist.length - 1;
    }
    this.switchPlay();
  }

  next() {
    this.stop();
    if (this.currentTrack < this.currentPlaylist.length - 1) {
      this.currentTrack++;
    } else {
      this.currentTrack = 0;
    }
    this.switchPlay();
  }
}

export default MusicPlayer;
