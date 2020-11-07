import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {RegisterFormComponent} from './register-form.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

const validInputValues = {
  username: 'abcd',
  password: 'abcdEFG123'
};

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(RegisterFormComponent);
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

  it('should show message when isCreated is true', () => {
    component.isCreated = true;
    fixture.detectChanges();
    const message = Array.from(el.queryAll(By.css('p')))
      .find((paragraphs) => paragraphs.nativeElement.textContent === 'Je account is aangemaakt.');
    expect(message).toBeTruthy();
  });

  it('should show message when saving the user failed', () => {
    component.saveFailedReason = 'some error';
    fixture.detectChanges();
    const message = Array.from(el.queryAll(By.css('p')))
      .find((paragraphs) => paragraphs.nativeElement.textContent === 'Opslaan van de gebruiker is gefaald. Reden: "some error"');
    expect(message).toBeTruthy();
  });
});
