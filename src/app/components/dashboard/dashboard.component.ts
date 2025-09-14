/**
 * Component responsible for displaying and managing tasks in the application.
 * Provides functionality to view, create, edit, and delete tasks.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../../services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Task } from '../../models/task.model';



interface Student {
  name: string;
  surname: string;
  grade: string;
  class: string;
  classTeacher: string;
  profileImage: string;
}

interface Subject {
  id: string;
  name: string;
  progress: number;
  masteryLevel: string;
  teacher: string;
  nextTest: Date;
  homeworkDue: Date;
  priorKnowledge: string[];
}

interface Homework {
  id: string;
  subject: string;
  title: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  priorKnowledge: string[];
}

interface CourseFile {
  id: string;
  name: string;
  subject: string;
  type: string;
  size: string;
  uploadDate: Date;
}


interface SchoolNewsletter {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: Date;
  priority: 'urgent' | 'important' | 'regular';
  category: 'announcement' | 'event' | 'academic' | 'general';
  attachments?: string[];
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  student: Student = {
    name: 'John',
    surname: 'Doe',
    grade: '10th Grade',
    class: 'A',
    classTeacher: 'Ms. Johnson',
    profileImage: 'assets/student-avatar.jpg'
  };

  

  subjects: Subject[] = [
    {
      id: '1',
      name: 'Mathematics',
      progress: 75,
      masteryLevel: 'Advanced',
      teacher: 'Mr. Smith',
      nextTest: new Date('2025-08-30'),
      homeworkDue: new Date('2025-08-25'),
      priorKnowledge: ['Algebra', 'Geometry']
    },
    {
      id: '2',
      name: 'Physics',
      progress: 68,
      masteryLevel: 'Intermediate',
      teacher: 'Dr. Wilson',
      nextTest: new Date('2025-09-02'),
      homeworkDue: new Date('2025-08-27'),
      priorKnowledge: ['Basic Math', 'Scientific Method']
    },
    {
      id: '3',
      name: 'Computer Science',
      progress: 82,
      masteryLevel: 'Advanced',
      teacher: 'Ms. Davis',
      nextTest: new Date('2025-08-28'),
      homeworkDue: new Date('2025-08-26'),
      priorKnowledge: ['Programming Basics', 'Logic']
    }
  ];

  homework: Homework[] = [
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Calculus Problem Set Chapter 5',
      dueDate: new Date('2025-08-25'),
      priority: 'high',
      priorKnowledge: ['Derivatives', 'Limits']
    },
    {
      id: '2',
      subject: 'Physics',
      title: 'Wave Motion Lab Report',
      dueDate: new Date('2025-08-27'),
      priority: 'medium',
      priorKnowledge: ['Wave Properties', 'Data Analysis']
    }
  ];

  courseFiles: CourseFile[] = [
    {
      id: '1',
      name: 'Calculus_Notes_Ch5.pdf',
      subject: 'Mathematics',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: new Date('2025-08-20')
    },
    {
      id: '2',
      name: 'Physics_Lab_Manual.pdf',
      subject: 'Physics',
      type: 'PDF',
      size: '5.1 MB',
      uploadDate: new Date('2025-08-18')
    }
  ];

  activeSection: string = 'overview';
  textToTranslate: string = '';
  translatedText: string = '';
  selectedLanguage: string = 'es';
  chatMessages: any[] = [];
  newMessage: string = '';
  isChatbotOpen: boolean = false;
  selectedFiles: FileList | null = null;
  isSidebarCollapsed: boolean = false;
  isNewslettersOpen: boolean = false;
  
  stationaryItems = [
    { name: 'Pencils', have: true },
    { name: 'Erasers', have: false },
    { name: 'Ruler', have: true },
    { name: 'Calculator', have: false },
    { name: 'Notebooks', have: true }
  ];


  languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  assignments = [
    {
      id: '1',
      title: 'Calculus Integration Problems',
      subject: 'Mathematics',
      teacher: 'Mr. Smith',
      type: 'written',
      startDate: new Date('2025-01-15'),
      dueDate: new Date('2025-01-22'),
      knowledgeRequired: ['Integration', 'Differentiation', 'Limits']
    },
    {
      id: '2',
      title: 'Physics MCQ Test - Waves',
      subject: 'Physics',
      teacher: 'Dr. Wilson',
      type: 'mcq',
      startDate: new Date('2025-01-16'),
      dueDate: new Date('2025-01-20'),
      knowledgeRequired: ['Wave Properties', 'Sound Waves', 'Light Waves']
    }
  ];

  gradingData = {
    assignmentResults: [
      { subject: 'Mathematics', assignment: 'Calculus Problems', mark: 85, total: 100, grade: 'A', gradeAverage: 85 },
      { subject: 'Mathematics', assignment: 'Algebra Test', mark: 78, total: 100, grade: 'B+', gradeAverage: 78 },
      { subject: 'Physics', assignment: 'Wave Motion', mark: 92, total: 100, grade: 'A+', gradeAverage: 92 },
      { subject: 'Computer Science', assignment: 'Programming Project', mark: 88, total: 100, grade: 'A', gradeAverage: 88 }
    ],
    examMarks: [
      { subject: 'Mathematics', term: 'Term 1', mark: 82, total: 100, grade: 'A-', gradeAverage: 82 },
      { subject: 'Mathematics', term: 'Term 2', mark: 79, total: 100, grade: 'B+', gradeAverage: 79 },
      { subject: 'Physics', term: 'Term 1', mark: 87, total: 100, grade: 'A', gradeAverage: 87 },
      { subject: 'Physics', term: 'Term 2', mark: 90, total: 100, grade: 'A+', gradeAverage: 90 },
      { subject: 'Computer Science', term: 'Term 1', mark: 85, total: 100, grade: 'A', gradeAverage: 85 },
      { subject: 'Computer Science', term: 'Term 2', mark: 91, total: 100, grade: 'A+', gradeAverage: 91 }
    ],
    yearMarks: [
      { 
        subject: 'Mathematics', 
        termMark: 80.5, 
        examMark: 83, 
        termWeight: 60, 
        examWeight: 40, 
        finalMark: 81.5, 
        grade: 'A-',
        gradeAverage: 81.5
      },
      { 
        subject: 'Physics', 
        termMark: 88.5, 
        examMark: 89, 
        termWeight: 60, 
        examWeight: 40, 
        finalMark: 88.7, 
        grade: 'A',
        gradeAverage: 88.7
      },
      { 
        subject: 'Computer Science', 
        termMark: 88, 
        examMark: 92, 
        termWeight: 60, 
        examWeight: 40, 
        finalMark: 89.6, 
        grade: 'A+',
        gradeAverage: 89.6
      }
    ]
  };

  mockExams = [
    {
      id: '1',
      title: 'Mathematics Mock Exam - Term 1',
      subject: 'Mathematics',
      type: 'mcq',
      duration: 120,
      totalMarks: 100,
      availableUntil: new Date('2025-02-01')
    },
    {
      id: '2',
      title: 'Physics Written Mock Exam',
      subject: 'Physics',
      type: 'written',
      duration: 180,
      totalMarks: 150,
      availableUntil: new Date('2025-02-05')
    }
  ];

  schoolNewsletters: SchoolNewsletter[] = [
    {
      id: '1',
      title: 'Welcome Back to School - Fall 2025',
      summary: 'Important information about the new academic year, schedule changes, and upcoming events.',
      content: 'Full newsletter content here...',
      date: new Date('2025-08-20'),
      priority: 'important',
      category: 'announcement'
    },
    {
      id: '2',
      title: 'Parent-Teacher Conference Schedule',
      summary: 'Schedule for upcoming parent-teacher conferences and how to book your preferred time slot.',
      content: 'Full newsletter content here...',
      date: new Date('2025-08-18'),
      priority: 'urgent',
      category: 'event'
    },
    {
      id: '3',
      title: 'New Library Resources Available',
      summary: 'Discover new books, digital resources, and study materials added to the school library.',
      content: 'Full newsletter content here...',
      date: new Date('2025-08-15'),
      priority: 'regular',
      category: 'academic'
    },
    {
      id: '4',
      title: 'Sports Team Tryouts - This Week',
      summary: 'Information about upcoming sports team tryouts for basketball, soccer, and swimming.',
      content: 'Full newsletter content here...',
      date: new Date('2025-08-14'),
      priority: 'important',
      category: 'event'
    }
  ];

  constructor(
    public taskService: TaskService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeChatbot();
    this.loadFavorites();
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFilesToRAG(): void {
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      // Simulate file upload to RAG system
      console.log('Uploading files to RAG system:', this.selectedFiles);
      alert(`Uploading ${this.selectedFiles.length} file(s) to your personalized learning model...`);
      // Here you would implement the actual upload to Amazon Bedrock
    }
  }

  translateText(): void {
    if (this.textToTranslate.trim()) {
      // Simulate translation API call
      setTimeout(() => {
        this.translatedText = `[${this.selectedLanguage.toUpperCase()}] ${this.textToTranslate} (translated)`;
      }, 500);
    }
  }

  generateWeeklyTest(subjectId: string): void {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (subject) {
      alert(`Generating weekly test for ${subject.name}...`);
      // Here you would implement test generation logic
    }
  }

  downloadFile(fileId: string): void {
    const file = this.courseFiles.find(f => f.id === fileId);
    if (file) {
      alert(`Downloading ${file.name}...`);
      // Here you would implement file download logic
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatMessages.push({
        type: 'user',
        message: this.newMessage,
        timestamp: new Date()
      });

      // Simulate AI response
      setTimeout(() => {
        this.chatMessages.push({
          type: 'ai',
          message: `I understand you're asking about: "${this.newMessage}". How can I help you with your studies today?`,
          timestamp: new Date()
        });
      }, 1000);

      this.newMessage = '';
    }
  }

  toggleChatbot(): void {
    this.isChatbotOpen = !this.isChatbotOpen;
  }

  contactTeacher(subject: string): void {
    alert(`Opening communication channel with ${subject} teacher...`);
    // Here you would implement teacher communication logic
  }

  joinCollaborationRoom(): void {
    alert('Joining virtual collaboration room...');
    // Here you would implement collaboration room logic
  }

  private initializeChatbot(): void {
    this.chatMessages = [
      {
        type: 'ai',
        message: 'Hello! I\'m your personalized learning assistant. How can I help you today?',
        timestamp: new Date()
      }
    ];
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  getMasteryColor(masteryLevel: string): string {
    switch (masteryLevel) {
      case 'Advanced': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Beginner': return '#ef4444';
      default: return '#6b7280';
    }
  }
  
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  
  toggleNewsletters(): void {
    this.isNewslettersOpen = !this.isNewslettersOpen;
  }

  readNewsletter(newsletterId: string): void {
    const newsletter = this.schoolNewsletters.find(n => n.id === newsletterId);
    if (newsletter) {
      this.setActiveSection('news');
      console.log('Reading newsletter:', newsletter);
    }
  }

  shareNewsletter(newsletterId: string): void {
    const newsletter = this.schoolNewsletters.find(n => n.id === newsletterId);
    if (newsletter) {
      alert(`Sharing newsletter: ${newsletter.title}`);
      console.log('Sharing newsletter:', newsletter);
    }
  }

  downloadNewsletter(newsletterId: string): void {
    const newsletter = this.schoolNewsletters.find(n => n.id === newsletterId);
    if (newsletter) {
      alert(`Downloading newsletter: ${newsletter.title}`);
      console.log('Downloading newsletter:', newsletter);
    }
  }

  viewAllNewsletters(): void {
    alert('Opening all newsletters view...');
    console.log('Viewing all newsletters');
  }

  downloadAssignment(assignmentId: string): void {
    alert(`Downloading assignment ${assignmentId}...`);
  }

  beginMCQAssignment(assignmentId: string): void {
    alert(`Starting MCQ assignment ${assignmentId}...`);
  }

  uploadAssignment(assignmentId: string): void {
    alert(`Opening upload dialog for assignment ${assignmentId}...`);
  }

  beginMockExam(examId: string): void {
    alert(`Starting mock exam ${examId}...`);
  }

  downloadExam(examId: string): void {
    alert(`Downloading exam ${examId}...`);
  }

  uploadExam(examId: string): void {
    alert(`Opening upload dialog for exam ${examId}...`);
  }

  getGradeClass(grade: string): string {
    if (grade.includes('A')) return 'grade-a';
    if (grade.includes('B')) return 'grade-b';
    if (grade.includes('C')) return 'grade-c';
    return 'grade-d';
  }

  connectAICoach(subject: string): void {
    alert(`Connecting to AI Coach for ${subject}...`);
  }

  findYoutubeTutorials(subject: string): void {
    alert(`Finding best YouTube tutorials for ${subject}...`);
  }

  selectedSubject: any = null;
  selectedTopic: any = null;
  aiExamples: { [key: string]: string[] } = {};
  aiExamplesVisible: { [key: string]: boolean } = {};
  favorites: { [key: string]: boolean } = {
    'syllabus': true
  };

  navItems = [
    { section: 'overview', name: 'Overview', icon: 'fa-home' },
    { section: 'syllabus', name: 'Syllabus', icon: 'fa-book' },
    { section: 'progress', name: 'Progress', icon: 'fa-chart-line' },
    { section: 'homework', name: 'Homework', icon: 'fa-tasks' },
    { section: 'files', name: 'Course Files', icon: 'fa-folder' },
    { section: 'translate', name: 'Translator', icon: 'fa-language' },
    { section: 'upload', name: 'Upload Files', icon: 'fa-upload' },
    { section: 'assignments', name: 'Assignments', icon: 'fa-clipboard-check' },
    { section: 'mock-exams', name: 'Mock Exams', icon: 'fa-file-alt' },
    { section: 'grading', name: 'Grading', icon: 'fa-chart-bar' },
    { section: 'collaborate', name: 'Collaborate', icon: 'fa-users' }
  ];

  openSubjectStudyPlan(subject: any) {
    this.selectedSubject = {
      ...subject,
      studyPlan: this.generateStudyPlan(subject.name)
    };
    this.selectedTopic = this.selectedSubject.studyPlan[0];
  }

  backToSyllabus() {
    this.selectedSubject = null;
    this.selectedTopic = null;
  }

  selectTopic(topic: any) {
    if (topic.status === 'locked') return;
    this.selectedTopic = topic;
  }

  getTopicStatusClass(status: string): string {
    switch (status) {
      case 'mastered': return 'status-mastered';
      case 'overdue': return 'status-overdue';
      case 'locked': return 'status-locked';
      default: return 'status-current';
    }
  }

  getTopicIcon(status: string): string {
    switch (status) {
      case 'mastered': return 'fa-check-circle';
      case 'overdue': return 'fa-exclamation-triangle';
      case 'locked': return 'fa-lock';
      default: return 'fa-play-circle';
    }
  }

  toggleAIExamples(topicId: string) {
    if (!this.aiExamplesVisible[topicId]) {
      this.aiExamples[topicId] = [
        'AI Generated Example 1: Interactive problem solving approach',
        'AI Generated Example 2: Step-by-step solution method',
        'AI Generated Activity: Practice exercises with instant feedback'
      ];
    }
    this.aiExamplesVisible[topicId] = !this.aiExamplesVisible[topicId];
  }

  toggleFavorite(section: string, event: Event) {
    event.stopPropagation();
    this.favorites[section] = !this.favorites[section];
    this.saveFavorites();
  }

  getFavoriteItems() {
    return this.navItems
      .filter(item => this.favorites[item.section])
      .slice(0, 4);
  }

  private loadFavorites(): void {
    try {
      const raw = localStorage.getItem('dashboard_favorites');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.favorites = parsed;
        }
      }
    } catch {
      // ignore malformed data
    }
  }

  private saveFavorites(): void {
    try {
      localStorage.setItem('dashboard_favorites', JSON.stringify(this.favorites));
    } catch {
      // storage may be unavailable; fail silently
    }
  }

  getMissingItems(): string[] {
    return this.stationaryItems.filter(item => !item.have).map(item => item.name);
  }

  updateStationaryStatus(): void {
    console.log('Stationary status updated');
  }

  saveStationaryStatus(): void {
    const missingItems = this.getMissingItems();
    console.log('Missing items to report to parents:', missingItems);
    alert(`Status saved! Missing items: ${missingItems.join(', ')}`);
  }

  private generateStudyPlan(subjectName: string) {
    const plans: any = {
      'Mathematics': [
        { id: '1', title: 'Algebra Basics', duration: '2 weeks', status: 'mastered', content: 'Introduction to algebraic expressions and equations.', bookExamples: ['Solve: 2x + 5 = 15', 'Simplify: 3(x + 4) - 2x'] },
        { id: '2', title: 'Linear Equations', duration: '3 weeks', status: 'mastered', content: 'Working with linear equations in one and two variables.', bookExamples: ['Graph: y = 2x + 3', 'Solve system: x + y = 5, 2x - y = 1'] },
        { id: '3', title: 'Quadratic Functions', duration: '4 weeks', status: 'overdue', content: 'Understanding quadratic functions and their graphs.', bookExamples: ['Factor: x² - 5x + 6', 'Find vertex of: y = x² - 4x + 3'] },
        { id: '4', title: 'Trigonometry', duration: '3 weeks', status: 'locked', content: 'Basic trigonometric functions and identities.', bookExamples: [] }
      ],
      'Physics': [
        { id: '1', title: 'Motion and Forces', duration: '3 weeks', status: 'mastered', content: 'Newton\'s laws of motion and force calculations.', bookExamples: ['Calculate force: F = ma where m=5kg, a=2m/s²'] },
        { id: '2', title: 'Energy and Work', duration: '2 weeks', status: 'overdue', content: 'Kinetic and potential energy concepts.', bookExamples: ['Calculate KE: ½mv² where m=10kg, v=5m/s'] },
        { id: '3', title: 'Waves and Sound', duration: '4 weeks', status: 'locked', content: 'Wave properties and sound phenomena.', bookExamples: [] }
      ]
    };
    return plans[subjectName] || [];
  }

}