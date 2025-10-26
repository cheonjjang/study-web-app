import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import InstructorProfile from './pages/InstructorProfile';
import LiveLecture from './pages/LiveLecture';
import Payment from './pages/Payment';
import EbookDetail from './pages/EbookDetail';
import EbookPayment from './pages/EbookPayment';
import MyPage from './pages/MyPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/player/:id" element={<CoursePlayer />} />
          <Route path="/instructor/:id" element={<InstructorProfile />} />
          <Route path="/live/:courseId" element={<LiveLecture />} />
          <Route path="/payment/:courseId" element={<Payment />} />
          <Route path="/ebook/:id" element={<EbookDetail />} />
          <Route path="/ebook-payment/:id" element={<EbookPayment />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
