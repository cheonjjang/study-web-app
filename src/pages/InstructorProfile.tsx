import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { instructors, courses } from '../data/sampleData';
import './InstructorProfile.css';

const InstructorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'courses' | 'about' | 'reviews'>('courses');
  
  const instructor = instructors.find(i => i.id === parseInt(id || '0'));
  
  if (!instructor) {
    return (
      <div className="instructor-profile">
        <div className="container">
          <div className="not-found">
            <h2>강사를 찾을 수 없습니다</h2>
            <Link to="/" className="btn btn-primary">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  const instructorCourses = courses.filter(c => c.instructorId === instructor.id);
  const totalStudents = instructorCourses.reduce((sum, course) => sum + course.enrolledStudents, 0);
  const averageRating = instructorCourses.reduce((sum, course) => sum + course.rating, 0) / instructorCourses.length;

  // 샘플 리뷰 데이터
  const reviews = [
    {
      id: 1,
      studentName: "김학생",
      studentAvatar: "👨‍🎓",
      rating: 5,
      comment: "정말 도움이 되는 강의였습니다. 실무 경험이 풍부하셔서 이해하기 쉬웠어요!",
      courseTitle: "React 기초부터 실전까지",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      studentName: "이개발자",
      studentAvatar: "👩‍💻",
      rating: 5,
      comment: "강사님이 설명을 정말 잘해주셔서 초보자도 쉽게 따라할 수 있었습니다.",
      courseTitle: "JavaScript 완벽 가이드",
      createdAt: "2024-01-12"
    },
    {
      id: 3,
      studentName: "박프론트",
      studentAvatar: "👨‍💼",
      rating: 4,
      comment: "실무에서 바로 쓸 수 있는 팁들이 많아서 좋았습니다.",
      courseTitle: "Vue.js 마스터 클래스",
      createdAt: "2024-01-10"
    }
  ];

  return (
    <div className="instructor-profile">
      <div className="container">
        <div className="instructor-header">
          <div className="instructor-info">
            <div className="instructor-avatar">
              <img src={instructor.profileImage} alt={instructor.name} />
            </div>
            <div className="instructor-details">
              <h1>{instructor.name}</h1>
              <p className="instructor-title">{instructor.title}</p>
              <p className="instructor-bio">{instructor.description}</p>
              
              <div className="instructor-stats">
                <div className="stat-item">
                  <span className="stat-number">{instructorCourses.length}</span>
                  <span className="stat-label">강의 수</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{totalStudents.toLocaleString()}</span>
                  <span className="stat-label">총 수강생</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{averageRating.toFixed(1)}</span>
                  <span className="stat-label">평균 평점</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{instructor.career.length}</span>
                  <span className="stat-label">경력</span>
                </div>
              </div>
              
              <div className="instructor-skills">
                <h3>전문 분야</h3>
                <div className="skills-list">
                  {instructor.specialties.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="instructor-actions">
            <button className="btn-follow">팔로우</button>
            <button className="btn-message">메시지 보내기</button>
            <button className="btn-share">공유하기</button>
          </div>
        </div>

        <div className="instructor-tabs">
          <button 
            className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            강의 목록 ({instructorCourses.length})
          </button>
          <button 
            className={`tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            소개
          </button>
          <button 
            className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            수강생 리뷰 ({reviews.length})
          </button>
        </div>

        <div className="instructor-content">
          {activeTab === 'courses' && (
            <div className="courses-section">
              <div className="courses-grid">
                {instructorCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-thumbnail">
                      <img src={course.thumbnail} alt={course.title} />
                      {course.discount && (
                        <div className="discount-badge">{course.discount}% 할인</div>
                      )}
                      {course.isLive && (
                        <div className="live-badge">LIVE</div>
                      )}
                    </div>
                    
                    <div className="course-content">
                      <div className="course-category">{course.category}</div>
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      
                      <div className="course-meta">
                        <span className="level">{course.level}</span>
                        <span className="duration">{course.duration}</span>
                        <span className="rating">⭐ {course.rating}</span>
                        <span className="students">👥 {course.enrolledStudents}</span>
                      </div>
                      
                      <div className="course-price">
                        {course.price === 0 ? (
                          <span className="free">무료</span>
                        ) : (
                          <>
                            <span className="current-price">₩{course.price.toLocaleString()}</span>
                            {course.originalPrice && (
                              <span className="original-price">₩{course.originalPrice.toLocaleString()}</span>
                            )}
                          </>
                        )}
                      </div>
                      
                      <div className="course-actions">
                        <Link to={`/course/${course.id}`} className="btn-primary">
                          강의 보기
                        </Link>
                        <Link to={`/player/${course.id}`} className="btn-secondary">
                          시청하기
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="about-section">
              <div className="about-content">
                <div className="about-card">
                  <h3>강사 소개</h3>
                  <p>{instructor.description}</p>
                  <p>
                    {instructor.name} 강사님은 {instructor.career.length}년간의 풍부한 실무 경험을 바탕으로 
                    실용적이고 체계적인 강의를 제공합니다. 특히 {instructor.specialties.join(', ')} 분야에서 
                    전문성을 인정받고 있으며, 많은 수강생들이 실제 업무에 바로 적용할 수 있는 
                    고품질의 교육 콘텐츠를 제공하고 있습니다.
                  </p>
                </div>
                
                <div className="about-card">
                  <h3>경력 및 자격</h3>
                  <ul className="career-list">
                    <li>🏢 {instructor.career.length}년간 실무 경험</li>
                    <li>🎓 {instructor.education}</li>
                    <li>🏆 다수의 기술 자격증 보유</li>
                    <li>📚 저서: "실무에 바로 쓰는 프론트엔드 개발"</li>
                    <li>🎤 국내외 기술 컨퍼런스 발표 다수</li>
                  </ul>
                </div>
                
                <div className="about-card">
                  <h3>강의 철학</h3>
                  <blockquote>
                    "단순히 기술을 가르치는 것이 아니라, 실무에서 바로 활용할 수 있는 
                    실용적인 지식을 전달하는 것이 저의 목표입니다. 모든 수강생이 
                    강의를 통해 성장하고 발전할 수 있도록 최선을 다하겠습니다."
                  </blockquote>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <div className="reviews-summary">
                <div className="rating-overview">
                  <div className="average-rating">
                    <span className="rating-number">{averageRating.toFixed(1)}</span>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(averageRating) ? 'filled' : ''}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="rating-count">{reviews.length}개 리뷰</span>
                  </div>
                </div>
              </div>
              
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <span className="reviewer-avatar">{review.studentAvatar}</span>
                        <div className="reviewer-details">
                          <span className="reviewer-name">{review.studentName}</span>
                          <span className="review-course">{review.courseTitle}</span>
                        </div>
                      </div>
                      <div className="review-meta">
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="review-date">{review.createdAt}</span>
                      </div>
                    </div>
                    
                    <div className="review-content">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;