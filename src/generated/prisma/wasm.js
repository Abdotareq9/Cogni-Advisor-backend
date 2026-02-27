
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.CITIESScalarFieldEnum = {
  city_id: 'city_id',
  city_name: 'city_name'
};

exports.Prisma.DEPARTMENTSScalarFieldEnum = {
  dept_id: 'dept_id',
  dept_name: 'dept_name',
  dept_code: 'dept_code'
};

exports.Prisma.USERSScalarFieldEnum = {
  user_id: 'user_id',
  first_name: 'first_name',
  middle_name: 'middle_name',
  last_name: 'last_name',
  national_id: 'national_id',
  personal_email: 'personal_email',
  password_hash: 'password_hash',
  gender: 'gender',
  city_id: 'city_id',
  street_address: 'street_address',
  created_at: 'created_at'
};

exports.Prisma.USER_PHONESScalarFieldEnum = {
  phone_id: 'phone_id',
  user_id: 'user_id',
  phone_number: 'phone_number'
};

exports.Prisma.ROLESScalarFieldEnum = {
  role_id: 'role_id',
  role_name: 'role_name'
};

exports.Prisma.PERMISSIONSScalarFieldEnum = {
  perm_id: 'perm_id',
  perm_key: 'perm_key'
};

exports.Prisma.ROLE_PERMISSIONSScalarFieldEnum = {
  role_id: 'role_id',
  perm_id: 'perm_id'
};

exports.Prisma.STUDENTScalarFieldEnum = {
  student_id: 'student_id',
  dept_id: 'dept_id',
  major_type: 'major_type',
  level: 'level',
  cumulative_gpa: 'cumulative_gpa',
  total_earned_hours: 'total_earned_hours',
  status: 'status'
};

exports.Prisma.ADVISORScalarFieldEnum = {
  advisor_id: 'advisor_id',
  dept_id: 'dept_id'
};

exports.Prisma.ADMINScalarFieldEnum = {
  admin_id: 'admin_id'
};

exports.Prisma.COURSESScalarFieldEnum = {
  course_id: 'course_id',
  course_code: 'course_code',
  course_name: 'course_name',
  credits: 'credits',
  required_hours_to_take: 'required_hours_to_take',
  is_available: 'is_available'
};

exports.Prisma.COURSE_PREREQUISITESScalarFieldEnum = {
  course_id: 'course_id',
  prereq_course_id: 'prereq_course_id'
};

exports.Prisma.SEMESTERSScalarFieldEnum = {
  semester_id: 'semester_id',
  semester_name: 'semester_name',
  start_date: 'start_date',
  end_date: 'end_date'
};

exports.Prisma.STUDY_PLANSScalarFieldEnum = {
  plan_id: 'plan_id',
  student_id: 'student_id',
  semester_id: 'semester_id',
  plan_status: 'plan_status'
};

exports.Prisma.PLAN_DETAILSScalarFieldEnum = {
  plan_id: 'plan_id',
  course_id: 'course_id'
};

exports.Prisma.SEMESTER_RECORDSScalarFieldEnum = {
  record_id: 'record_id',
  student_id: 'student_id',
  semester_id: 'semester_id',
  semester_gpa: 'semester_gpa',
  registered_hours: 'registered_hours'
};

exports.Prisma.FEEDBACKScalarFieldEnum = {
  feed_id: 'feed_id',
  student_id: 'student_id',
  advisor_id: 'advisor_id',
  message: 'message',
  created_at: 'created_at'
};

exports.Prisma.NOTIFICATIONSScalarFieldEnum = {
  notification_id: 'notification_id',
  recipient_id: 'recipient_id',
  title: 'title',
  body: 'body',
  is_read: 'is_read',
  sent_at: 'sent_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  CITIES: 'CITIES',
  DEPARTMENTS: 'DEPARTMENTS',
  USERS: 'USERS',
  USER_PHONES: 'USER_PHONES',
  ROLES: 'ROLES',
  PERMISSIONS: 'PERMISSIONS',
  ROLE_PERMISSIONS: 'ROLE_PERMISSIONS',
  STUDENT: 'STUDENT',
  ADVISOR: 'ADVISOR',
  ADMIN: 'ADMIN',
  COURSES: 'COURSES',
  COURSE_PREREQUISITES: 'COURSE_PREREQUISITES',
  SEMESTERS: 'SEMESTERS',
  STUDY_PLANS: 'STUDY_PLANS',
  PLAN_DETAILS: 'PLAN_DETAILS',
  SEMESTER_RECORDS: 'SEMESTER_RECORDS',
  FEEDBACK: 'FEEDBACK',
  NOTIFICATIONS: 'NOTIFICATIONS'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
