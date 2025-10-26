import React, { useState } from 'react';
import { courses, instructors } from '../data/sampleData';
import './Community.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  courseId?: number;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  isSolved?: boolean;
}

interface Comment {
  id: number;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  isInstructor?: boolean;
}

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'qna' | 'discussion' | 'announcement'>('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'qna', courseId: '' });
  const [newComment, setNewComment] = useState('');

  // 샘플 게시글 데이터
  const posts: Post[] = [
    {
      id: 1,
      title: "React Hooks 사용법에 대해 질문드립니다",
      content: "useEffect와 useState를 함께 사용할 때 주의사항이 있나요? 특히 의존성 배열을 어떻게 설정해야 하는지 궁금합니다.",
      author: "김학생",
      authorAvatar: "👨‍🎓",
      category: "qna",
      courseId: 1,
      createdAt: "2024-01-15",
      views: 156,
      likes: 12,
      comments: 8,
      isSolved: true
    },
    {
      id: 2,
      title: "마케팅 강의 후기 - 정말 도움됐어요!",
      content: "박마케팅 강사님의 디지털 마케팅 강의를 수강 완료했습니다. 실무에 바로 적용할 수 있는 내용들이 많아서 정말 유익했어요. 특히 페이스북 광고 설정 부분이 도움됐습니다.",
      author: "이마케터",
      authorAvatar: "👩‍💼",
      category: "discussion",
      courseId: 2,
      createdAt: "2024-01-14",
      views: 89,
      likes: 23,
      comments: 5
    },
    {
      id: 3,
      title: "새로운 강의 출시 안내",
      content: "안녕하세요! 다음 주에 새로운 'AI와 머신러닝 기초' 강의가 출시됩니다. 많은 관심 부탁드립니다.",
      author: "에듀허브",
      authorAvatar: "🎓",
      category: "announcement",
      createdAt: "2024-01-13",
      views: 234,
      likes: 45,
      comments: 12
    },
    {
      id: 4,
      title: "CSS Grid와 Flexbox 차이점이 궁금해요",
      content: "두 레이아웃 방식의 차이점과 언제 어떤 것을 사용해야 하는지 알고 싶습니다. 예시 코드도 있으면 좋겠어요!",
      author: "박개발자",
      authorAvatar: "👨‍💻",
      category: "qna",
      courseId: 3,
      createdAt: "2024-01-12",
      views: 78,
      likes: 6,
      comments: 3,
      isSolved: false
    },
    {
      id: 5,
      title: "뷰티 아트 강의 추천해주세요",
      content: "메이크업 기초부터 배우고 싶은데, 어떤 강의가 좋을까요? 완전 초보자도 따라할 수 있는 강의를 찾고 있어요.",
      author: "최뷰티",
      authorAvatar: "👩‍🎨",
      category: "discussion",
      courseId: 4,
      createdAt: "2024-01-11",
      views: 112,
      likes: 15,
      comments: 7
    }
  ];

  // 샘플 댓글 데이터
  const comments: Comment[] = [
    {
      id: 1,
      content: "useEffect의 의존성 배열은 해당 effect에서 사용하는 모든 변수와 함수를 포함해야 합니다. 빈 배열 []을 사용하면 컴포넌트 마운트 시에만 실행됩니다.",
      author: "박강사",
      authorAvatar: "👨‍🏫",
      createdAt: "2024-01-15",
      likes: 8,
      isInstructor: true
    },
    {
      id: 2,
      content: "저도 같은 질문이 있었는데 박강사님 답변 정말 도움됐어요! 감사합니다.",
      author: "김학생2",
      authorAvatar: "👩‍🎓",
      createdAt: "2024-01-15",
      likes: 3
    }
  ];

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return post.category === activeTab;
  });

  const getCourseTitle = (courseId?: number) => {
    if (!courseId) return '';
    const course = courses.find(c => c.id === courseId);
    return course?.title || '';
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'qna': return 'Q&A';
      case 'discussion': return '토론';
      case 'announcement': return '공지';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'qna': return '#667eea';
      case 'discussion': return '#28a745';
      case 'announcement': return '#ffc107';
      default: return '#6c757d';
    }
  };

  if (selectedPost) {
    return (
      <div className="community">
        <div className="container">
          <div className="post-detail">
            <button className="back-btn" onClick={() => setSelectedPost(null)}>
              ← 목록으로 돌아가기
            </button>
            
            <div className="post-header">
              <div className="post-meta">
                <span 
                  className="category-badge"
                  style={{ backgroundColor: getCategoryColor(selectedPost.category) }}
                >
                  {getCategoryLabel(selectedPost.category)}
                </span>
                {selectedPost.isSolved && <span className="solved-badge">해결됨</span>}
                {selectedPost.courseId && (
                  <span className="course-badge">{getCourseTitle(selectedPost.courseId)}</span>
                )}
              </div>
              <h1>{selectedPost.title}</h1>
              <div className="post-info">
                <div className="author-info">
                  <span className="avatar">{selectedPost.authorAvatar}</span>
                  <span className="author-name">{selectedPost.author}</span>
                </div>
                <div className="post-stats">
                  <span>👁️ {selectedPost.views}</span>
                  <span>👍 {selectedPost.likes}</span>
                  <span>💬 {selectedPost.comments}</span>
                  <span>📅 {selectedPost.createdAt}</span>
                </div>
              </div>
            </div>
            
            <div className="post-content">
              <p>{selectedPost.content}</p>
            </div>
            
            <div className="post-actions">
              <button className="btn-like">👍 좋아요 {selectedPost.likes}</button>
              <button className="btn-share">📤 공유하기</button>
            </div>
            
            <div className="comments-section">
              <h3>댓글 {comments.length}개</h3>
              <div className="comment-form">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="댓글을 작성해주세요..."
                  rows={3}
                />
                <button className="btn-comment">댓글 작성</button>
              </div>
              
              <div className="comments-list">
                {comments.map(comment => (
                  <div key={comment.id} className={`comment ${comment.isInstructor ? 'instructor' : ''}`}>
                    <div className="comment-header">
                      <div className="comment-author">
                        <span className="avatar">{comment.authorAvatar}</span>
                        <span className="author-name">{comment.author}</span>
                        {comment.isInstructor && <span className="instructor-badge">강사</span>}
                      </div>
                      <span className="comment-date">{comment.createdAt}</span>
                    </div>
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>
                    <div className="comment-actions">
                      <button className="btn-like">👍 {comment.likes}</button>
                      <button className="btn-reply">답글</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="community">
      <div className="container">
        <div className="community-header">
          <h1>학습자 커뮤니티</h1>
          <p>강의 관련 질문과 토론을 나누는 공간입니다</p>
        </div>
        
        <div className="community-tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            전체
          </button>
          <button 
            className={`tab ${activeTab === 'qna' ? 'active' : ''}`}
            onClick={() => setActiveTab('qna')}
          >
            Q&A
          </button>
          <button 
            className={`tab ${activeTab === 'discussion' ? 'active' : ''}`}
            onClick={() => setActiveTab('discussion')}
          >
            토론
          </button>
          <button 
            className={`tab ${activeTab === 'announcement' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcement')}
          >
            공지사항
          </button>
        </div>
        
        <div className="community-content">
          <div className="posts-section">
            <div className="posts-header">
              <h2>게시글 목록</h2>
              <button className="btn-new-post">새 글 작성</button>
            </div>
            
            <div className="posts-list">
              {filteredPosts.map(post => (
                <div key={post.id} className="post-item" onClick={() => setSelectedPost(post)}>
                  <div className="post-category">
                    <span 
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(post.category) }}
                    >
                      {getCategoryLabel(post.category)}
                    </span>
                    {post.isSolved && <span className="solved-badge">해결됨</span>}
                  </div>
                  
                  <div className="post-main">
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-preview">{post.content.substring(0, 100)}...</p>
                    
                    <div className="post-meta">
                      <div className="author-info">
                        <span className="avatar">{post.authorAvatar}</span>
                        <span className="author-name">{post.author}</span>
                      </div>
                      {post.courseId && (
                        <span className="course-badge">{getCourseTitle(post.courseId)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="post-stats">
                    <span>👁️ {post.views}</span>
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>📅 {post.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sidebar">
            <div className="quick-stats">
              <h3>커뮤니티 현황</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{posts.length}</span>
                  <span className="stat-label">전체 게시글</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{posts.filter(p => p.category === 'qna').length}</span>
                  <span className="stat-label">Q&A</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{posts.filter(p => p.isSolved).length}</span>
                  <span className="stat-label">해결된 질문</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{posts.reduce((sum, p) => sum + p.comments, 0)}</span>
                  <span className="stat-label">총 댓글</span>
                </div>
              </div>
            </div>
            
            <div className="popular-courses">
              <h3>인기 강의</h3>
              <div className="course-list">
                {courses.slice(0, 3).map(course => (
                  <div key={course.id} className="course-item">
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <span className="course-stats">⭐ {course.rating} ({course.enrolledStudents}명)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
