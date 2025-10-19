import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { instructors, courses } from '../data/sampleData';
import './InstructorProfile.css';

const InstructorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const instructorId = parseInt(id || '1');
  const instructor = instructors.find(inst => inst.id === instructorId);
  const instructorCourses = courses.filter(course => course.instructorId === instructorId);

  if (!instructor) {
    return (
      <div className="instructor-profile">
        <div className="container">
          <div className="not-found">
            <h2>강사를 찾을 수 없습니다.</h2>
            <Link to="/" className="btn btn-primary">홈으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="instructor-profile">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-image">
            <img src={instructor.profileImage} alt={instructor.name} />
          </div>
          <div className="profile-info">
            <h1>{instructor.name}</h1>
            <p className="title">{instructor.title}</p>
            <p className="description">{instructor.description}</p>
            <div className="specialties">
              {instructor.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">{specialty}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          <div className="detail-section">
            <h3>기본 정보</h3>
            <div className="detail-item">
              <span className="label">출생</span>
              <span className="value">{instructor.birthdate}</span>
            </div>
            {instructor.pet && (
              <div className="detail-item">
                <span className="label">반려동물</span>
                <span className="value">{instructor.pet}</span>
              </div>
            )}
          </div>

          <div className="detail-section">
            <h3>소속</h3>
            <ul className="affiliation-list">
              {instructor.affiliation.map((affiliation, index) => (
                <li key={index}>{affiliation}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>학력</h3>
            <p className="education">{instructor.education}</p>
          </div>

          <div className="detail-section">
            <h3>경력</h3>
            <ul className="career-list">
              {instructor.career.map((career, index) => (
                <li key={index}>{career}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructor Courses */}
        <div className="instructor-courses">
          <h2>{instructor.name} 강사의 강의</h2>
          <div className="course-grid">
            {instructorCourses.map(course => (
              <div key={course.id} className="course-card">
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
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-meta">
                    <span className="course-level">{course.level}</span>
                    <span className="course-duration">{course.duration}</span>
                    <span className="course-category">{course.category}</span>
                  </div>
                  <div className="course-stats">
                    <span className="rating">⭐ {course.rating}</span>
                    <span className="reviews">({course.reviews}개 리뷰)</span>
                    <span className="students">{course.enrolledStudents}명 수강</span>
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
                    <Link to={`/course/${course.id}`} className="btn btn-outline">
                      자세히 보기
                    </Link>
                    {course.isLive && (
                      <Link to={`/live/${course.id}`} className="btn btn-primary">
                        실시간 강의
                      </Link>
                    )}
                    {course.price > 0 && (
                      <Link to={`/payment/${course.id}`} className="btn btn-primary">
                        구매하기
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
