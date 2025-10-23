export interface Instructor {
  id: number;
  name: string;
  title: string;
  profileImage: string;
  birthdate: string;
  affiliation: string[];
  education: string;
  career: string[];
  pet?: string;
  description: string;
  specialties: string[];
}

export interface Course {
  id: number;
  title: string;
  instructorId: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  thumbnail: string;
  description: string;
  duration: string;
  level: '초급' | '중급' | '고급';
  category: string;
  youtubeVideoId?: string;
  isLive: boolean;
  enrolledStudents: number;
  rating: number;
  reviews: number;
  createdAt: string;
  hasEbook?: boolean;
  ebookPrice?: number | null;
}

export const instructors: Instructor[] = [
  {
    id: 1,
    name: "최성혜",
    title: "대학교수",
    profileImage: "https://via.placeholder.com/300x300/667eea/ffffff?text=최성혜",
    birthdate: "1991.04.10",
    affiliation: [
      "차의과학대학교 보건의료경영대학원(교수)",
      "한국미용예술경영학회(이사)",
      "한국화장품미용학회(이사)"
    ],
    education: "차의과학대학교 대학원 의학 박사 보건학 전공",
    career: [
      "2023.02.~2025.02. 서정대학교 뷰티아트과 교수",
      "2021.03.~2022.12. 구미대학교 헤어메이크업네일아트과 교수",
      "2024.03.~2025.02. 건국대학교 교육대학원 미용교육 전공 교수"
    ],
    pet: "강아지 코코 (말티푸)",
    description: "뷰티 산업과 의료 경영 분야의 전문가로, 10년 이상의 교육 경험을 가지고 있습니다. 실무 중심의 강의로 많은 학생들에게 사랑받고 있습니다.",
    specialties: ["뷰티 아트", "의료 경영", "헤어 메이크업", "네일 아트"]
  },
  {
    id: 2,
    name: "김개발",
    title: "시니어 개발자",
    profileImage: "https://via.placeholder.com/300x300/764ba2/ffffff?text=김개발",
    birthdate: "1985.03.15",
    affiliation: [
      "테크 스타트업 CTO",
      "한국소프트웨어협회(이사)",
      "개발자 커뮤니티 리더"
    ],
    education: "서울대학교 컴퓨터공학과 석사",
    career: [
      "2020.01.~현재 테크 스타트업 CTO",
      "2018.03.~2019.12. 네이버 시니어 개발자",
      "2015.06.~2018.02. 카카오 백엔드 개발자"
    ],
    description: "10년 이상의 개발 경험을 가진 풀스택 개발자입니다. React, Node.js, Python 등 다양한 기술 스택에 전문성을 가지고 있습니다.",
    specialties: ["React", "Node.js", "Python", "AWS", "데이터베이스"]
  }
];

export const courses: Course[] = [
  {
    id: 1,
    title: "SNS 수익화 마스터 클래스",
    instructorId: 1,
    price: 0,
    originalPrice: 199000,
    discount: 100,
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center",
    description: "SNS를 활용한 수익화 전략과 실무 노하우를 배우는 강의입니다. 인스타그램, 유튜브, 틱톡 등 다양한 플랫폼에서의 마케팅 기법을 학습할 수 있습니다.",
    duration: "8주",
    level: "중급",
    category: "마케팅",
    youtubeVideoId: "dQw4w9WgXcQ",
    isLive: true,
    enrolledStudents: 1250,
    rating: 4.8,
    reviews: 156,
    createdAt: "2024-01-15",
    hasEbook: true,
    ebookPrice: 49000
  },
  {
    id: 2,
    title: "React 완벽 마스터 코스",
    instructorId: 2,
    price: 149000,
    originalPrice: 299000,
    discount: 50,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center",
    description: "React의 기초부터 고급 기능까지 완벽하게 마스터하는 강의입니다. 실무에서 바로 사용할 수 있는 프로젝트 중심의 학습을 제공합니다.",
    duration: "12주",
    level: "초급",
    category: "프로그래밍",
    youtubeVideoId: "dQw4w9WgXcQ",
    isLive: false,
    enrolledStudents: 890,
    rating: 4.9,
    reviews: 203,
    createdAt: "2024-02-01",
    hasEbook: true,
    ebookPrice: 39000
  },
  {
    id: 3,
    title: "뷰티 아트 전문가 과정",
    instructorId: 1,
    price: 199000,
    thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center",
    description: "헤어, 메이크업, 네일 아트의 전문 기술을 배우는 종합 과정입니다. 실무 경험이 풍부한 강사와 함께 프로 수준의 기술을 익혀보세요.",
    duration: "16주",
    level: "고급",
    category: "뷰티",
    youtubeVideoId: "dQw4w9WgXcQ",
    isLive: true,
    enrolledStudents: 456,
    rating: 4.7,
    reviews: 89,
    createdAt: "2024-01-20",
    hasEbook: true,
    ebookPrice: 59000
  }
];
