// import { Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
} from '@vidstack/react';
export default function Home() {
  return (
    <>
      <div>
        <span>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </span>
        <span>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </span>
      </div>
      <h2>Video Streaming</h2>
      {/* <video controls width={500}>
        <source
          src="http://localhost:4000/static/video-stream/e9d61215af15c3f435c3e1800.mp4"
          type="video/mp4"
        />
      </video> */}
      <h2>HLS Streaming</h2>
      <MediaPlayer
        title="Sprite Fight"
        src="http://localhost:4000/api/v1/file/video-hls/ZLI2Z6UgVQBued_Wqnt_T/master.m3u8"
        // poster='https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980'
        // thumbnails='https://media-files.vidstack.io/sprite-fight/thumbnails.vtt'
        aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet>
          <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
          {/* <track
            src='https://media-files.vidstack.io/sprite-fight/subs/english.vtt'
            label='English'
            srcLang='en-US'
            kind='subtitles'
            default
          /> */}
          {/* <track
            src='https://media-files.vidstack.io/sprite-fight/chapters.vtt'
            srcLang='en-US'
            kind='chapters'
            default
          /> */}
        </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer>
    </>
  );
}
