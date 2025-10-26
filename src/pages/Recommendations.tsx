import React, { useState, useEffect } from 'react';
import { courses, instructors } from '../data/sampleData';
import './Recommendations.css';

interface Recommendation {
  id: number;
  title: string;
  reason: string;
  confidence: number;
  course: typeof courses[0];
}

const Recommendations: React.FC = () => {
  const [userPreferences, setUserPreferences] = useState({
    interests: [] as string[],
    skillLevel: 'beginner',
    learningGoals: [] as string[],
    timeAvailable: '1-2 hours',
    preferredInstructors: [] as number[]
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const interestOptions = ['프로그래밍', '마케팅', '디자인', '뷰티', '비즈니스', '언어학습', '음악', '요리'];
  const skillLevels = [
    { value: 'beginner', label: '초급자' },
    { value: 'intermediate', label: '중급자' },
    { value: 'advanced', label: '고급자' }
  ];
  const learningGoals = ['취업준비', '스킬업', '취미활동', '자격증취득', '창업준비', '전문성향상'];
  const timeOptions = ['30분 이하', '1-2 hours', '2-4 hours', '4시간 이상'];

  // 개인화 추천 알고리즘 (샘플)
  const generateRecommendations = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: 1,
          title: "React 기초부터 실전까지",
          reason: "프로그래밍 관심사와 초급자 레벨에 맞는 강의입니다",
          confidence: 95,
          course: courses[0]
        },
        {
          id: 2,
          title: "디지털 마케팅 마스터",
          reason: "마케팅 관심사와 취업준비 목표에 적합합니다",
          confidence: 88,
          course: courses[1]
        },
        {
          id: 3,
          title: "뷰티 아트 전문가 과정",
          reason: "뷰티 관심사와 스킬업 목표에 맞는 고품질 강의입니다",
          confidence: 92,
          course: courses[2]
        },
        {
          id: 4,
          title: "UI/UX 디자인 기초",
          reason: "디자인 관심사와 전문성 향상 목표에 적합합니다",
          confidence: 85,
          course: courses[3]
        },
        {
          id: 5,
          title: "비즈니스 영어 회화",
          reason: "언어학습 관심사와 취업준비 목표에 맞습니다",
          confidence: 78,
          course: courses[4]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#28a745';
    if (confidence >= 80) return '#ffc107';
    return '#dc3545';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return '매우 높음';
    if (confidence >= 80) return '높음';
    return '보통';
  };

  return (
    <div className="recommendations">
      <div className="container">
        <div className="recommendations-header">
          <h1>개인화된 강의 추천</h1>
          <p>AI가 분석한 당신만을 위한 맞춤 강의를 만나보세요</p>
        </div>

        <div className="recommendations-content">
          <div className="preferences-section">
            <div className="preferences-card">
              <h2>학습 선호도 설정</h2>
              <p>더 정확한 추천을 위해 선호도를 설정해주세요</p>
              
              <div className="preference-group">
                <h3>관심 분야</h3>
                <div className="checkbox-grid">
                  {interestOptions.map(interest => (
                    <label key={interest} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={userPreferences.interests.includes(interest)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserPreferences(prev => ({
                              ...prev,
                              interests: [...prev.interests, interest]
                            }));
                          } else {
                            setUserPreferences(prev => ({
                              ...prev,
                              interests: prev.interests.filter(i => i !== interest)
                            }));
                          }
                        }}
                      />
                      <span className="checkbox-label">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="preference-group">
                <h3>현재 실력 수준</h3>
                <div className="radio-group">
                  {skillLevels.map(level => (
                    <label key={level.value} className="radio-item">
                      <input
                        type="radio"
                        name="skillLevel"
                        value={level.value}
                        checked={userPreferences.skillLevel === level.value}
                        onChange={(e) => setUserPreferences(prev => ({
                          ...prev,
                          skillLevel: e.target.value
                        }))}
                      />
                      <span className="radio-label">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="preference-group">
                <h3>학습 목표</h3>
                <div className="checkbox-grid">
                  {learningGoals.map(goal => (
                    <label key={goal} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={userPreferences.learningGoals.includes(goal)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserPreferences(prev => ({
                              ...prev,
                              learningGoals: [...prev.learningGoals, goal]
                            }));
                          } else {
                            setUserPreferences(prev => ({
                              ...prev,
                              learningGoals: prev.learningGoals.filter(g => g !== goal)
                            }));
                          }
                        }}
                      />
                      <span className="checkbox-label">{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="preference-group">
                <h3>주간 학습 가능 시간</h3>
                <div className="radio-group">
                  {timeOptions.map(time => (
                    <label key={time} className="radio-item">
                      <input
                        type="radio"
                        name="timeAvailable"
                        value={time}
                        checked={userPreferences.timeAvailable === time}
                        onChange={(e) => setUserPreferences(prev => ({
                          ...prev,
                          timeAvailable: e.target.value
                        }))}
                      />
                      <span className="radio-label">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                className="btn-analyze"
                onClick={generateRecommendations}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? '분석 중...' : '맞춤 강의 추천받기'}
              </button>
            </div>
          </div>

          <div className="recommendations-section">
            {isAnalyzing ? (
              <div className="analyzing">
                <div className="analyzing-animation">
                  <div className="spinner"></div>
                </div>
                <h3>AI가 당신의 선호도를 분석하고 있습니다...</h3>
                <p>최적의 강의를 찾기 위해 데이터를 분석 중입니다</p>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="recommendations-list">
                <h2>추천 강의</h2>
                <div className="recommendations-grid">
                  {recommendations.map(rec => (
                    <div key={rec.id} className="recommendation-card">
                      <div className="recommendation-header">
                        <div className="confidence-badge" style={{ backgroundColor: getConfidenceColor(rec.confidence) }}>
                          {rec.confidence}% 일치
                        </div>
                        <span className="confidence-label">{getConfidenceLabel(rec.confidence)}</span>
                      </div>
                      
                      <div className="course-thumbnail">
                        <img src={rec.course.thumbnail} alt={rec.course.title} />
                        <div className="course-overlay">
                          <span className="course-category">{rec.course.category}</span>
                        </div>
                      </div>
                      
                      <div className="recommendation-content">
                        <h3>{rec.course.title}</h3>
                        <p className="recommendation-reason">{rec.reason}</p>
                        
                        <div className="course-meta">
                          <span className="instructor">
                            👨‍🏫 {instructors.find(i => i.id === rec.course.instructorId)?.name}
                          </span>
                          <span className="rating">⭐ {rec.course.rating}</span>
                          <span className="students">👥 {rec.course.enrolledStudents}명</span>
                        </div>
                        
                        <div className="course-stats">
                          <span className="level">{rec.course.level}</span>
                          <span className="duration">{rec.course.duration}</span>
                          <span className="price">
                            {rec.course.price === 0 ? '무료' : `₩${rec.course.price.toLocaleString()}`}
                          </span>
                        </div>
                        
                        <div className="recommendation-actions">
                          <button className="btn-primary">강의 보기</button>
                          <button className="btn-secondary">찜하기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3>맞춤 강의를 추천받아보세요</h3>
                <p>선호도를 설정하고 AI 추천을 받아보세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
