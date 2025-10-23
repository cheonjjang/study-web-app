import { useState, useEffect, useMemo } from 'react';
import { courses, instructors } from '../data/sampleData';

export interface SearchResult {
  id: number;
  title: string;
  instructor: string;
  category: string;
  price: number;
  thumbnail: string;
  type: 'course' | 'instructor';
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 검색 결과 계산
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // 강의 검색
    courses.forEach(course => {
      const instructor = instructors.find(inst => inst.id === course.instructorId);
      const instructorName = instructor ? instructor.name : '알 수 없음';
      
      const matchesTitle = course.title.toLowerCase().includes(searchTerm);
      const matchesInstructor = instructorName.toLowerCase().includes(searchTerm);
      const matchesCategory = course.category.toLowerCase().includes(searchTerm);
      const matchesDescription = course.description.toLowerCase().includes(searchTerm);

      if (matchesTitle || matchesInstructor || matchesCategory || matchesDescription) {
        results.push({
          id: course.id,
          title: course.title,
          instructor: instructorName,
          category: course.category,
          price: course.price,
          thumbnail: course.thumbnail,
          type: 'course'
        });
      }
    });

    // 강사 검색
    instructors.forEach(instructor => {
      const matchesName = instructor.name.toLowerCase().includes(searchTerm);
      const matchesTitle = instructor.title.toLowerCase().includes(searchTerm);
      const matchesSpecialties = instructor.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm)
      );

      if (matchesName || matchesTitle || matchesSpecialties) {
        results.push({
          id: instructor.id,
          title: instructor.name,
          instructor: instructor.title,
          category: instructor.specialties.join(', '),
          price: 0,
          thumbnail: instructor.profileImage,
          type: 'instructor'
        });
      }
    });

    // 관련도 순으로 정렬 (제목 매치 > 강사 매치 > 카테고리 매치)
    return results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
      const bTitleMatch = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      return a.title.localeCompare(b.title);
    }).slice(0, 8); // 최대 8개 결과만 표시
  }, [query]);

  // 검색어 변경 핸들러
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
  };

  // 검색 실행
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // 최근 검색어에 추가
      const newRecentSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      setIsOpen(false);
      setQuery('');
    }
  };

  // 검색창 닫기
  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  // 최근 검색어 로드
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // 최근 검색어 삭제
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // 최근 검색어 삭제 (개별)
  const removeRecentSearch = (index: number) => {
    const newRecent = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  return {
    query,
    isOpen,
    searchResults,
    recentSearches,
    handleSearchChange,
    handleSearch,
    handleClose,
    clearRecentSearches,
    removeRecentSearch
  };
};
