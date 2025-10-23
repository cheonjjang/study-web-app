import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import './SearchBox.css';

const SearchBox: React.FC = () => {
  const {
    query,
    isOpen,
    searchResults,
    recentSearches,
    handleSearchChange,
    handleSearch,
    handleClose,
    clearRecentSearches,
    removeRecentSearch
  } = useSearch();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 외부 클릭 시 검색창 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  // 엔터키로 검색
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="강의, 강사 검색..."
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button className="search-btn" onClick={() => handleSearch(query)}>
          🔍
        </button>
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && (
        <div className="search-dropdown">
          {query.length > 0 ? (
            <>
              {/* 검색 결과 */}
              {searchResults.length > 0 ? (
                <div className="search-results">
                  <div className="search-section-header">
                    <span className="section-title">검색 결과</span>
                    <span className="result-count">{searchResults.length}개</span>
                  </div>
                  {searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      to={result.type === 'course' ? `/course/${result.id}` : `/instructor/${result.id}`}
                      className="search-result-item"
                      onClick={handleClose}
                    >
                      <div className="result-thumbnail">
                        <img src={result.thumbnail} alt={result.title} />
                      </div>
                      <div className="result-content">
                        <h4 className="result-title">{result.title}</h4>
                        <p className="result-meta">
                          {result.type === 'course' ? '강의' : '강사'} • {result.instructor}
                        </p>
                        <p className="result-category">{result.category}</p>
                        {result.type === 'course' && result.price > 0 && (
                          <span className="result-price">₩{result.price.toLocaleString()}</span>
                        )}
                        {result.type === 'course' && result.price === 0 && (
                          <span className="result-price free">무료</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <p>검색 결과가 없습니다</p>
                  <p className="no-results-hint">다른 키워드로 검색해보세요</p>
                </div>
              )}
            </>
          ) : (
            /* 최근 검색어 */
            recentSearches.length > 0 && (
              <div className="recent-searches">
                <div className="search-section-header">
                  <span className="section-title">최근 검색어</span>
                  <button 
                    className="clear-btn"
                    onClick={clearRecentSearches}
                  >
                    전체 삭제
                  </button>
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="recent-search-item"
                    onClick={() => {
                      handleSearchChange(search);
                      handleSearch(search);
                    }}
                  >
                    <span className="search-icon">🕒</span>
                    <span className="search-text">{search}</span>
                    <button 
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(index);
                      }}
                    >
                      ✕
                    </button>
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
