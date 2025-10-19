import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './CourseList.css';

const CourseList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedLevel, setSelectedLevel] = useState<string>('전체');
  const headerRef = useScrollAnimation();
  const filtersRef = useScrollAnimation();

  const categories = ['전체', '마케팅', '프로그래밍', '뷰티'];
  const levels = ['전체', '초급', '중급', '고급'];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === '전체' || course.category === selectedCategory;
    const levelMatch = selectedLevel === '전체' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getInstructorName = (instructorId: number) => {
    const instructor = instructors.find(inst => inst.id === instructorId);
    return instructor ? instructor.name : '알 수 없음';
  };

  return (
    <div className="course-list">
      <div className="container">
        <div className="page-header scroll-animate" ref={headerRef}>
        <h1>강의 목록</h1>
        <p>다양한 분야의 전문 강의를 만나보세요</p>
      </div>

        {/* Filters */}
        <div className="filters scroll-animate" ref={filtersRef}>
          <div className="filter-group">
            <label>카테고리</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>난이도</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="course-grid">
          {filteredCourses.map((course, index) => (
            <div key={course.id} className="course-card scroll-animate" style={{transitionDelay: `${index * 0.1}s`}}>
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
                <p className="course-instructor">
                  강사: {getInstructorName(course.instructorId)}
                </p>
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
                {course.hasEbook && (
                  <div className="ebook-info">
                    <span className="ebook-icon">📚</span>
                    <span className="ebook-text">전자책 ₩{course.ebookPrice?.toLocaleString()}</span>
                  </div>
                )}
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
                  {course.hasEbook && (
                    <Link to={`/ebook/${course.id}`} className="btn btn-secondary">
                      전자책 구매
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="no-courses">
            <p>선택한 조건에 맞는 강의가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
