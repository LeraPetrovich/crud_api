export const checkIsValidBody = (body) => {
  if (!body) {
    return { isValid: false, error: "Request body is missing" };
  }

  const { username, age, hobbies } = body;

  if (!username) {
    return { isValid: false, error: "Field 'username' is required and cannot be empty" };
  }

  if (typeof username !== "string") {
    return { isValid: false, error: "Field 'username' must be a string" };
  }

  if (age === undefined || age === null) {
    return { isValid: false, error: "Field 'age' is required and cannot be empty" };
  }

  if (typeof age !== "number") {
    return { isValid: false, error: "Field 'age' must be a number" };
  }

  if (!Array.isArray(hobbies)) {
    return { isValid: false, error: "Field 'hobbies' is required and must be an array of strings" };
  }

  const allHobbiesAreStrings = hobbies.every(hobby => typeof hobby === "string");
  if (!allHobbiesAreStrings) {
    return { isValid: false, error: "Field 'hobbies' must be an array of strings" };
  }

  return { isValid: true };
};
