import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {AuthFormComponent} from './auth-form.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {passwordMatch} from '../../../../../../../be/src/validation-helpers';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFormComponent ],
      imports: [ ReactiveFormsModule ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('username field', () => {
    it('should render', () => {
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      expect(inputName).toBeTruthy();
    });
    it('should show error message when the value is too short', () => {
      const expectedError = { minlength: { requiredLength: 4, actualLength: 1 } };
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      inputName.value = 'a';
      inputName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { username: { errors } } } = component.form;
      expect(errors).toEqual(jasmine.objectContaining(expectedError));
    });
    it('should show error message when the value is too long', () => {
      const expectedError = { maxlength: { requiredLength: 60, actualLength: 61 } };
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      inputName.value = 'a'.repeat(61);
      inputName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { username: { errors } } } = component.form;
      expect(errors).toEqual(jasmine.objectContaining(expectedError));
    });
    it('can be valid', () => {
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      inputName.value = 'abcd';
      inputName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { username: { valid } } } = component.form;
      expect(valid).toBeTrue();
    });
    it('is required', () => {
      const inputName: HTMLInputElement = el.query(By.css('input#username')).nativeElement;
      inputName.focus();
      inputName.blur();
      fixture.detectChanges();
      const { controls: { username: { errors: { required } } } } = component.form;
      expect(required).toBeTrue();
    });
  });

  describe('password field', () => {
    it('should render', () => {
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      expect(inputPassword).toBeTruthy();
    });
    it('should show validation error message as first error', () => {
      const expectedError = { pattern: { requiredPattern: `${passwordMatch}`, actualValue: 'a' } };
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      inputPassword.value = 'a';
      inputPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { password: { errors } } } = component.form;
      expect(errors).toEqual(jasmine.objectContaining(expectedError));
    });
    it('should show error message when the value is too short', () => {
      const validPattern = 'aB1';
      const expectedError = { minlength: { requiredLength: 8, actualLength: validPattern.length } };
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      inputPassword.value = validPattern;
      inputPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { password: { errors } } } = component.form;
      expect(errors).toEqual(jasmine.objectContaining(expectedError));
    });
    it('should show error message when the value is too long', () => {
      const validPattern = 'aB1';
      const passwordTooLong = validPattern + 'a'.repeat(61 - validPattern.length);
      const expectedError = { maxlength: { requiredLength: 60, actualLength: passwordTooLong.length } };
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      inputPassword.value = passwordTooLong;
      inputPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { password: { errors } } } = component.form;
      expect(errors).toEqual(jasmine.objectContaining(expectedError));
    });
    it('can be valid', () => {
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      inputPassword.value = 'abcdE123';
      inputPassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const { controls: { password: { valid } } } = component.form;
      expect(valid).toBeTrue();
    });
    it('is required', () => {
      const inputPassword: HTMLInputElement = el.query(By.css('input#password')).nativeElement;
      inputPassword.focus();
      inputPassword.blur();
      fixture.detectChanges();
      const { controls: { username: { errors: { required } } } } = component.form;
      expect(required).toBeTrue();
    });
  });

  xdescribe('handles output isValidForm', () => {});

  xdescribe('handles output submitted', () => {});
});
