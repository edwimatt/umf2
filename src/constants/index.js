const baseURlDEV = "https://understandingmyfacility.com/api/";
const baseImageURLDEV = "https://understandingmyfacility.com/api/";
const contentURl = "https://understandingmyfacility.com/layout/";
// https://retrocubedev.com/qa/umf_web_api/public/api/
// https://understandingmyfacility.com/api/"
const constant = {
  //App Constants
  baseURL: baseURlDEV,
  contentURl: contentURl,
  baseImageURL: baseImageURLDEV,
  applicationToken: "api.Pd*!(5675",
  file: "file://",

  //App Data API
  appData: "app-data",

  // User API
  signup: "user",
  login: "user/login",
  forgotPassword: "user/forgot/password",
  changePassword: "user/change/password",
  updateProfile: "user/update?",
  updatePassword: "user/update-password",
  logout: "user/mobilelogout",
  interestHobbies: "interest-hobbies",

  // Languages API
  getLanguages: "languages",
  updateLanguage: "update-user-language?",

  // Categories
  getCategories: "categories",
  getCoursebyID: "all-course-by-category-id",

  //Course
  getCourseDetails: "course-details-by-id",
  courseCompleted: "mark-complete-course",

  // Quiz API
  getQuizByCourseID: "quiz-questions-by-course-id",
  submitQuizAwnsers: "post-quiz-answer",

  //News API
  getNews: "news-list",
  getNewsDetails: "news-details",

  // MY Trainings API
  getMyTrainings: "user-quiz-list",

  // Certificates API
  getCertificates: "user-certificates",
  getCertificateDetails: "user-certificates-details",

  // Course Search API
  getSearchCourse: "search-course",

  // Notification
  getNotificationSettings: "notification/notification_settings",
  saveNotificationSettings: "notification/update-notification-settings",
  getChatCount: "message-counter",

  //Help and FAQ
  faqURL: "faq",

  // privacy policy
  privacyPolicy: "privacy-policy",

  // terms conditions
  termsConditions: "terms-and-conditions",

  // Notification Identifiers
  NEWS_ALERT: "news_alert",

  // Post API
  createPost: "post",
  getPost: "post",
  deletePost: "post",

  // Like API
  likePost: "like",

  // Comment API
  addComment: "comment",
  getComments: "comment",

  // Vote API
  addVote: "votes",

  // Event API
  getEvent: "event",
  getEventByID: "event",
  getLeaderboard: "leader-board",

  familyMember: "family-member",
  mySteward: "my-steward",
  relation: "relation",

  LOCATION_TIME_OUT: 10000,
  LOCATION_MAX_AGE: 1000,
  LOCATION_HIGH_ACCURACY: false,

  reactTypes: {
    SMILE: "Smile",
    FIRE: "Fire",
    STROM: "Strom",
    BUCKET: "Bucket",
    ANGRY: "Angry",
    HYPNOTIZED: "Hypnotized",
    HAPPY: "Happy",
  },

  actionTypes: {
    REACT: "react",
    COMMENT: "comment",
    VOTES: "votes",
  },
};

export default constant;
