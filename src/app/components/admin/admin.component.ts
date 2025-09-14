import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeSection = 'overview';
  isSidebarCollapsed = false;

  admin = {
    name: 'System',
    surname: 'Administrator',
    role: 'Super Admin',
    id: 'ADM001'
  };

  stats = {
    totalUsers: 1247,
    activeTeachers: 89,
    totalStudents: 1158,
    systemAlerts: 3
  };

  favorites: { [key: string]: boolean } = {};

  currentStep = 1;
  totalSteps = 9;

  enrollmentData = {
    // Step 1: Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    studentId: '',
    
    // Step 2: Contact Information
    homeAddress: { street: '', suburb: '', city: '', province: '', postalCode: '' },
    primaryContact: '',
    alternateContact: '',
    studentEmail: '',
    
    // Step 3: Parent/Guardian Details
    primaryGuardian: { name: '', relationship: '', occupation: '', contact: '', email: '' },
    secondaryGuardian: { name: '', relationship: '', occupation: '', contact: '', email: '' },
    emergencyContact: { name: '', contact: '' },
    
    // Step 4: Academic Details
    gradeApplyingFor: '',
    previousSchool: '',
    previousGrade: '',
    academicRecords: null,
    
    // Step 5: Medical Information
    medicalAid: { provider: '', number: '' },
    allergies: '',
    chronicConditions: '',
    doctorDetails: { name: '', contact: '' },
    emergencyMedicalConsent: false,
    
    // Step 6: Additional Information
    citizenship: '',
    idNumber: '',
    firstLanguage: '',
    secondLanguage: '',
    religiousPreference: '',
    transportRequirements: '',
    boardingPreference: '',
    specialNeeds: '',
    
    // Step 7: Document Uploads
    documents: {
      birthCertificate: null,
      proofOfResidence: null,
      parentId: null,
      immunizationRecord: null,
      schoolReports: null
    },
    
    // Step 8: Fees & Payment
    paymentOption: '',
    billingContact: { name: '', email: '', phone: '' },
    paymentMethod: '',
    
    // Step 9: Review & Consent
    termsConsent: false,
    privacyConsent: false,
    signature: ''
  };

  timetableSlots = [
    { time: '08:00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { time: '09:00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { time: '10:00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { time: '11:00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' },
    { time: '12:00', monday: '', tuesday: '', wednesday: '', thursday: '', friday: '' }
  ];

  policies = {
    masteryThreshold: 75,
    latePenalty: 10,
    alertRules: {
      attendanceThreshold: 80,
      gradeThreshold: 60
    }
  };

  auditLogs = [
    { timestamp: '2024-01-15 10:30', user: 'teacher@school.com', action: 'Grade Updated', details: 'Math Grade - Student ID: 123' },
    { timestamp: '2024-01-15 09:15', user: 'admin@school.com', action: 'User Created', details: 'New Teacher Account' },
    { timestamp: '2024-01-15 08:45', user: 'parent@email.com', action: 'Login', details: 'Parent Portal Access' }
  ];

  roles = [
    { name: 'Super Admin', permissions: ['all'] },
    { name: 'Admin', permissions: ['users', 'grades', 'reports'] },
    { name: 'Teacher', permissions: ['grades', 'attendance', 'assignments'] },
    { name: 'Parent', permissions: ['view_child', 'messages'] },
    { name: 'Student', permissions: ['view_grades', 'assignments'] }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  toggleFavorite(item: string, event: Event) {
    event.stopPropagation();
    this.favorites[item] = !this.favorites[item];
  }

  getFavoriteItems() {
    return [
      { name: 'Enrollment Wizard', section: 'enrollment', icon: 'fa-user-plus' },
      { name: 'Timetable Editor', section: 'timetable', icon: 'fa-calendar-alt' },
      { name: 'Policy Center', section: 'policies', icon: 'fa-cogs' },
      { name: 'Audit Logs', section: 'audit', icon: 'fa-clipboard-list' }
    ].filter(item => this.favorites[item.section]);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitEnrollment() {
    console.log('Enrollment submitted:', this.enrollmentData);
  }

  bulkEnroll() {
    console.log('Bulk enrollment initiated');
  }

  saveTimetable() {
    console.log('Timetable saved:', this.timetableSlots);
  }

  updatePolicies() {
    console.log('Policies updated:', this.policies);
  }

  exportAuditLog() {
    console.log('Exporting audit log');
  }

  showCreateUserForm = false;

  newUser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    employeeId: '',
    startDate: ''
  };

  users = [
    { firstName: 'John', lastName: 'Smith', email: 'john.smith@school.com', role: 'Teacher', department: 'Mathematics', status: 'Active', employeeId: 'T001' },
    { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@school.com', role: 'Teacher', department: 'English', status: 'Active', employeeId: 'T002' },
    { firstName: 'Mike', lastName: 'Brown', email: 'mike.brown@school.com', role: 'Admin', department: 'Administration', status: 'Active', employeeId: 'A001' },
    { firstName: 'Lisa', lastName: 'Davis', email: 'lisa.davis@school.com', role: 'Principal', department: 'Administration', status: 'Active', employeeId: 'P001' }
  ];

  createUser() {
    console.log('Creating user:', this.newUser);
    this.users.push({ ...this.newUser, status: 'Active', employeeId: 'AUTO' });
    this.newUser = { firstName: '', lastName: '', email: '', phone: '', role: '', department: '', employeeId: '', startDate: '' };
    this.showCreateUserForm = false;
  }

  editUser(user: any) {
    console.log('Editing user:', user);
  }

  toggleUserStatus(user: any) {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  }

  selectedDepartment = '';
  selectedPeriod = 'current';

  teacherPerformance = [
    {
      name: 'John Smith',
      department: 'Mathematics',
      employeeId: 'T001',
      overallScore: 45,
      passRate: 52,
      attendanceRate: 78,
      assignmentCompletion: 35,
      parentSatisfaction: 65
    },
    {
      name: 'Sarah Johnson',
      department: 'English',
      employeeId: 'T002',
      overallScore: 88,
      passRate: 92,
      attendanceRate: 95,
      assignmentCompletion: 85,
      parentSatisfaction: 80
    },
    {
      name: 'Mike Brown',
      department: 'Science',
      employeeId: 'T003',
      overallScore: 58,
      passRate: 68,
      attendanceRate: 82,
      assignmentCompletion: 45,
      parentSatisfaction: 38
    },
    {
      name: 'Lisa Davis',
      department: 'History',
      employeeId: 'T004',
      overallScore: 92,
      passRate: 95,
      attendanceRate: 98,
      assignmentCompletion: 88,
      parentSatisfaction: 87
    }
  ];

  getPerformanceClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
  }

  getMetricClass(value: number): string {
    if (value >= 90) return 'excellent';
    if (value >= 75) return 'good';
    if (value >= 60) return 'average';
    return 'poor';
  }

  viewTeacherDetails(teacher: any) {
    console.log('Viewing details for:', teacher.name);
  }

  provideSupportPlan(teacher: any) {
    console.log('Creating support plan for:', teacher.name);
  }

  newAnnouncement = {
    title: '',
    message: '',
    targetType: '',
    priority: 'medium',
    subjectFilter: '',
    gradeFilter: '',
    scheduleType: 'immediate',
    scheduledTime: ''
  };

  recentAnnouncements = [
    {
      title: 'Parent-Teacher Conference',
      message: 'Parent-teacher conferences will be held next week. Please schedule your appointments.',
      targetType: 'parents',
      gradeFilter: 'Grade 5',
      subjectFilter: '',
      priority: 'high',
      status: 'sent',
      createdDate: '2024-01-15'
    },
    {
      title: 'Staff Meeting Reminder',
      message: 'Monthly staff meeting scheduled for Friday at 3 PM in the conference room.',
      targetType: 'teachers',
      subjectFilter: '',
      priority: 'medium',
      status: 'sent',
      createdDate: '2024-01-14'
    },
    {
      title: 'School Closure Notice',
      message: 'School will be closed tomorrow due to weather conditions. Stay safe!',
      targetType: 'everyone',
      priority: 'urgent',
      status: 'sent',
      createdDate: '2024-01-13'
    }
  ];

  onTargetTypeChange() {
    this.newAnnouncement.subjectFilter = '';
    this.newAnnouncement.gradeFilter = '';
  }

  sendAnnouncement() {
    console.log('Sending announcement:', this.newAnnouncement);
    this.recentAnnouncements.unshift({
      ...this.newAnnouncement,
      status: this.newAnnouncement.scheduleType === 'scheduled' ? 'scheduled' : 'sent',
      createdDate: new Date().toISOString().split('T')[0]
    });
    this.newAnnouncement = {
      title: '',
      message: '',
      targetType: '',
      priority: 'medium',
      subjectFilter: '',
      gradeFilter: '',
      scheduleType: 'immediate',
      scheduledTime: ''
    };
  }

  previewAnnouncement() {
    console.log('Previewing announcement:', this.newAnnouncement);
  }

  getTargetDescription(announcement: any): string {
    let description = announcement.targetType;
    if (announcement.gradeFilter) description += ` - ${announcement.gradeFilter}`;
    if (announcement.subjectFilter) description += ` - ${announcement.subjectFilter}`;
    return description;
  }

  editAnnouncement(announcement: any) {
    console.log('Editing announcement:', announcement);
  }

  deleteAnnouncement(announcement: any) {
    const index = this.recentAnnouncements.indexOf(announcement);
    if (index > -1) {
      this.recentAnnouncements.splice(index, 1);
    }
  }

  showBulkBilling = false;
  showScheduleBilling = false;

  scheduleBill = {
    name: '',
    targetGroup: 'all_students',
    grade: '',
    billType: 'tuition',
    amount: 0,
    frequency: 'monthly',
    startDate: '',
    dueDay: 5,
    autoGenerate: true
  };

  activeSchedules = [
    {
      id: 'SCH001',
      name: 'Monthly Tuition - All Grades',
      targetGroup: 'all_students',
      billType: 'tuition',
      amount: 1500,
      frequency: 'monthly',
      nextBillDate: '2024-02-05',
      active: true
    },
    {
      id: 'SCH002',
      name: 'Sports Fees - Grade 8-12',
      targetGroup: 'by_grade',
      grade: 'Grade 8-12',
      billType: 'sports',
      amount: 200,
      frequency: 'quarterly',
      nextBillDate: '2024-03-01',
      active: true
    }
  ];

  newBill = {
    studentId: '',
    billType: '',
    description: '',
    amount: 0,
    dueDate: '',
    paymentMethod: 'any',
    priority: 'normal',
    notes: ''
  };

  bulkBill = {
    targetGroup: '',
    grade: '',
    billType: 'tuition',
    amount: 0,
    dueDate: ''
  };

  students = [
    { id: 'S001', name: 'John Doe', grade: 'Grade 5' },
    { id: 'S002', name: 'Jane Smith', grade: 'Grade 7' },
    { id: 'S003', name: 'Mike Johnson', grade: 'Grade 3' },
    { id: 'S004', name: 'Sarah Wilson', grade: 'Grade 9' }
  ];

  recentBills = [
    {
      id: 'B001',
      studentName: 'John Doe',
      billType: 'tuition',
      amount: 1500.00,
      dueDate: '2024-02-15',
      status: 'pending',
      createdDate: '2024-01-15'
    },
    {
      id: 'B002',
      studentName: 'Jane Smith',
      billType: 'transport',
      amount: 250.00,
      dueDate: '2024-02-10',
      status: 'paid',
      createdDate: '2024-01-14'
    },
    {
      id: 'B003',
      studentName: 'Mike Johnson',
      billType: 'meals',
      amount: 180.00,
      dueDate: '2024-02-20',
      status: 'overdue',
      createdDate: '2024-01-10'
    }
  ];

  onBillTypeChange() {
    const billTypeDescriptions: { [key: string]: string } = {
      'tuition': 'Monthly tuition fees',
      'transport': 'School transport fees',
      'meals': 'School meal plan',
      'activities': 'Extra-curricular activities',
      'books': 'Books and learning materials',
      'uniform': 'School uniform',
      'exam': 'Examination fees'
    };
    
    if (this.newBill.billType && billTypeDescriptions[this.newBill.billType]) {
      this.newBill.description = billTypeDescriptions[this.newBill.billType];
    }
  }

  onBulkTargetChange() {
    this.bulkBill.grade = '';
  }

  createBill() {
    console.log('Creating bill:', this.newBill);
    const selectedStudent = this.students.find(s => s.id === this.newBill.studentId);
    if (selectedStudent) {
      this.recentBills.unshift({
        id: 'B' + (this.recentBills.length + 1).toString().padStart(3, '0'),
        studentName: selectedStudent.name,
        billType: this.newBill.billType,
        amount: this.newBill.amount,
        dueDate: this.newBill.dueDate,
        status: 'pending',
        createdDate: new Date().toISOString().split('T')[0]
      });
    }
    this.resetBillForm();
  }

  createBulkBill() {
    console.log('Creating bulk bill:', this.bulkBill);
    // Logic to create bills for multiple students
    this.bulkBill = { targetGroup: '', grade: '', billType: 'tuition', amount: 0, dueDate: '' };
    this.showBulkBilling = false;
  }

  resetBillForm() {
    this.newBill = {
      studentId: '',
      billType: '',
      description: '',
      amount: 0,
      dueDate: '',
      paymentMethod: 'any',
      priority: 'normal',
      notes: ''
    };
  }

  getBillTypeLabel(billType: string): string {
    const labels: { [key: string]: string } = {
      'tuition': 'Tuition',
      'transport': 'Transport',
      'meals': 'Meals',
      'activities': 'Activities',
      'books': 'Books',
      'uniform': 'Uniform',
      'exam': 'Exam'
    };
    return labels[billType] || billType;
  }

  viewBill(bill: any) {
    console.log('Viewing bill:', bill);
  }

  sendReminder(bill: any) {
    console.log('Sending reminder for bill:', bill);
  }

  createSchedule() {
    console.log('Creating billing schedule:', this.scheduleBill);
    this.activeSchedules.push({
      id: 'SCH' + (this.activeSchedules.length + 1).toString().padStart(3, '0'),
      name: this.scheduleBill.name,
      targetGroup: this.scheduleBill.targetGroup,
      grade: this.scheduleBill.grade,
      billType: this.scheduleBill.billType,
      amount: this.scheduleBill.amount,
      frequency: this.scheduleBill.frequency,
      nextBillDate: this.calculateNextBillDate(this.scheduleBill.startDate, this.scheduleBill.dueDay),
      active: true
    });
    this.resetScheduleForm();
  }

  calculateNextBillDate(startDate: string, dueDay: number): string {
    const date = new Date(startDate);
    date.setDate(dueDay);
    if (date < new Date()) {
      date.setMonth(date.getMonth() + 1);
    }
    return date.toISOString().split('T')[0];
  }

  resetScheduleForm() {
    this.scheduleBill = {
      name: '',
      targetGroup: 'all_students',
      grade: '',
      billType: 'tuition',
      amount: 0,
      frequency: 'monthly',
      startDate: '',
      dueDay: 5,
      autoGenerate: true
    };
    this.showScheduleBilling = false;
  }

  editSchedule(schedule: any) {
    console.log('Editing schedule:', schedule);
  }

  toggleSchedule(schedule: any) {
    schedule.active = !schedule.active;
  }

  deleteBill(bill: any) {
    const index = this.recentBills.indexOf(bill);
    if (index > -1) {
      this.recentBills.splice(index, 1);
    }
  }

  newClass = {
    name: '',
    grade: '',
    subject: '',
    teacherId: '',
    classroom: '',
    maxStudents: 30,
    academicYear: '2024-2025',
    term: 'Term 1',
    schedule: {} as { [key: string]: boolean }
  };

  timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  selectedTeacher: any = null;

  availableTeachers = [
    { id: 'T001', name: 'John Smith', subject: 'Mathematics', classCount: 2, maxClasses: 6, available: true },
    { id: 'T002', name: 'Sarah Johnson', subject: 'English', classCount: 4, maxClasses: 6, available: true },
    { id: 'T003', name: 'Mike Brown', subject: 'Science', classCount: 6, maxClasses: 6, available: false },
    { id: 'T004', name: 'Lisa Davis', subject: 'History', classCount: 1, maxClasses: 5, available: true }
  ];

  studentsByGrade: { [key: string]: number } = {
    'Grade 1': 45, 'Grade 2': 52, 'Grade 3': 48, 'Grade 4': 50,
    'Grade 5': 47, 'Grade 6': 49, 'Grade 7': 51, 'Grade 8': 46,
    'Grade 9': 53, 'Grade 10': 48, 'Grade 11': 44, 'Grade 12': 42
  };

  existingClasses = [
    {
      id: 'C001',
      name: 'Mathematics 10A',
      grade: 'Grade 10',
      subject: 'Mathematics',
      teacherName: 'John Smith',
      studentCount: 28,
      maxStudents: 30,
      classroom: 'Room 101',
      status: 'Open'
    },
    {
      id: 'C002',
      name: 'English 9B',
      grade: 'Grade 9',
      subject: 'English',
      teacherName: 'Sarah Johnson',
      studentCount: 25,
      maxStudents: 30,
      classroom: 'Room 102',
      status: 'Open'
    }
  ];

  createClass() {
    if (!this.validateClassCreation()) return;
    
    console.log('Creating class:', this.newClass);
    const teacher = this.availableTeachers.find(t => t.id === this.newClass.teacherId);
    const autoAssignedStudents = Math.min(this.newClass.maxStudents, this.getAvailableStudentCount());
    
    // Update teacher workload
    if (teacher) {
      teacher.classCount++;
      teacher.available = teacher.classCount < teacher.maxClasses;
    }
    
    // Create class with auto-assigned students
    const newClassItem = {
      id: 'C' + (this.existingClasses.length + 1).toString().padStart(3, '0'),
      name: this.newClass.name,
      grade: this.newClass.grade,
      subject: this.newClass.subject,
      teacherName: teacher?.name || '',
      studentCount: autoAssignedStudents,
      maxStudents: this.newClass.maxStudents,
      classroom: this.newClass.classroom,
      status: autoAssignedStudents >= this.newClass.maxStudents ? 'Full' : 'Open'
    };
    
    this.existingClasses.push(newClassItem);
    
    // Reduce available students for the grade
    if (this.studentsByGrade[this.newClass.grade]) {
      this.studentsByGrade[this.newClass.grade] -= autoAssignedStudents;
    }
    
    this.resetClassForm();
  }

  validateClassCreation(): boolean {
    if (!this.selectedTeacher) {
      alert('Please select a teacher');
      return false;
    }
    
    if (this.selectedTeacher.classCount >= this.selectedTeacher.maxClasses) {
      alert('Selected teacher has reached maximum class capacity');
      return false;
    }
    
    if (this.getAvailableStudentCount() === 0) {
      alert('No students available for the selected grade');
      return false;
    }
    
    return true;
  }

  getAvailableTeachers() {
    return this.availableTeachers.filter(t => 
      !this.newClass.subject || t.subject === this.newClass.subject
    );
  }

  getAvailableStudentCount(): number {
    return this.studentsByGrade[this.newClass.grade] || 0;
  }

  onTeacherChange() {
    this.selectedTeacher = this.availableTeachers.find(t => t.id === this.newClass.teacherId);
  }

  getWorkloadClass(teacher: any): string {
    const percentage = (teacher.classCount / teacher.maxClasses) * 100;
    if (percentage >= 100) return 'full';
    if (percentage >= 80) return 'high';
    if (percentage >= 60) return 'medium';
    return 'low';
  }

  previewClass() {
    console.log('Previewing class:', this.newClass);
  }

  resetClassForm() {
    this.newClass = {
      name: '',
      grade: '',
      subject: '',
      teacherId: '',
      classroom: '',
      maxStudents: 30,
      academicYear: '2024-2025',
      term: 'Term 1',
      schedule: {} as { [key: string]: boolean }
    };
    this.selectedTeacher = null;
  }

  editClass(classItem: any) {
    console.log('Editing class:', classItem);
  }

  viewClass(classItem: any) {
    console.log('Viewing class:', classItem);
  }

  deleteClass(classItem: any) {
    const index = this.existingClasses.indexOf(classItem);
    if (index > -1) {
      this.existingClasses.splice(index, 1);
    }
  }

  updateRole(role: any) {
    console.log('Updating role:', role);
  }
}