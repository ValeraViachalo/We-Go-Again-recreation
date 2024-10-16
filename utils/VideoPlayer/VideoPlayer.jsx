import React, { useState, useRef, useEffect } from "react";
import s from "./VideoPlayer.module.scss";
import {
  motion,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import ReactPlayer from "react-player";
import clsx from "clsx";

export const VideoPlayer = ({ url, preview = false, customClass = "", ...rest }) => {
  // #region
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const playedMotionValue = useMotionValue(0);
  const volumeMotionValue = useMotionValue(1);
  const clipPathDuration = useTransform(
    playedMotionValue,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      playedMotionValue.set(state.played);
    }
  };

  const handleMuted = () => {
    if (!muted) {
      setMuted(true);
      setVolume(0);
      volumeMotionValue.set(0);
    } else {
      setMuted(false);
      setVolume(1);
      volumeMotionValue.set(1);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    playedMotionValue.set(newValue);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setPlayed(0);
  };

  // #endregion

  return (
    <div
      className={`${s.video_wrapper} ${customClass}`}
      ref={containerRef}
      {...rest}
      onDoubleClick={() => handleFullscreen()}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        className={s.video}
        playing={isPlaying}
        volume={volume}
        muted={muted}
        onEnded={() => handleEnded()}
        playsinline={true}
        progressInterval={100}
        onProgress={handleProgress}
      />
      <div
        className={s.video__play_btn_wrapper}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <svg
          viewBox="0 0 90 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(s.video__play_btn, {
            [s.video__play_btn_playing]: isPlaying,
          })}
        >
          <circle
            cx="45"
            cy="45"
            r="42.2619"
            stroke="white"
            strokeWidth="5.47619"
          />
          <path d="M61 45L36 65V25L61 45Z" fill="white" />
        </svg>
      </div>
      <div
        className={clsx(s.video_control, {
          [s.video_control_not_playing]: !isPlaying && !isFullscreen,
        })}
      >
        <div
          className={s.video__stop_button}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <svg
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34 21L8.5 4.5V37L34 21Z" fill="white" stroke="white" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="4" width="6" height="34" fill="white" />
              <rect x="26" y="4" width="6" height="34" fill="white" />
            </svg>
          )}
        </div>
        <div className={s.video_control__center}>
          <div className={s.video_thumb}>
            <motion.span
              className={s.video__thumb_progress}
              style={{ clipPath: clipPathDuration }}
            />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onTouchStart={handleSeekMouseDown}
              onTouchEnd={handleSeekMouseUp}
              onChange={handleSeekChange}
              className={s.video__thumb_progress_seek}
            />
          </div>
          <div className={s.video_volume}>
            <div
              className={s.video_volume__button}
              onClick={() => handleMuted()}
            ></div>
          </div>
        </div>
        <div className={s.video_fullscreen} onClick={handleFullscreen}></div>
      </div>
    </div>
  );
};
