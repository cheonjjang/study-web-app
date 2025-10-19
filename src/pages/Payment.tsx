import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses, instructors } from '../data/sampleData';
import './Payment.css';

const Payment: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find(c => c.id === parseInt(courseId || '1'));
  const instructor = course ? instructors.find(i => i.id === course.instructorId) : null;
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // 실제 결제 로직은 여기에 구현
    setTimeout(() => {
      alert('결제가 완료되었습니다!');
      setIsProcessing(false);
    }, 2000);
  };

  if (!course || !instructor) {
    return (
      <div className="payment">
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
    <div className="payment">
      <div className="container">
        <div className="payment-container">
          <div className="course-summary">
            <h1>강의 결제</h1>
            <div className="course-card">
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.title} />
                {course.discount && (
                  <div className="discount-badge">
                    {course.discount}% 할인
                  </div>
                )}
              </div>
              <div className="course-info">
                <h2>{course.title}</h2>
                <p className="instructor">강사: {instructor.name}</p>
                <p className="description">{course.description}</p>
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
            </div>
          </div>

          <div className="payment-form">
            <h2>결제 정보</h2>
            
            {/* Price Summary */}
            <div className="price-summary">
              <div className="price-item">
                <span>강의료</span>
                <span>₩{course.originalPrice?.toLocaleString() || course.price.toLocaleString()}</span>
              </div>
              {course.discount && course.discount > 0 && (
                <div className="price-item discount">
                  <span>할인 ({course.discount}%)</span>
                  <span>-₩{((course.originalPrice || course.price) - course.price).toLocaleString()}</span>
                </div>
              )}
              <div className="price-item total">
                <span>총 결제금액</span>
                <span>₩{course.price.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="payment-method">
              <h3>결제 수단</h3>
              <div className="method-options">
                <label className="method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💳 신용카드</span>
                </label>
                <label className="method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>🏦 계좌이체</span>
                </label>
                <label className="method-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="kakao"
                    checked={paymentMethod === 'kakao'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💛 카카오페이</span>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="terms">
              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span>개인정보 처리방침 및 이용약관에 동의합니다.</span>
              </label>
              <label className="terms-checkbox">
                <input type="checkbox" required />
                <span>강의 구매 및 환불 정책에 동의합니다.</span>
              </label>
            </div>

            {/* Payment Button */}
            <div className="payment-actions">
              <Link to={`/course/${course.id}`} className="btn btn-outline">
                취소
              </Link>
              <button 
                className="btn btn-primary payment-btn"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? '결제 처리 중...' : `₩${course.price.toLocaleString()} 결제하기`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
