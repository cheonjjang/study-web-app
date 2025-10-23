import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './MyPage.css';

const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  
  // 강사 이름 가져오는 헬퍼 함수
  const getInstructorName = (instructorId: number) => {
    const instructor = instructors.find(inst => inst.id === instructorId);
    return instructor ? instructor.name : '알 수 없음';
  };
  
  // 샘플 데이터 (실제로는 API에서 가져올 데이터)
  const userInfo = {
    name: '김학습',
    email: 'student@example.com',
    joinDate: '2024-01-15',
    totalCourses: 3,
    completedCourses: 1,
    totalStudyTime: 24,
    level: '초급'
  };

  const enrolledCourses = [
    {
      id: 1,
      title: '마케팅 기초 완전정복',
      instructor: '최성혜',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
      progress: 75,
      lastWatched: '2024-01-20',
      totalLessons: 12,
      completedLessons: 9
    },
    {
      id: 2,
      title: 'React 완벽 가이드',
      instructor: '김개발',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center',
      progress: 30,
      lastWatched: '2024-01-18',
      totalLessons: 20,
      completedLessons: 6
    },
    {
      id: 3,
      title: '뷰티 아트 전문가 과정',
      instructor: '최성혜',
      thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center',
      progress: 100,
      lastWatched: '2024-01-22',
      totalLessons: 16,
      completedLessons: 16
    }
  ];

  const favoriteCourses = courses.slice(0, 4);
  const completedCourses = enrolledCourses.filter(course => course.progress === 100);

  const tabs = [
    { id: 'enrolled', label: '수강 중인 강의', count: enrolledCourses.length },
    { id: 'completed', label: '완료한 강의', count: completedCourses.length },
    { id: 'favorites', label: '찜한 강의', count: favoriteCourses.length },
    { id: 'purchases', label: '구매 내역', count: 3 }
  ];

  const renderEnrolledCourses = () => (
    <div className="courses-grid">
      {enrolledCourses.map(course => (
        <div key={course.id} className="course-card">
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
            <div className="progress-overlay">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{course.progress}%</span>
            </div>
          </div>
          <div className="course-content">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-instructor">강사: {course.instructor}</p>
            <div className="course-stats">
              <span className="stat">
                <span className="stat-icon">📚</span>
                {course.completedLessons}/{course.totalLessons}강 완료
              </span>
              <span className="stat">
                <span className="stat-icon">📅</span>
                {course.lastWatched}
              </span>
            </div>
            <div className="course-actions">
              <Link to={`/course/${course.id}`} className="btn btn-primary">
                이어보기
              </Link>
              <button className="btn btn-secondary">
                찜하기
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompletedCourses = () => (
    <div className="courses-grid">
      {completedCourses.map(course => (
        <div key={course.id} className="course-card completed">
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
            <div className="completion-badge">
              <span className="badge-icon">✅</span>
              완료
            </div>
          </div>
          <div className="course-content">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-instructor">강사: {course.instructor}</p>
            <div className="course-stats">
              <span className="stat">
                <span className="stat-icon">📚</span>
                {course.completedLessons}/{course.totalLessons}강 완료
              </span>
              <span className="stat">
                <span className="stat-icon">📅</span>
                {course.lastWatched}
              </span>
            </div>
            <div className="course-actions">
              <Link to={`/course/${course.id}`} className="btn btn-primary">
                다시보기
              </Link>
              <button className="btn btn-secondary">
                수료증
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFavoriteCourses = () => (
    <div className="courses-grid">
      {favoriteCourses.map(course => (
        <div key={course.id} className="course-card">
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
            <button className="favorite-btn active">❤️</button>
          </div>
          <div className="course-content">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-instructor">강사: {getInstructorName(course.instructorId)}</p>
            <div className="course-price">
              {course.price === 0 ? (
                <span className="price free">무료</span>
              ) : (
                <span className="price">₩{course.price.toLocaleString()}</span>
              )}
            </div>
            <div className="course-actions">
              <Link to={`/course/${course.id}`} className="btn btn-primary">
                자세히 보기
              </Link>
              <button className="btn btn-secondary">
                찜하기 해제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPurchases = () => (
    <div className="purchases-list">
      <div className="purchase-item">
        <div className="purchase-info">
          <h4>마케팅 기초 완전정복</h4>
          <p>강사: 최성혜</p>
          <span className="purchase-date">2024-01-15</span>
        </div>
        <div className="purchase-price">₩99,000</div>
        <div className="purchase-status completed">완료</div>
      </div>
      <div className="purchase-item">
        <div className="purchase-info">
          <h4>React 완벽 가이드</h4>
          <p>강사: 김개발</p>
          <span className="purchase-date">2024-01-10</span>
        </div>
        <div className="purchase-price">₩149,000</div>
        <div className="purchase-status enrolled">수강 중</div>
      </div>
      <div className="purchase-item">
        <div className="purchase-info">
          <h4>뷰티 아트 전문가 과정</h4>
          <p>강사: 최성혜</p>
          <span className="purchase-date">2024-01-05</span>
        </div>
        <div className="purchase-price">₩199,000</div>
        <div className="purchase-status completed">완료</div>
      </div>
    </div>
  );

  return (
    <div className="mypage">
      <div className="container">
        {/* 사용자 정보 헤더 */}
        <div className="user-header">
          <div className="user-avatar">
            <div className="avatar-circle">
              <span className="avatar-text">{userInfo.name.charAt(0)}</span>
            </div>
          </div>
          <div className="user-info">
            <h1 className="user-name">{userInfo.name}</h1>
            <p className="user-email">{userInfo.email}</p>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-number">{userInfo.totalCourses}</span>
                <span className="stat-label">수강 강의</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userInfo.completedCourses}</span>
                <span className="stat-label">완료 강의</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userInfo.totalStudyTime}h</span>
                <span className="stat-label">학습 시간</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{userInfo.level}</span>
                <span className="stat-label">레벨</span>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="tabs-container">
          <div className="tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          {activeTab === 'enrolled' && renderEnrolledCourses()}
          {activeTab === 'completed' && renderCompletedCourses()}
          {activeTab === 'favorites' && renderFavoriteCourses()}
          {activeTab === 'purchases' && renderPurchases()}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
