import { dataArray } from "../FirstForm/FirstForm";

const OverAllData = () => {
  var keys = [
    "FirstName",
    "LastName",
    "Email",
    "Password",
    "Image Name",
    "FullName",
    "Age",
    "Gender",
    "Country",
    "City",
    "Area",
    "PostalCode",
  ];

  const Object = {};

  dataArray.forEach((elem, i) => {
    Object[keys[i]] = elem;
  });
  const newObj = JSON.stringify(Object);
  console.log(newObj);
};

export default OverAllData;
