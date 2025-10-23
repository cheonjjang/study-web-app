import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/sampleData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounterAnimation } from '../hooks/useCounterAnimation';
import './Home.css';

const Home: React.FC = () => {
  const featuredCourses = courses.slice(0, 3);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // 카운팅 애니메이션 훅들
  const studentsCounter = useCounterAnimation({ end: 1250, suffix: '+', duration: 2000 });
  const coursesCounter = useCounterAnimation({ end: 50, suffix: '+', duration: 1500 });
  const ratingCounter = useCounterAnimation({ end: 4.9, decimals: 1, duration: 1800 });
  
  // 각 섹션에 대한 ref 생성
  const heroRef = useScrollAnimation();
  const coursesHeaderRef = useScrollAnimation();
  const course1Ref = useScrollAnimation();
  const course2Ref = useScrollAnimation();
  const course3Ref = useScrollAnimation();
  const featuresHeaderRef = useScrollAnimation();
  const feature1Ref = useScrollAnimation();
  const feature2Ref = useScrollAnimation();
  const feature3Ref = useScrollAnimation();
  const feature4Ref = useScrollAnimation();
  const feature5Ref = useScrollAnimation();
  const feature6Ref = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 맨 위로 스크롤
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="container">
          <div className="hero-content scroll-animate" ref={heroRef}>
            <div className="hero-badge">
              <span className="badge-icon">🎓</span>
              <span>전문 강사진과 함께하는 프리미엄 강의</span>
            </div>
            <h1 className="hero-title">
              <span className="gradient-text">에듀허브</span>에서<br />
              <span className="hero-subtitle">나만의 전문성을 키워보세요</span>
            </h1>
            <p className="hero-description">
              실무 경험이 풍부한 전문 강사들과 함께하는 실시간 온라인 강의 플랫폼입니다.<br />
              마케팅, 프로그래밍, 뷰티 등 다양한 분야의 고품질 강의를 만나보세요.
            </p>
            <div className="hero-stats">
              <div className="stat-item" ref={studentsCounter.ref}>
                <div className="stat-number">{studentsCounter.count}</div>
                <div className="stat-label">수강생</div>
              </div>
              <div className="stat-item" ref={coursesCounter.ref}>
                <div className="stat-number">{coursesCounter.count}</div>
                <div className="stat-label">강의</div>
              </div>
              <div className="stat-item" ref={ratingCounter.ref}>
                <div className="stat-number">{ratingCounter.count}</div>
                <div className="stat-label">평점</div>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-primary">
                <span className="btn-icon">🚀</span>
                강의 둘러보기
              </Link>
              <Link to="/instructor/1" className="btn btn-secondary">
                <span className="btn-icon">👨‍🏫</span>
                강사 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses - New Clean Structure */}
      <section className="featured-courses-new">
        <div className="container">
          <div className="section-header scroll-animate" ref={coursesHeaderRef}>
            <h2 className="section-title">🔥 인기 강의</h2>
            <p className="section-subtitle">지금 가장 인기 있는 강의들을 만나보세요</p>
            <Link to="/courses" className="view-all-btn">
              전체 강의 보기
              <span className="arrow">→</span>
            </Link>
          </div>
          <div className="courses-wrapper">
            {featuredCourses.map((course, index) => (
              <div 
                key={course.id} 
                className="course-card-new scroll-animate" 
                ref={index === 0 ? course1Ref : index === 1 ? course2Ref : course3Ref}
              >
                <div className="card-image">
                  <img src={course.thumbnail} alt={course.title} />
                  {course.discount && (
                    <div className="discount-label">
                      {course.discount}% 할인
                    </div>
                  )}
                  {course.isLive && (
                    <div className="live-label">
                      <div className="live-dot"></div>
                      LIVE
                    </div>
                  )}
                </div>
                <div className="card-content">
                  <div className="category-badge">{course.category}</div>
                  <h3 className="card-title">{course.title}</h3>
                  <div className="instructor-info">
                    <span className="instructor-icon">👨‍🏫</span>
                    {course.instructorId === 1 ? '최성혜' : '김개발'} 강사
                  </div>
                  <p className="card-description">{course.description}</p>
                  <div className="course-meta">
                    <span className="level-tag">{course.level}</span>
                    <span className="duration-tag">{course.duration}</span>
                    <span className="students-count">{course.enrolledStudents}명 수강</span>
                  </div>
                  <div className="rating-info">
                    <span className="star-rating">⭐⭐⭐⭐⭐</span>
                    <span className="rating-text">{course.rating} ({course.reviews}개 리뷰)</span>
                  </div>
                  
                  <div className="pricing-info">
                    <div className="price-section">
                      {course.price === 0 ? (
                        <span className="free-label">무료</span>
                      ) : (
                        <>
                          <span className="price-current">₩{course.price.toLocaleString()}</span>
                          {course.originalPrice && (
                            <span className="price-original">₩{course.originalPrice.toLocaleString()}</span>
                          )}
                        </>
                      )}
                    </div>
                    {course.hasEbook && (
                      <div className="ebook-info">
                        <span className="ebook-icon">📚</span>
                        <span className="ebook-price">전자책 ₩{course.ebookPrice?.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="button-group">
                    <Link to={`/course/${course.id}`} className="btn-detail">
                      자세히 보기
                    </Link>
                    <Link 
                      to={course.isLive ? `/live/${course.id}` : '#'} 
                      className={`btn-live ${!course.isLive ? 'btn-disabled' : ''}`}
                    >
                      실시간 강의
                    </Link>
                    <Link 
                      to={course.hasEbook ? `/ebook/${course.id}` : '#'} 
                      className={`btn-ebook ${!course.hasEbook ? 'btn-disabled' : ''}`}
                    >
                      전자책 구매
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="section-header scroll-animate" ref={featuresHeaderRef}>
            <h2 className="section-title">왜 에듀허브를 선택해야 할까요?</h2>
            <p className="section-subtitle">프리미엄 강의 경험을 위한 특별한 혜택들</p>
          </div>
          <div className="features-grid">
            <div className="feature-card scroll-animate-scale" ref={feature1Ref}>
              <div className="feature-icon">🎥</div>
              <h3>실시간 강의</h3>
              <p>유튜브와 연동된 실시간 스트리밍으로 생생한 강의를 경험하세요. 질문과 답변이 실시간으로 이루어집니다.</p>
            </div>
            <div className="feature-card scroll-animate-scale" ref={feature2Ref}>
              <div className="feature-icon">👨‍🏫</div>
              <h3>전문 강사진</h3>
              <p>각 분야의 전문가들이 직접 강의하는 고품질 콘텐츠. 실무 경험을 바탕으로 한 실용적인 내용을 제공합니다.</p>
            </div>
            <div className="feature-card scroll-animate-scale" ref={feature3Ref}>
              <div className="feature-icon">💳</div>
              <h3>안전한 결제</h3>
              <p>다양한 결제 수단을 지원하는 안전하고 편리한 결제 시스템으로 언제든지 강의를 구매하세요.</p>
            </div>
            <div className="feature-card scroll-animate-scale" ref={feature4Ref}>
              <div className="feature-icon">📱</div>
              <h3>모바일 최적화</h3>
              <p>언제 어디서나 모바일로 강의를 수강할 수 있습니다. 오프라인 다운로드도 지원합니다.</p>
            </div>
            <div className="feature-card scroll-animate-scale" ref={feature5Ref}>
              <div className="feature-icon">🏆</div>
              <h3>수료증 발급</h3>
              <p>강의 완주 시 수료증을 발급해드립니다. 포트폴리오에 활용하세요.</p>
            </div>
            <div className="feature-card scroll-animate-scale" ref={feature6Ref}>
              <div className="feature-icon">🔄</div>
              <h3>평생 수강</h3>
              <p>한 번 구매한 강의는 평생 수강 가능합니다. 언제든지 복습하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content scroll-animate" ref={ctaRef}>
            <h2>지금 시작하세요!</h2>
            <p>무료 강의부터 시작해서 전문가가 되어보세요</p>
            <div className="cta-buttons">
              <Link to="/courses" className="btn btn-primary">
                무료 강의 시작하기
              </Link>
              <Link to="/instructor/1" className="btn btn-outline">
                강사 소개 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top" 
          onClick={scrollToTop}
          aria-label="맨 위로 스크롤"
        >
          <span className="scroll-icon">↑</span>
        </button>
      )}
    </div>
  );
};

export default Home;
