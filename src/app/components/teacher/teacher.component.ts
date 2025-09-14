import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  teacher = {
    id: 'T001',
    name: 'Sarah',
    surname: 'Johnson',
    department: 'Mathematics',
    grade: 'Grade 10-12',
    totalClasses: 5,
    totalStudents: 120,
    pendingGrading: 15,
    profileImage: 'assets/teacher-avatar.jpg'
  };

  classes = [
    { id: 1, name: 'Mathematics 10A', grade: 'Grade 10', students: 25, parentCount: 20 },
    { id: 2, name: 'Mathematics 11B', grade: 'Grade 11', students: 28, parentCount: 24 },
    { id: 3, name: 'Mathematics 12C', grade: 'Grade 12', students: 22, parentCount: 18 }
  ];

  activeSection: string = 'overview';
  isSidebarCollapsed: boolean = false;
  selectedGrade: string = '';
  newStationaryItem: string = '';
  currentStationaryList: string[] = [];
  stationaryLists: { [grade: string]: string[] } = {
    'Grade 10': ['Pencils', 'Erasers', 'Ruler', 'Calculator'],
    'Grade 11': ['Scientific Calculator', 'Graph Paper', 'Compass', 'Protractor'],
    'Grade 12': ['Graphing Calculator', 'Formula Sheets', 'Reference Books']
  };
  selectedClass: number | null = null;
  selectedStudent: number | null = null;
  favorites: { [key: string]: boolean } = {
    'classes': true,
    'student-insights': true
  };
  
  isChatbotOpen: boolean = false;
  newMessage: string = '';
  chatMessages = [
    {
      type: 'bot',
      text: 'Hello! I\'m your Teacher Assistant. I can help you with information about your classes, students, assignments, and more. What would you like to know?',
      timestamp: new Date()
    }
  ];
  
  students = [
    {
      id: 1, name: 'John', surname: 'Smith', classId: 1, present: true,
      gradeRank: '5th out of 25', classTeacher: 'Ms. Johnson', joinDate: new Date('2023-01-15'),
      daysAbsent: 3, disciplinaryCases: 0, examMark: 85, assignmentAverage: 78,
      yearMark: 82, finalMark: 83, strugglingTopics: ['Calculus', 'Trigonometry'],
      masteredTopics: ['Algebra', 'Geometry', 'Statistics']
    },
    {
      id: 2, name: 'Sarah', surname: 'Davis', classId: 1, present: false,
      gradeRank: '12th out of 25', classTeacher: 'Ms. Johnson', joinDate: new Date('2022-08-20'),
      daysAbsent: 8, disciplinaryCases: 1, examMark: 72, assignmentAverage: 69,
      yearMark: 71, finalMark: 71, strugglingTopics: ['Quadratic Functions', 'Logarithms'],
      masteredTopics: ['Basic Algebra', 'Linear Equations']
    },
    {
      id: 3, name: 'Mike', surname: 'Wilson', classId: 2, present: true,
      gradeRank: '3rd out of 28', classTeacher: 'Mr. Brown', joinDate: new Date('2022-01-10'),
      daysAbsent: 1, disciplinaryCases: 0, examMark: 91, assignmentAverage: 88,
      yearMark: 89, finalMark: 90, strugglingTopics: ['Complex Numbers'],
      masteredTopics: ['Calculus', 'Matrices', 'Probability']
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  viewSyllabus(classId: number): void {
    console.log('View syllabus for class:', classId);
  }

  viewAttendance(classId: number): void {
    console.log('View attendance for class:', classId);
  }

  viewHomework(classId: number): void {
    console.log('View homework for class:', classId);
  }

  viewAssignments(classId: number): void {
    console.log('View assignments for class:', classId);
  }

  openAIPortal(classId: number): void {
    console.log('Open AI Portal for class:', classId);
  }

  classAnnouncements(classId: number): void {
    console.log('Class announcements for:', classId);
  }

  generateQuiz(): void {
    console.log('Generate AI quiz');
  }

  generateRubric(): void {
    console.log('Generate AI rubric');
  }

  generateLessonPlan(): void {
    console.log('Generate AI lesson plan');
  }

  analyzeStudents(): void {
    console.log('Analyze at-risk students');
  }

  openEmailTool(): void {
    console.log('Open email communication tool');
  }

  openWhatsApp(): void {
    console.log('Open WhatsApp communication');
  }

  addParent(classId: number): void {
    console.log('Add parent to class:', classId);
  }

  manageGroup(classId: number): void {
    console.log('Manage WhatsApp group for class:', classId);
  }

  loadStationaryList(): void {
    this.currentStationaryList = this.stationaryLists[this.selectedGrade] || [];
  }

  addStationaryItem(): void {
    if (this.newStationaryItem.trim()) {
      this.currentStationaryList.push(this.newStationaryItem.trim());
      this.newStationaryItem = '';
    }
  }

  removeStationaryItem(index: number): void {
    this.currentStationaryList.splice(index, 1);
  }

  saveStationaryList(): void {
    this.stationaryLists[this.selectedGrade] = [...this.currentStationaryList];
    console.log('Stationary list saved for', this.selectedGrade, this.currentStationaryList);
  }

  selectClassForInsights(classId: number): void {
    this.selectedClass = classId;
  }

  selectStudent(studentId: number): void {
    this.selectedStudent = studentId;
  }

  backToClasses(): void {
    this.selectedClass = null;
    this.selectedStudent = null;
  }

  backToStudents(): void {
    this.selectedStudent = null;
  }

  getClassName(classId: number): string {
    const classData = this.classes.find(c => c.id === classId);
    return classData ? classData.name : '';
  }

  getClassStudents(classId: number) {
    return this.students.filter(s => s.classId === classId);
  }

  getStudentName(studentId: number): string {
    const student = this.students.find(s => s.id === studentId);
    return student ? `${student.name} ${student.surname}` : '';
  }

  getStudentData(studentId: number) {
    return this.students.find(s => s.id === studentId);
  }

  toggleFavorite(section: string, event: Event): void {
    event.stopPropagation();
    this.favorites[section] = !this.favorites[section];
  }

  getFavoriteItems() {
    const navItems = [
      { section: 'overview', name: 'Overview', icon: 'fa-home' },
      { section: 'classes', name: 'My Classes', icon: 'fa-users' },
      { section: 'upload-files', name: 'Upload Files', icon: 'fa-upload' },
      { section: 'mock-exam', name: 'Mock Exam', icon: 'fa-file-alt' },
      { section: 'homework', name: 'Add Homework', icon: 'fa-tasks' },
      { section: 'add-assignment', name: 'Add Assignment', icon: 'fa-plus-circle' },
      { section: 'ai-chatbot', name: 'AI Portal', icon: 'fa-robot' },
      { section: 'stationary-list', name: 'Stationary List', icon: 'fa-list-ul' },
      { section: 'student-insights', name: 'Student Insights', icon: 'fa-chart-line' },
      { section: 'parent-connect', name: 'Parent Connect', icon: 'fa-users-cog' }
    ];
    return navItems.filter(item => this.favorites[item.section]).slice(0, 4);
  }

  toggleChatbot(): void {
    this.isChatbotOpen = !this.isChatbotOpen;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push({
        type: 'user',
        text: this.newMessage,
        timestamp: new Date()
      });

      const response = this.generateResponse(this.newMessage);
      setTimeout(() => {
        this.chatMessages.push({
          type: 'bot',
          text: response,
          timestamp: new Date()
        });
      }, 1000);

      this.newMessage = '';
    }
  }

  private generateResponse(message: string): string {
    const msg = message.toLowerCase();
    
    if (msg.includes('class') || msg.includes('student')) {
      return `You have ${this.teacher.totalClasses} active classes with ${this.teacher.totalStudents} total students. Your classes are: ${this.classes.map(c => c.name).join(', ')}.`;
    }
    if (msg.includes('grading') || msg.includes('pending')) {
      return `You have ${this.teacher.pendingGrading} assignments pending grading. Would you like me to help you prioritize them?`;
    }
    if (msg.includes('attendance') || msg.includes('absent')) {
      const absentStudents = this.students.filter(s => !s.present);
      return `Currently ${absentStudents.length} students are absent: ${absentStudents.map(s => s.name + ' ' + s.surname).join(', ')}.`;
    }
    if (msg.includes('performance') || msg.includes('struggling')) {
      return 'Based on student insights, some students are struggling with advanced topics like Calculus and Trigonometry. Would you like to see detailed performance analytics?';
    }
    if (msg.includes('stationary') || msg.includes('supplies')) {
      return 'You can create grade-specific stationary lists that will be sent to students. Students update their status weekly, and missing items are reported to parents.';
    }
    
    return 'I can help you with information about your classes, students, assignments, grading, attendance, and more. Try asking about specific topics!';
  }
}