import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="header" ref={headerRef}>
      <div className="header-container">
        <Link to="/" className="logo">
          <div className="logo-icon">🎓</div>
          <div className="logo-text">
            <span className="logo-main">에듀허브</span>
            <span className="logo-sub">온라인 강의 플랫폼</span>
          </div>
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            홈
          </Link>
          <div className="nav-dropdown">
            <span className="nav-link dropdown-trigger">
              강의
            </span>
            <div className="dropdown-menu">
              <Link to="/courses" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>전체 강의</Link>
              <Link to="/courses?category=marketing" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>마케팅</Link>
              <Link to="/courses?category=programming" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>프로그래밍</Link>
              <Link to="/courses?category=beauty" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>뷰티</Link>
              <Link to="/courses?category=design" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>디자인</Link>
            </div>
          </div>
          <Link to="/community" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            커뮤니티
          </Link>
          <Link to="/recommendations" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            추천 강의
          </Link>
          <div className="nav-dropdown">
            <span className="nav-link dropdown-trigger">
              강사
            </span>
            <div className="dropdown-menu">
              <Link to="/instructor/1" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>강사 프로필</Link>
              <Link to="/instructor/2" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>강사 소개</Link>
            </div>
          </div>
          
          {/* 모바일 전용 버튼들 - 모바일에서만 표시 */}
          <div className="mobile-menu-actions">
            <Link to="/mypage" className="mobile-mypage-btn" onClick={() => setIsMenuOpen(false)}>
              <span className="btn-icon">👤</span>
              마이페이지
            </Link>
            <button className="mobile-login-btn" onClick={() => setIsMenuOpen(false)}>로그인</button>
            <button className="mobile-signup-btn" onClick={() => setIsMenuOpen(false)}>무료 회원가입</button>
          </div>
        </nav>
        
        <div className="header-actions">
          <Link to="/mypage" className="mypage-btn desktop-only">
            <span className="btn-icon">👤</span>
            마이페이지
          </Link>
          <button className="login-btn desktop-only">로그인</button>
          <button className="signup-btn desktop-only">회원가입</button>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
