import { useState } from "react";
import useInput from "../../Hooks/useInput";
import Dropzone from "./Dropzone";

export let dataArray = [];

const FirstForm = ({ page, setPage }, props) => {
  const [image, setImage] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const getImage = (file) => {
    setImage(file);
  };

  //Initializing Input Fields

  const {
    value: enteredName,
    hasError: nameError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    blurValueChangeHandler: blurNameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    hasError: lastNameError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    blurValueChangeHandler: blurLastNameChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    blurValueChangeHandler: bluremailChangeHandler,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    blurValueChangeHandler: blurpasswordChangeHandler,
  } = useInput((value) => value.trim().length > 6);

  const {
    value: enteredConfirmPassword,
    hasError: ConfirmPasswordError,
    isValid: ConfirmPasswordIsValid,
    valueChangeHandler: ConfirmPasswordChangeHandler,
    blurValueChangeHandler: blurConfirmPasswordChangeHandler,
  } = useInput((value) => value.trim() === enteredPassword);

  //Form Validation and Submition

  let formIsValid = false;
  if (
    nameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    ConfirmPasswordIsValid &&
    image !== null
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !nameIsValid ||
      !lastNameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !ConfirmPasswordIsValid
    ) {
      return;
    }

    let FirstName;
    let LastName;
    let Email;
    let Password;

    const data = [
      (FirstName = enteredName),
      (LastName = enteredLastName),
      (Email = enteredEmail),
      (Password = enteredPassword),
    ];

    dataArray.push(...data);
    // Clearing input fields after submission
    let img;
    const imgName = (img = image.name);
    dataArray.push(imgName);

    setPage(page + 1);
  };

  //Changing CSS classes if valid or not valid

  const emailInputClassName = emailError
    ? "form-control invalid"
    : "form-control";

  const nameInputClassName = nameError
    ? "form-control invalid"
    : "form-control";
  const lastNameInputClassName = lastNameError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClassName = passwordError
    ? "form-control invalid"
    : "form-control";

  const confirmPasswordInputClassName = ConfirmPasswordError
    ? "form-control invalid"
    : "form-control";

  //Show Password Toggleing

  const showPassword = () => {
    setShowPass((showPass) => !showPass);
  };

  return (
    <fieldset>
      <legend>Account Info:</legend>
      <form onSubmit={formSubmitHandler}>
        <div className="control-group">
          <div className={nameInputClassName}>
            <label htmlFor="Firstname">First Name</label>
            <input
              type="text"
              id="Firstname"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={blurNameChangeHandler}
              placeholder="First Name"
            />
            {nameError && <p>Enter a valid first name!</p>}
          </div>
          <div className={lastNameInputClassName}>
            <label htmlFor="Lastname">Last Name</label>
            <input
              type="text"
              id="Lastname"
              value={enteredLastName}
              onChange={lastNameChangeHandler}
              onBlur={blurLastNameChangeHandler}
              placeholder="Last Name"
            />
            {lastNameError && <p>Enter a valid last name!</p>}
          </div>
        </div>
        <div className={emailInputClassName}>
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="text"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={bluremailChangeHandler}
            placeholder="E-Mail Address"
          />
          {emailError && <p>Enter a E-mail!</p>}
        </div>
        <div className="control-group">
          <div className={passwordInputClassName}>
            <label htmlFor="password">password</label>
            <input
              type={showPass ? "text" : "password"}
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={blurpasswordChangeHandler}
              placeholder="password"
            />
            {passwordError && (
              <p>password should be at least 7 characters long!</p>
            )}
            <label> showPass</label>
            <input
              id="radia"
              type="checkbox"
              checked={showPass}
              onChange={showPassword}
            />
          </div>

          <div className={confirmPasswordInputClassName}>
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              type="password"
              id="ConfirmPassword"
              value={enteredConfirmPassword}
              onChange={ConfirmPasswordChangeHandler}
              onBlur={blurConfirmPasswordChangeHandler}
              placeholder="confirm password"
            />

            {ConfirmPasswordError && <p>Password do not match</p>}
          </div>
        </div>

        <div>
          <Dropzone setImage={getImage} />
        </div>

        <div className="form-actions">
          <button disabled={!formIsValid}>Next</button>
        </div>
      </form>
    </fieldset>
  );
};

export default FirstForm;
