import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

const validInputValues = {
  username: 'abcd',
  password: 'abcdEFG123'
};

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('username field', () => {
    it('should render', () => {
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      expect(inputName).toBeTruthy();
    });
  });

  describe('password field', () => {
    it('should render', () => {
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      expect(inputPassword).toBeTruthy();
    });
  });

  describe('submit button', () => {
    it('should render', () => {
      const button: HTMLButtonElement = el.query(By.css('button')).nativeElement;
      expect(button).toBeTruthy();
    });

    it('should be disabled by default', async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const button: HTMLButtonElement = el.query(By.css('button')).nativeElement;
      expect(button.disabled).toBeTrue();
    });
  });

  describe('when the form is filled in correctly', () => {
    let button: HTMLButtonElement;

    beforeEach(async () => {
      await fixture.whenStable();
      fixture.detectChanges();
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      inputName.value = validInputValues.username;
      inputName.dispatchEvent(new Event('input'));
      inputPassword.value = validInputValues.password;
      inputPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    });

    it('should be enable the save button', async () => {
      button = el.query(By.css('button')).nativeElement;
      expect(button.disabled).toBeFalse();
    });

    it('should submit', () => {
      const spyHandleSubmit = spyOn(component, 'handleSubmit').and.returnValue();
      button = el.query(By.css('button')).nativeElement;
      button.click();
      fixture.detectChanges();
      expect(spyHandleSubmit).toHaveBeenCalledWith(validInputValues, true);
    });
  });

  it('should show message when saving the user failed', () => {
    component.signInFailedReason = 'some error';
    fixture.detectChanges();
    const message = Array.from(el.queryAll(By.css('p')))
      .find((paragraphs) => paragraphs.nativeElement.textContent === 'Inloggen mislukt. Reden: "some error"');
    expect(message).toBeTruthy();
  });
});
