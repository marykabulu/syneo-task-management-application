import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  parent = {
    name: 'Michael',
    surname: 'Johnson',
    email: 'michael.johnson@email.com',
    phone: '+1 555-0123'
  };

  child = {
    id: 1,
    name: 'Emma',
    surname: 'Johnson',
    grade: 'Grade 10',
    class: '10A',
    classTeacher: 'Ms. Smith',
    overallAverage: 85,
    attendance: 95,
    subjects: [
      { name: 'Mathematics', grade: 'A-', percentage: 82, teacher: 'Mr. Brown', struggling: ['Calculus'], mastered: ['Algebra', 'Geometry'] },
      { name: 'Physics', grade: 'B+', percentage: 78, teacher: 'Dr. Wilson', struggling: ['Quantum Physics'], mastered: ['Mechanics', 'Waves'] },
      { name: 'Chemistry', grade: 'A', percentage: 88, teacher: 'Ms. Davis', struggling: [], mastered: ['Organic Chemistry', 'Acids & Bases'] }
    ]
  };

  activeSection = 'overview';
  isSidebarCollapsed = false;
  isChatbotOpen = false;
  newMessage = '';
  
  chatMessages = [
    {
      type: 'bot',
      text: 'Hello! I\'m your Guardian Assistant. I can help you with information about Emma\'s performance, billing, schedules, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ];

  billing = {
    currentBalance: 2450.00,
    totalCharges: 5650.00,
    totalPaid: 3200.00,
    dueDate: new Date('2025-02-15'),
    lastPayment: new Date('2025-01-15'),
    nextReminder: new Date('2025-02-10')
  };

  billingHistory = [
    { date: '2024-02-01', description: 'Monthly Tuition - February', type: 'charge', amount: 1500.00, status: 'pending' },
    { date: '2024-01-25', description: 'Sports Fees - Q1', type: 'charge', amount: 200.00, status: 'pending' },
    { date: '2024-01-20', description: 'Transport Fees - January', type: 'charge', amount: 250.00, status: 'pending' },
    { date: '2024-01-15', description: 'Payment Received', type: 'payment', amount: 1500.00, status: 'completed' },
    { date: '2024-01-01', description: 'Monthly Tuition - January', type: 'charge', amount: 1500.00, status: 'paid' },
    { date: '2023-12-15', description: 'Payment Received', type: 'payment', amount: 1700.00, status: 'completed' }
  ];

  schedule = [
    { time: '08:00', subject: 'Mathematics', teacher: 'Mr. Brown', room: 'Room 101' },
    { time: '09:00', subject: 'Physics', teacher: 'Dr. Wilson', room: 'Lab 2' },
    { time: '10:30', subject: 'Chemistry', teacher: 'Ms. Davis', room: 'Lab 1' },
    { time: '12:00', subject: 'English', teacher: 'Mrs. Taylor', room: 'Room 205' }
  ];

  whatsappInvitations = [
    { id: 1, groupName: 'Grade 10A Parents', invitedBy: 'Ms. Smith', status: 'pending' },
    { id: 2, groupName: 'Mathematics Parents Group', invitedBy: 'Mr. Brown', status: 'pending' }
  ];

  schoolAnnouncements = [
    {
      id: 1,
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-teacher conferences will be held next week. Please book your preferred time slot through the school portal.',
      date: new Date('2025-01-20'),
      sender: 'School Administration',
      priority: 'important'
    },
    {
      id: 2,
      title: 'School Closure - Weather Alert',
      content: 'Due to severe weather conditions, the school will be closed tomorrow. All classes are cancelled.',
      date: new Date('2025-01-18'),
      sender: 'Principal Office',
      priority: 'urgent'
    },
    {
      id: 3,
      title: 'Sports Day Registration Open',
      content: 'Registration for the annual sports day is now open. Students can sign up for various events through their class teachers.',
      date: new Date('2025-01-15'),
      sender: 'Sports Department',
      priority: 'regular'
    }
  ];

  emails = [
    {
      id: 1,
      sender: 'Mr. Brown (Mathematics Teacher)',
      subject: 'Emma\'s Progress in Mathematics',
      preview: 'I wanted to update you on Emma\'s recent performance in mathematics...',
      content: 'Dear Mr. Johnson, I wanted to update you on Emma\'s recent performance in mathematics. She has shown excellent improvement in algebra and geometry, but is struggling with calculus concepts. I recommend additional practice with derivatives and limits. Please let me know if you have any questions.',
      date: new Date('2025-01-20T10:30:00'),
      read: false
    },
    {
      id: 2,
      sender: 'School Administration',
      subject: 'Fee Payment Reminder',
      preview: 'This is a friendly reminder that your school fees are due...',
      content: 'Dear Parent, This is a friendly reminder that your school fees for the current term are due on February 15th, 2025. The outstanding amount is $2,450.00. Please make the payment through our online portal or visit the school office. Thank you for your cooperation.',
      date: new Date('2025-01-19T14:15:00'),
      read: true
    },
    {
      id: 3,
      sender: 'Ms. Smith (Class Teacher)',
      subject: 'Parent-Teacher Conference Invitation',
      preview: 'You are invited to attend the upcoming parent-teacher conference...',
      content: 'Dear Mr. and Mrs. Johnson, You are cordially invited to attend the upcoming parent-teacher conference scheduled for next week. This is an excellent opportunity to discuss Emma\'s academic progress and any concerns you may have. Please book your preferred time slot through the school portal.',
      date: new Date('2025-01-18T09:00:00'),
      read: true
    }
  ];

  selectedEmail: any = null;
  replyMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
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
    
    if (msg.includes('performance') || msg.includes('grade')) {
      return `Emma is performing well with an overall average of ${this.child.overallAverage}%. Her strongest subject is Chemistry (${this.child.subjects[2].percentage}%) and she's working on improving in Physics.`;
    }
    if (msg.includes('billing') || msg.includes('fee') || msg.includes('payment')) {
      return `Your current balance is $${this.billing.currentBalance}. The next payment is due on ${this.billing.dueDate.toDateString()}. Would you like me to help you with payment options?`;
    }
    if (msg.includes('schedule') || msg.includes('timetable')) {
      return `Today Emma has ${this.schedule.length} classes starting with Mathematics at 08:00. Would you like to see the full schedule?`;
    }
    if (msg.includes('attendance') || msg.includes('absent')) {
      return `Emma has excellent attendance at ${this.child.attendance}%. She's been very consistent this term.`;
    }
    if (msg.includes('teacher') || msg.includes('contact')) {
      return 'Emma\'s class teacher is Ms. Smith. Her subject teachers include Mr. Brown (Math), Dr. Wilson (Physics), and Ms. Davis (Chemistry). Would you like their contact information?';
    }
    
    return 'I can help you with Emma\'s academic performance, billing information, daily schedules, attendance, and teacher contacts. What would you like to know more about?';
  }

  payFees(): void {
    console.log('Redirecting to payment portal...');
  }

  contactTeacher(subject: string): void {
    console.log('Contacting teacher for:', subject);
  }

  acceptInvitation(invitationId: number): void {
    console.log('Accepting WhatsApp invitation:', invitationId);
  }

  declineInvitation(invitationId: number): void {
    console.log('Declining WhatsApp invitation:', invitationId);
  }

  contactTeacherWhatsApp(teacher: string): void {
    console.log('Contacting teacher via WhatsApp:', teacher);
  }

  contactTeacherEmail(teacher: string): void {
    console.log('Contacting teacher via email:', teacher);
  }

  emailSchoolAdmin(): void {
    console.log('Emailing school administration');
  }

  openEmail(emailId: number): void {
    this.selectedEmail = this.emails.find(email => email.id === emailId);
    if (this.selectedEmail && !this.selectedEmail.read) {
      this.selectedEmail.read = true;
    }
  }

  backToMailList(): void {
    this.selectedEmail = null;
    this.replyMessage = '';
  }

  sendReply(): void {
    if (this.replyMessage.trim()) {
      console.log('Sending reply:', this.replyMessage);
      alert('Reply sent successfully!');
      this.replyMessage = '';
    }
  }

  calculateBalance(): number {
    let balance = 0;
    this.billingHistory.forEach(item => {
      if (item.type === 'charge' && item.status !== 'paid') {
        balance += item.amount;
      }
    });
    return balance;
  }

  payBill(bill: any): void {
    console.log('Paying bill:', bill);
    bill.status = 'paid';
    this.billing.currentBalance = this.calculateBalance();
  }

  makePayment(): void {
    console.log('Processing payment for current balance');
  }
}