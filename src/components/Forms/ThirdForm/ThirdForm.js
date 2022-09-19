import useInput from "../../Hooks/useInput";
import React from "react";
import { dataArray } from "../FirstForm/FirstForm";

let radio;
const radioData = (event) => {
  radio = event.target.value;
};

const ThirdForm = ({ page, setPage }) => {
  const {
    value: enteredFullName,
    hasError: FullNameError,
    isValid: FullNameIsValid,
    valueChangeHandler: fullNameChangeHandler,
    blurValueChangeHandler: blurFullNameChangeHandler,
    reset: FullNameReseter,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAge,
    hasError: ageError,
    isValid: ageIsValid,
    valueChangeHandler: ageChangeHandler,
    blurValueChangeHandler: blurAgeChangeHandler,
    reset: ageReseter,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (FullNameIsValid && ageIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (!FullNameIsValid || !ageIsValid) {
      return;
    }

    // Clearing input fields after submission

    let FullName;
    let Age;

    const data = [(FullName = enteredFullName), (Age = enteredAge)];

    dataArray.push(...data);
    dataArray.push(radio);

    FullNameReseter();
    ageReseter();
    setPage(page + 1);
  };

  const FullNameClassNames = FullNameError
    ? "form-control invalid"
    : "form-control";

  const ageClassNames = ageError ? "form-control invalid" : "form-control";

  return (
    <fieldset>
      <legend>Bio Data:</legend>
      <form onSubmit={formSubmitHandler}>
        <div className={FullNameClassNames}>
          <label htmlFor="fullname">Enter Your Full Name</label>
          <input
            type="text"
            id="fullname"
            value={enteredFullName}
            onChange={fullNameChangeHandler}
            onBlur={blurFullNameChangeHandler}
            placeholder="Full Name"
          />
          {FullNameError && <p>Enter a valid Full name!</p>}
        </div>
        <div className={ageClassNames}>
          <label htmlFor="age">Enter Your age</label>
          <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHandler}
            onBlur={blurAgeChangeHandler}
            placeholder="Age"
          />
          {ageError && <p>Enter Your age 0!</p>}
        </div>
        <div>
          <label>Select Your Gender</label>
          <div onChange={radioData}>
            <label htmlFor="gender">
              <input type="radio" name="gender" value="Male" defaultChecked />
              Male
            </label>

            <label htmlFor="gender">
              <input type="radio" name="gender" value="Female" />
              Female
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </button>

          <button disabled={!formIsValid}>Next</button>
        </div>
      </form>
    </fieldset>
  );
};

export default ThirdForm;
