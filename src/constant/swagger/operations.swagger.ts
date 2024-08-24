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
    DOCTOR_AVALIABLITY: {
      summary: 'Check the avaliability of the doctor ',
      description:
        'check the avaliability of the doctor is doctor present or not',
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
    TEST_STATUS: {
      summary: 'Status of the Test ',
      description: 'Status of the Test of the patient',
    },
    GET_ALL_TESTS: {
      summary: 'Get all the Tests',
      description:
        'User gets all the test which is added and which is taken by labs',
    },
  },
  PATIENT: {
    ADD_PATIENT_DATA: {
      summary: 'Add the patient data',
      description:
        ' Add the patient data for to check the details of treatment of particular patient',
    },
    UPDATE_PATIENT_DATA: {
      summary: 'Update the patient data',
      description:
        'Update the record of the patient as treatment will changes according to the disease',
    },
    GET_PATIENT_DETAILS: {
      summary: 'Get the patient detials',
      description: 'get all the patient details',
    },
    PATIENT_REFER: {
      summary: 'Regarding Patient Refer',
      description: 'Patient refer to the next hospital',
    },
    GET_APPOINTMENT: {
      summary: 'Retrieve Appointment Details',
      description:
        'Fetches information about patient appointments, including referrals to other hospitals if applicable.',
    },
    GET_ALL_APPOINTMENT: {
      summary: 'Get All Apointments',
      description: 'Get All The Appointments which registers from the patients',
    },
  },
  MANAGEMENT: {
    ADD_AMBULANCE: {
      summary: 'Add the Ambulance',
      description:
        ' Add the Ambulance so that patient can transfer one hospital to other or also in home',
    },
    UPDATE_AMBULANCE_AVALIBILITY_STATUS: {
      summary: 'Update the avalibility status of ambulance',
      description: ' Update the Ambulance status',
    },
    GET_ALL_AMBULANCE: {
      summary: 'All ambulance in the hospital',
      description: 'Get all the Ambulance in the hospital',
    },
    FACILITY_ADDED: {
      summary: 'Add the facility',
      description: ' Add the facility for the patient convenience',
    },
    UPDATE_FACILITY_STATUS: {
      summary: 'Update the facility status',
      description: ' Update the service facility status',
    },
    GET_ALL_FACILITY: {
      summary: 'All facility like bed and wheelchair',
      description: 'get all the available wheelchair and bed in details',
    },
    AMBULANCE_TAKEN_BY_PATIENT: {
      summary: 'Ambulance taken by patient',
      description: 'Ambulance taken by the patient data',
    },
    FACILITY_TAKEN_BY_PATIENT: {
      summary: 'Facility taken by patient',
      description: 'Facility taken by the patient',
    },
  },
};
