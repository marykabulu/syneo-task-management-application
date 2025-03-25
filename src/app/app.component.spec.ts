import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'syneo-task-management-application' title`, () => {
    expect(component.title).toEqual('syneo-task-management-application');
  });

  it('should render title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain(
      'Hello, syneo-task-management-application',
    );
  });
});
