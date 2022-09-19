import useInput from "../../Hooks/useInput";
import React from "react";
import styles from "./SelectCSS.module.css";

import { dataArray } from "../FirstForm/FirstForm";

const SecondForm = ({ page, setPage }) => {
  const {
    value: enteredCity,
    hasError: CityError,
    isValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    blurValueChangeHandler: blurcityChangeHandler,
    reset: cityReseter,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredArea,
    hasError: areaError,
    isValid: areaIsValid,
    valueChangeHandler: areaChangeHandler,
    blurValueChangeHandler: blurareaChangeHandler,
    reset: areaReseter,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredPostalCode,
    hasError: PCError,
    isValid: PCIsValid,
    valueChangeHandler: PCChangeHandler,
    blurValueChangeHandler: blurPCChangeHandler,
    reset: PCReseter,
  } = useInput((value) => value.trim().length > 4);

  let formIsValid = false;
  if (cityIsValid && areaIsValid && PCIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!cityIsValid || !areaIsValid || !PCIsValid) {
      return;
    }

    let City;
    let Area;
    let PostalCode;

    const data = [
      (City = enteredCity),
      (Area = enteredArea),
      (PostalCode = enteredPostalCode),
    ];

    dataArray.push(...data);
    // Clearing input fields after submission
    cityReseter();
    areaReseter();
    PCReseter();
    console.clear();
    alert("You've successfully submitted this form");

    setPage(page - 2);
  };
  const getData = (event) => {
    const selectedData = event.target.value;
    if (selectedData === false) {
      formIsValid = false;
    }
    dataArray.push(selectedData);
  };

  const cityClassNames = CityError ? "form-control invalid" : "form-control";
  const areaClassNames = areaError ? "form-control invalid" : "form-control";
  const PCClassNames = PCError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <fieldset>
        <legend>Address:</legend>
        <label className="form-control label">Entry Country Name: </label>
        <b />
        <select
          id="countries"
          name="countries"
          className={styles["custom-select"]}
          onChange={getData}
        >
          <option>Select...</option>
          <option>Pakistan</option>
          <option>Australlia</option>
          <option>Argentina</option>
          <option>Saudi Arabia</option>
        </select>

        <div className={cityClassNames}>
          <label htmlFor="city">Enter City Name</label>
          <input
            type="text"
            id="city"
            value={enteredCity}
            onChange={cityChangeHandler}
            onBlur={blurcityChangeHandler}
            placeholder="City Name"
          />
          {CityError && <p>Enter a valid City name!</p>}
        </div>
        <div className={areaClassNames}>
          <label htmlFor="area">Enter your Location</label>
          <input
            type="text"
            id="area"
            value={enteredArea}
            onChange={areaChangeHandler}
            onBlur={blurareaChangeHandler}
            placeholder="Location"
          />
          {CityError && <p>Enter a valid Location!</p>}
        </div>
        <div className={PCClassNames}>
          <label htmlFor="PC">Enter your 5-digit Postal Code</label>
          <input
            type="number"
            id="PC"
            value={enteredPostalCode}
            onChange={PCChangeHandler}
            onBlur={blurPCChangeHandler}
            placeholder="Postal Code"
          />
          {PCError && <p>Enter a valid Postal Code!</p>}
        </div>
        <div className="form-actions">
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            Previous
          </button>
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </fieldset>
    </form>
  );
};

export default SecondForm;
