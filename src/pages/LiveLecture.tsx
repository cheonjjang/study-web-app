import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './LiveLecture.css';

const LiveLecture: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find(c => c.id === parseInt(courseId || '1'));
  const instructor = course ? instructors.find(i => i.id === course.instructorId) : null;
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(1250);

  useEffect(() => {
    // 시뮬레이션: 뷰어 수 업데이트
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!course || !instructor) {
    return (
      <div className="live-lecture">
        <div className="container">
          <div className="not-found">
            <h2>강의를 찾을 수 없습니다.</h2>
            <Link to="/" className="btn btn-primary">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="live-lecture">
      <div className="lecture-container">
        {/* Video Section */}
        <div className="video-section">
          <div className="video-header">
            <div className="live-indicator">
              <div className="live-dot"></div>
              <span>LIVE</span>
            </div>
            <div className="viewer-count">
              👥 {viewerCount.toLocaleString()}명 시청 중
            </div>
          </div>
          
          <div className="video-container">
            {course.youtubeVideoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${course.youtubeVideoId}?autoplay=1&mute=0`}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="video-placeholder">
                <div className="placeholder-content">
                  <h3>실시간 강의</h3>
                  <p>강의가 곧 시작됩니다...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Course Info */}
          <div className="course-info">
            <h2>{course.title}</h2>
            <p className="instructor">강사: {instructor.name}</p>
            <div className="course-meta">
              <span className="level">{course.level}</span>
              <span className="duration">{course.duration}</span>
              <span className="category">{course.category}</span>
            </div>
            <div className="course-stats">
              <span>⭐ {course.rating} ({course.reviews}개 리뷰)</span>
              <span>👥 {course.enrolledStudents}명 수강</span>
            </div>
          </div>

          {/* Chat Section */}
          <div className="chat-section">
            <h3>실시간 채팅</h3>
            <div className="chat-messages">
              <div className="chat-message">
                <span className="username">김학생</span>
                <span className="message">안녕하세요! 강의 잘 듣고 있습니다.</span>
              </div>
              <div className="chat-message">
                <span className="username">박학생</span>
                <span className="message">궁금한 점이 있는데 질문해도 될까요?</span>
              </div>
              <div className="chat-message">
                <span className="username">이학생</span>
                <span className="message">정말 유익한 강의네요!</span>
              </div>
            </div>
            <div className="chat-input">
              <input type="text" placeholder="메시지를 입력하세요..." />
              <button className="btn btn-primary">전송</button>
            </div>
          </div>

          {/* Actions */}
          <div className="lecture-actions">
            <Link to={`/course/${course.id}`} className="btn btn-outline">
              강의 상세보기
            </Link>
            {course.price > 0 && (
              <Link to={`/payment/${course.id}`} className="btn btn-primary">
                강의 구매하기
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveLecture;
