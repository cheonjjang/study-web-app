import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './CoursePlayer.css';

interface CoursePlayerProps {}

const CoursePlayer: React.FC<CoursePlayerProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const course = courses.find(c => c.id === parseInt(id || '0'));
  
  if (!course) {
    return (
      <div className="course-not-found">
        <h2>강의를 찾을 수 없습니다</h2>
        <Link to="/" className="back-home-btn">홈으로 돌아가기</Link>
      </div>
    );
  }

  const instructor = instructors.find(i => i.id === course.instructorId);

  // 샘플 비디오 데이터 (실제로는 서버에서 가져옴)
  const videoList = [
    {
      id: 1,
      title: "강의 소개 및 목표",
      duration: "5:30",
      description: "이 강의에서 배울 내용과 목표를 소개합니다.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
      id: 2,
      title: "기초 이론 학습",
      duration: "12:45",
      description: "핵심 이론과 개념을 학습합니다.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
      id: 3,
      title: "실습 및 예제",
      duration: "18:20",
      description: "실제 예제를 통해 실습해봅니다.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
      id: 4,
      title: "고급 기법",
      duration: "15:10",
      description: "고급 기법과 팁을 배웁니다.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    },
    {
      id: 5,
      title: "마무리 및 정리",
      duration: "8:15",
      description: "학습 내용을 정리하고 마무리합니다.",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    }
  ];

  const currentVideoData = videoList[currentVideo];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const nextVideo = () => {
    if (currentVideo < videoList.length - 1) {
      setCurrentVideo(currentVideo + 1);
      setProgress(0);
    }
  };

  const prevVideo = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
      setProgress(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="course-player">
      <div className="player-container">
        <div className="video-section">
          <div className="video-wrapper">
            <video 
              className="main-video"
              src={currentVideoData.videoUrl}
              poster={course.thumbnail}
              controls={false}
              onMouseMove={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              브라우저가 비디오를 지원하지 않습니다.
            </video>
            
            {showControls && (
              <div className="video-controls">
                <div className="progress-bar">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="progress-slider"
                  />
                </div>
                
                <div className="control-buttons">
                  <div className="left-controls">
                    <button className="control-btn" onClick={prevVideo} disabled={currentVideo === 0}>
                      ⏮️
                    </button>
                    <button className="control-btn play-btn" onClick={handlePlayPause}>
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <button className="control-btn" onClick={nextVideo} disabled={currentVideo === videoList.length - 1}>
                      ⏭️
                    </button>
                    <div className="volume-control">
                      <span>🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                      />
                    </div>
                  </div>
                  
                  <div className="right-controls">
                    <span className="time-display">
                      {formatTime(progress * 100)} / {currentVideoData.duration}
                    </span>
                    <button className="control-btn" onClick={handleFullscreen}>
                      {isFullscreen ? '⤓' : '⤢'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="video-info">
            <h1 className="video-title">{currentVideoData.title}</h1>
            <p className="video-description">{currentVideoData.description}</p>
            <div className="course-meta">
              <span className="course-name">{course.title}</span>
              <span className="instructor-name">{instructor?.name}</span>
              <span className="video-duration">{currentVideoData.duration}</span>
            </div>
          </div>
        </div>
        
        <div className="sidebar">
          <div className="course-info">
            <h2>{course.title}</h2>
            <p className="course-description">{course.description}</p>
            <div className="course-stats">
              <span>⭐ {course.rating} ({course.students}명 수강)</span>
              <span>📚 {course.level}</span>
              <span>⏱️ {course.duration}</span>
            </div>
          </div>
          
          <div className="video-playlist">
            <h3>강의 목록</h3>
            <div className="playlist-items">
              {videoList.map((video, index) => (
                <div 
                  key={video.id}
                  className={`playlist-item ${index === currentVideo ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentVideo(index);
                    setProgress(0);
                  }}
                >
                  <div className="video-thumbnail">
                    <span className="play-icon">▶️</span>
                  </div>
                  <div className="video-details">
                    <h4>{video.title}</h4>
                    <p>{video.duration}</p>
                  </div>
                  {index === currentVideo && <span className="current-indicator">현재 재생</span>}
                </div>
              ))}
            </div>
          </div>
          
          <div className="course-actions">
            <button className="btn-primary">강의 수강하기</button>
            <button className="btn-secondary">찜하기</button>
            <button className="btn-outline">공유하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
