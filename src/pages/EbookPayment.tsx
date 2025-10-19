import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './EbookPayment.css';

const EbookPayment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '1');
  const course = courses.find(c => c.id === courseId);
  const instructor = instructors.find(i => i.id === course?.instructorId);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeTerms, setAgreeTerms] = useState(false);

  if (!course || !course.hasEbook) {
    return (
      <div className="ebook-payment">
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

  const handlePayment = () => {
    if (!agreeTerms) {
      alert('이용약관에 동의해주세요.');
      return;
    }
    alert('결제가 완료되었습니다! 전자책을 다운로드할 수 있습니다.');
  };

  return (
    <div className="ebook-payment">
      <div className="container">
        {/* Header */}
        <div className="payment-header">
          <div className="breadcrumb">
            <Link to="/">홈</Link>
            <span> / </span>
            <Link to="/courses">강의 목록</Link>
            <span> / </span>
            <Link to={`/ebook/${course.id}`}>전자책</Link>
            <span> / </span>
            <span>결제</span>
          </div>
          <h1>전자책 결제</h1>
        </div>

        <div className="payment-content">
          {/* Ebook Summary */}
          <div className="ebook-summary">
            <div className="ebook-cover">
              <img src={course.thumbnail} alt={course.title} />
              <div className="ebook-badge">
                <span className="badge-icon">📚</span>
                <span>전자책</span>
              </div>
            </div>
            <div className="ebook-details">
              <h2>{course.title} - 전자책</h2>
              <p className="instructor">👨‍🏫 {instructor?.name} 강사</p>
              <p className="description">{course.description}</p>
              <div className="ebook-features">
                <span className="feature">📱 모바일 최적화</span>
                <span className="feature">💾 오프라인 다운로드</span>
                <span className="feature">🔄 무료 업데이트</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form">
            <div className="form-section">
              <h3>결제 정보</h3>
              <div className="price-summary">
                <div className="price-item">
                  <span>전자책 가격</span>
                  <span>₩{course.ebookPrice?.toLocaleString()}</span>
                </div>
                <div className="price-item discount">
                  <span>할인</span>
                  <span>-₩{Math.round(course.ebookPrice! * 0.33).toLocaleString()}</span>
                </div>
                <div className="price-item total">
                  <span>총 결제금액</span>
                  <span>₩{course.ebookPrice?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>결제 수단</h3>
              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">💳</span>
                  <span>신용카드</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">🏦</span>
                  <span>계좌이체</span>
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="kakao"
                    checked={paymentMethod === 'kakao'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="method-icon">💛</span>
                  <span>카카오페이</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>구매자 정보</h3>
              <div className="form-group">
                <label>이름</label>
                <input type="text" placeholder="이름을 입력하세요" />
              </div>
              <div className="form-group">
                <label>이메일</label>
                <input type="email" placeholder="이메일을 입력하세요" />
              </div>
              <div className="form-group">
                <label>휴대폰 번호</label>
                <input type="tel" placeholder="휴대폰 번호를 입력하세요" />
              </div>
            </div>

            <div className="form-section">
              <h3>약관 동의</h3>
              <div className="terms">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>구매 및 이용약관에 동의합니다</span>
                </label>
                <div className="terms-links">
                  <a href="#" className="terms-link">구매약관</a>
                  <a href="#" className="terms-link">개인정보처리방침</a>
                  <a href="#" className="terms-link">환불정책</a>
                </div>
              </div>
            </div>

            <div className="payment-actions">
              <button className="btn btn-outline btn-large" onClick={() => window.history.back()}>
                이전으로
              </button>
              <button className="btn btn-primary btn-large" onClick={handlePayment}>
                <span className="btn-icon">💳</span>
                ₩{course.ebookPrice?.toLocaleString()} 결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookPayment;
