import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './EbookDetail.css';

const EbookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '1');
  const course = courses.find(c => c.id === courseId);
  const instructor = instructors.find(i => i.id === course?.instructorId);

  if (!course || !course.hasEbook) {
    return (
      <div className="ebook-detail">
        <div className="container">
          <div className="error-message">
            <h1>전자책을 찾을 수 없습니다</h1>
            <p>요청하신 전자책이 존재하지 않거나 더 이상 판매되지 않습니다.</p>
            <Link to="/courses" className="btn btn-primary">
              강의 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ebook-detail">
      <div className="container">
        {/* Header */}
        <div className="ebook-header">
          <div className="breadcrumb">
            <Link to="/">홈</Link>
            <span> / </span>
            <Link to="/courses">강의 목록</Link>
            <span> / </span>
            <span>전자책</span>
          </div>
          <h1 className="ebook-title">{course.title} - 전자책</h1>
        </div>

        {/* Main Content */}
        <div className="ebook-content">
          <div className="ebook-main">
            {/* Cover Image */}
            <div className="ebook-cover">
              <img src={course.thumbnail} alt={course.title} />
              <div className="ebook-badge">
                <span className="badge-icon">📚</span>
                <span>전자책</span>
              </div>
            </div>

            {/* Ebook Info */}
            <div className="ebook-info">
              <div className="instructor-info">
                <img src={instructor?.profileImage} alt={instructor?.name} className="instructor-avatar" />
                <div className="instructor-details">
                  <h3>{instructor?.name} 강사</h3>
                  <p>{instructor?.title}</p>
                </div>
              </div>

              <div className="ebook-description">
                <h2>전자책 소개</h2>
                <p>{course.description}</p>
                <p>이 전자책은 강의 내용을 바탕으로 더욱 체계적으로 정리된 학습 자료입니다. 언제 어디서나 편리하게 학습하실 수 있습니다.</p>
              </div>

              <div className="ebook-features">
                <h3>전자책 특징</h3>
                <ul>
                  <li>📱 모바일 최적화된 레이아웃</li>
                  <li>🔍 검색 기능 지원</li>
                  <li>📝 메모 및 하이라이트 기능</li>
                  <li>💾 오프라인 다운로드 가능</li>
                  <li>🔄 업데이트 무료 제공</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="ebook-sidebar">
            <div className="purchase-card">
              <div className="price-section">
                <div className="current-price">₩{course.ebookPrice?.toLocaleString()}</div>
                <div className="original-price">정가 ₩{(course.ebookPrice! * 1.5).toLocaleString()}</div>
                <div className="discount-badge">33% 할인</div>
              </div>

              <div className="purchase-actions">
                <Link to={`/ebook-payment/${course.id}`} className="btn btn-primary btn-large">
                  <span className="btn-icon">🛒</span>
                  전자책 구매하기
                </Link>
                <button className="btn btn-outline btn-large">
                  <span className="btn-icon">👀</span>
                  미리보기
                </button>
              </div>

              <div className="purchase-info">
                <div className="info-item">
                  <span className="info-label">포맷</span>
                  <span className="info-value">PDF, EPUB</span>
                </div>
                <div className="info-item">
                  <span className="info-label">페이지</span>
                  <span className="info-value">약 200페이지</span>
                </div>
                <div className="info-item">
                  <span className="info-label">언어</span>
                  <span className="info-value">한국어</span>
                </div>
                <div className="info-item">
                  <span className="info-label">업데이트</span>
                  <span className="info-value">무료 제공</span>
                </div>
              </div>
            </div>

            <div className="related-course">
              <h3>관련 강의</h3>
              <div className="course-card-mini">
                <img src={course.thumbnail} alt={course.title} />
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>{course.level} • {course.duration}</p>
                  <div className="course-price">
                    {course.price === 0 ? (
                      <span className="free">무료</span>
                    ) : (
                      <span className="price">₩{course.price.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>
              <Link to={`/course/${course.id}`} className="btn btn-outline btn-small">
                강의 보기
              </Link>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="table-of-contents">
          <h2>목차</h2>
          <div className="toc-grid">
            <div className="toc-section">
              <h3>1부. 기초 이론</h3>
              <ul>
                <li>1장. {course.category}의 기본 개념</li>
                <li>2장. 핵심 원리 이해하기</li>
                <li>3장. 실무 적용 방법</li>
              </ul>
            </div>
            <div className="toc-section">
              <h3>2부. 실전 적용</h3>
              <ul>
                <li>4장. 단계별 실습 가이드</li>
                <li>5장. 고급 기법 활용</li>
                <li>6장. 문제 해결 방법</li>
              </ul>
            </div>
            <div className="toc-section">
              <h3>3부. 마스터하기</h3>
              <ul>
                <li>7장. 전문가 수준으로 발전</li>
                <li>8장. 지속적인 학습 방법</li>
                <li>9장. 실무 프로젝트 사례</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookDetail;
