import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './CourseDetail.css';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === parseInt(id || '1'));
  const instructor = course ? instructors.find(i => i.id === course.instructorId) : null;

  if (!course || !instructor) {
    return (
      <div className="course-detail">
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
    <div className="course-detail">
      <div className="container">
        <div className="course-header">
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
            {course.discount && (
              <div className="discount-badge">
                {course.discount}% 할인
              </div>
            )}
            {course.isLive && (
              <div className="live-badge">LIVE</div>
            )}
          </div>
          <div className="course-info">
            <h1>{course.title}</h1>
            <p className="instructor">강사: {instructor.name}</p>
            <p className="description">{course.description}</p>
            
            <div className="course-meta">
              <span className="level">{course.level}</span>
              <span className="duration">{course.duration}</span>
              <span className="category">{course.category}</span>
            </div>
            
            <div className="course-stats">
              <span className="rating">⭐ {course.rating} ({course.reviews}개 리뷰)</span>
              <span className="students">👥 {course.enrolledStudents}명 수강</span>
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
              {course.isLive && (
                <Link to={`/live/${course.id}`} className="btn btn-primary">
                  실시간 강의 참여
                </Link>
              )}
              {course.price > 0 ? (
                <Link to={`/payment/${course.id}`} className="btn btn-primary">
                  강의 구매하기
                </Link>
              ) : (
                <button className="btn btn-primary">
                  무료 강의 시작하기
                </button>
              )}
              <Link to={`/instructor/${instructor.id}`} className="btn btn-outline">
                강사 프로필 보기
              </Link>
            </div>
          </div>
        </div>

        <div className="course-content">
          <div className="content-main">
            <div className="section">
              <h2>강의 소개</h2>
              <p>{course.description}</p>
              <p>
                이 강의는 {instructor.name} 강사님이 직접 진행하는 고품질 온라인 강의입니다. 
                실무 경험을 바탕으로 한 실용적인 내용과 체계적인 커리큘럼으로 구성되어 있습니다.
              </p>
            </div>

            <div className="section">
              <h2>강의 커리큘럼</h2>
              <div className="curriculum">
                <div className="curriculum-item">
                  <h4>1주차: 기초 이론</h4>
                  <p>강의의 기본 개념과 이론을 학습합니다.</p>
                </div>
                <div className="curriculum-item">
                  <h4>2주차: 실습 환경 구축</h4>
                  <p>실습을 위한 환경을 설정하고 기본 도구를 익힙니다.</p>
                </div>
                <div className="curriculum-item">
                  <h4>3-4주차: 핵심 기능 학습</h4>
                  <p>강의의 핵심 기능들을 단계별로 학습합니다.</p>
                </div>
                <div className="curriculum-item">
                  <h4>5-6주차: 실무 프로젝트</h4>
                  <p>실제 프로젝트를 통해 배운 내용을 적용해봅니다.</p>
                </div>
                <div className="curriculum-item">
                  <h4>7-8주차: 고급 기능 및 마무리</h4>
                  <p>고급 기능을 학습하고 프로젝트를 완성합니다.</p>
                </div>
              </div>
            </div>

            <div className="section">
              <h2>강사 소개</h2>
              <div className="instructor-card">
                <img src={instructor.profileImage} alt={instructor.name} className="instructor-image" />
                <div className="instructor-info">
                  <h3>{instructor.name}</h3>
                  <p className="instructor-title">{instructor.title}</p>
                  <p className="instructor-description">{instructor.description}</p>
                  <div className="instructor-specialties">
                    {instructor.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-sidebar">
            <div className="sidebar-card">
              <h3>강의 정보</h3>
              <div className="info-item">
                <span className="label">강사</span>
                <span className="value">{instructor.name}</span>
              </div>
              <div className="info-item">
                <span className="label">난이도</span>
                <span className="value">{course.level}</span>
              </div>
              <div className="info-item">
                <span className="label">기간</span>
                <span className="value">{course.duration}</span>
              </div>
              <div className="info-item">
                <span className="label">카테고리</span>
                <span className="value">{course.category}</span>
              </div>
              <div className="info-item">
                <span className="label">수강생</span>
                <span className="value">{course.enrolledStudents}명</span>
              </div>
              <div className="info-item">
                <span className="label">평점</span>
                <span className="value">⭐ {course.rating}</span>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>수강 혜택</h3>
              <ul className="benefits-list">
                <li>✅ 평생 수강 가능</li>
                <li>✅ 모바일/PC 어디서나 수강</li>
                <li>✅ 수강증명서 발급</li>
                <li>✅ 질문/답변 게시판 이용</li>
                <li>✅ 추가 자료 제공</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
