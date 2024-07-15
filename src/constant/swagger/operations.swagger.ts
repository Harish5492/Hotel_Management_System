export const SWAGGER_OPERATION = {
  USER: {
    REGISTER_USER: {
      summary: 'Register user',
      description: 'Creating a new user in the database',
    },
    LOGIN_USER: {
      summary: 'Login user Either by mobileNo or email',
      description: 'Login a user so that they can perform various actions',
    },
    SEND_OTP: {
      summary: 'Send OTP to user',
      description:
        "Sending a One-Time Password (OTP) to the user's email or mobile number",
    },
    VERIFY_OTP: {
      summary: 'Verify OTP',
      description: 'Verifying the One-Time Password (OTP) provided by the user',
    },
    MOB_AND_EMAIL_VERIFICATION: {
      summary: 'Verificaiton of Email or Mobile of the User',
      description: 'Verifying the One-Time Password (OTP) provided by the user',
    },
    UPDATE_PASSWORD: {
      summary: 'Update Password Either by Email or Mobile',
      description: 'Update Password of the User',
    },
    CHANGE_PASSWORD: {
      summary: 'Change Password',
      description: 'Change Password of the User',
    },
  },
  TEST: {
    ADD_TEST: {
      summary: 'Add Your Test to the Database',
      description: 'Add the Test so that it can be executed',
    },
    REMOVE_TEST: {
      summary: 'Delete Your Test to the Database',
      description: 'Delete the Test from the entire database',
    },
    PATIENT_TEST_TAKEN: {
      summary: 'test taken by patient ',
      description: 'test taken by patient in the array in database',
    },
    TOTAL_TEST_TO_PATIENT: {
      summary: 'total test taken by the patient',
      description: 'fetch all the test taken by the patient by his user id',
    },
    DISEASES_TO_PATIENT: {
      summary: 'add the disease of patient',
      description: 'disease suffering from patient is added here',
    },
  },
};
