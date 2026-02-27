
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/edge.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\MERN\\cogniadvisor\\src\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "D:\\MERN\\cogniadvisor\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.6.0",
  "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel CITIES {\n  city_id   Int    @id @default(autoincrement())\n  city_name String @unique @db.VarChar(50)\n\n  users USERS[]\n}\n\nmodel DEPARTMENTS {\n  dept_id   Int     @id @default(autoincrement())\n  dept_name String  @unique @db.VarChar(100)\n  dept_code String? @unique @db.VarChar(10)\n\n  students STUDENT[]\n  advisors ADVISOR[]\n}\n\nmodel USERS {\n  user_id        Int      @id @default(autoincrement())\n  first_name     String   @db.VarChar(50)\n  middle_name    String?  @db.VarChar(50)\n  last_name      String   @db.VarChar(50)\n  national_id    String   @unique @db.VarChar(20)\n  personal_email String   @unique @db.VarChar(100)\n  password_hash  String   @db.VarChar(255)\n  gender         String?  @db.VarChar(10)\n  city_id        Int?\n  street_address String?\n  created_at     DateTime @default(now())\n\n  city          CITIES?         @relation(fields: [city_id], references: [city_id])\n  phones        USER_PHONES[]\n  student       STUDENT?\n  advisor       ADVISOR?\n  admin         ADMIN?\n  notifications NOTIFICATIONS[]\n}\n\nmodel USER_PHONES {\n  phone_id     Int    @id @default(autoincrement())\n  user_id      Int\n  phone_number String @db.VarChar(20)\n\n  user USERS @relation(fields: [user_id], references: [user_id])\n}\n\nmodel ROLES {\n  role_id   Int    @id @default(autoincrement())\n  role_name String @unique @db.VarChar(50)\n\n  permissions ROLE_PERMISSIONS[]\n}\n\nmodel PERMISSIONS {\n  perm_id  Int    @id @default(autoincrement())\n  perm_key String @unique @db.VarChar(50)\n\n  roles ROLE_PERMISSIONS[]\n}\n\nmodel ROLE_PERMISSIONS {\n  role_id Int\n  perm_id Int\n\n  role ROLES       @relation(fields: [role_id], references: [role_id])\n  perm PERMISSIONS @relation(fields: [perm_id], references: [perm_id])\n\n  @@id([role_id, perm_id])\n}\n\nmodel STUDENT {\n  student_id         Int     @id\n  dept_id            Int?\n  major_type         String? @db.VarChar(50)\n  level              Int     @default(1)\n  cumulative_gpa     Decimal @default(0.00) @db.Decimal(3, 2)\n  total_earned_hours Int     @default(0)\n  status             String? @db.VarChar(20)\n\n  user USERS        @relation(fields: [student_id], references: [user_id])\n  dept DEPARTMENTS? @relation(fields: [dept_id], references: [dept_id])\n\n  studyPlans      STUDY_PLANS[]\n  semesterRecords SEMESTER_RECORDS[]\n  feedbacks       FEEDBACK[]\n}\n\nmodel ADVISOR {\n  advisor_id Int  @id\n  dept_id    Int?\n\n  user USERS        @relation(fields: [advisor_id], references: [user_id])\n  dept DEPARTMENTS? @relation(fields: [dept_id], references: [dept_id])\n\n  feedbacks FEEDBACK[]\n}\n\nmodel ADMIN {\n  admin_id Int @id\n\n  user USERS @relation(fields: [admin_id], references: [user_id])\n}\n\nmodel COURSES {\n  course_id              Int     @id @default(autoincrement())\n  course_code            String  @unique @db.VarChar(20)\n  course_name            String  @db.VarChar(150)\n  credits                Int\n  required_hours_to_take Int?\n  is_available           Boolean @default(true)\n\n  prerequisites COURSE_PREREQUISITES[] @relation(\"CoursePrereq\")\n  requiredFor   COURSE_PREREQUISITES[] @relation(\"PrereqCourse\")\n\n  planDetails PLAN_DETAILS[]\n}\n\nmodel COURSE_PREREQUISITES {\n  course_id        Int\n  prereq_course_id Int\n\n  course COURSES @relation(\"CoursePrereq\", fields: [course_id], references: [course_id])\n  prereq COURSES @relation(\"PrereqCourse\", fields: [prereq_course_id], references: [course_id])\n\n  @@id([course_id, prereq_course_id])\n}\n\nmodel SEMESTERS {\n  semester_id   Int       @id @default(autoincrement())\n  semester_name String?   @db.VarChar(50)\n  start_date    DateTime? @db.Date\n  end_date      DateTime? @db.Date\n\n  studyPlans      STUDY_PLANS[]\n  semesterRecords SEMESTER_RECORDS[]\n}\n\nmodel STUDY_PLANS {\n  plan_id     Int     @id @default(autoincrement())\n  student_id  Int\n  semester_id Int\n  plan_status String? @db.VarChar(20)\n\n  student  STUDENT   @relation(fields: [student_id], references: [student_id])\n  semester SEMESTERS @relation(fields: [semester_id], references: [semester_id])\n\n  details PLAN_DETAILS[]\n}\n\nmodel PLAN_DETAILS {\n  plan_id   Int\n  course_id Int\n\n  plan   STUDY_PLANS @relation(fields: [plan_id], references: [plan_id])\n  course COURSES     @relation(fields: [course_id], references: [course_id])\n\n  @@id([plan_id, course_id])\n}\n\nmodel SEMESTER_RECORDS {\n  record_id        Int      @id @default(autoincrement())\n  student_id       Int\n  semester_id      Int\n  semester_gpa     Decimal? @db.Decimal(3, 2)\n  registered_hours Int?\n\n  student  STUDENT   @relation(fields: [student_id], references: [student_id])\n  semester SEMESTERS @relation(fields: [semester_id], references: [semester_id])\n}\n\nmodel FEEDBACK {\n  feed_id    Int      @id @default(autoincrement())\n  student_id Int\n  advisor_id Int\n  message    String?\n  created_at DateTime @default(now())\n\n  student STUDENT @relation(fields: [student_id], references: [student_id])\n  advisor ADVISOR @relation(fields: [advisor_id], references: [advisor_id])\n}\n\nmodel NOTIFICATIONS {\n  notification_id Int      @id @default(autoincrement())\n  recipient_id    Int\n  title           String?  @db.VarChar(150)\n  body            String?\n  is_read         Boolean  @default(false)\n  sent_at         DateTime @default(now())\n\n  recipient USERS @relation(fields: [recipient_id], references: [user_id])\n}\n",
  "inlineSchemaHash": "e628d64d2721f57f2328dbd88560e63a592919b338b69efcc490b740bc22ab55",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"CITIES\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"city_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USERS\",\"nativeType\":null,\"relationName\":\"CITIESToUSERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DEPARTMENTS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"dept_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dept_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dept_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"students\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT\",\"nativeType\":null,\"relationName\":\"DEPARTMENTSToSTUDENT\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advisors\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ADVISOR\",\"nativeType\":null,\"relationName\":\"ADVISORToDEPARTMENTS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"USERS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"first_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"middle_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"last_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"national_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"personal_email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"100\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"255\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"10\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"street_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CITIES\",\"nativeType\":null,\"relationName\":\"CITIESToUSERS\",\"relationFromFields\":[\"city_id\"],\"relationToFields\":[\"city_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phones\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USER_PHONES\",\"nativeType\":null,\"relationName\":\"USERSToUSER_PHONES\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT\",\"nativeType\":null,\"relationName\":\"STUDENTToUSERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advisor\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ADVISOR\",\"nativeType\":null,\"relationName\":\"ADVISORToUSERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"admin\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ADMIN\",\"nativeType\":null,\"relationName\":\"ADMINToUSERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notifications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NOTIFICATIONS\",\"nativeType\":null,\"relationName\":\"NOTIFICATIONSToUSERS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"USER_PHONES\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"phone_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USERS\",\"nativeType\":null,\"relationName\":\"USERSToUSER_PHONES\",\"relationFromFields\":[\"user_id\"],\"relationToFields\":[\"user_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ROLES\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"role_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permissions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROLE_PERMISSIONS\",\"nativeType\":null,\"relationName\":\"ROLESToROLE_PERMISSIONS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PERMISSIONS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"perm_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"perm_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROLE_PERMISSIONS\",\"nativeType\":null,\"relationName\":\"PERMISSIONSToROLE_PERMISSIONS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ROLE_PERMISSIONS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"role_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"perm_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ROLES\",\"nativeType\":null,\"relationName\":\"ROLESToROLE_PERMISSIONS\",\"relationFromFields\":[\"role_id\"],\"relationToFields\":[\"role_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"perm\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PERMISSIONS\",\"nativeType\":null,\"relationName\":\"PERMISSIONSToROLE_PERMISSIONS\",\"relationFromFields\":[\"perm_id\"],\"relationToFields\":[\"perm_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"role_id\",\"perm_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"STUDENT\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dept_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"major_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"level\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":1,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cumulative_gpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"3\",\"2\"]],\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total_earned_hours\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USERS\",\"nativeType\":null,\"relationName\":\"STUDENTToUSERS\",\"relationFromFields\":[\"student_id\"],\"relationToFields\":[\"user_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dept\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DEPARTMENTS\",\"nativeType\":null,\"relationName\":\"DEPARTMENTSToSTUDENT\",\"relationFromFields\":[\"dept_id\"],\"relationToFields\":[\"dept_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studyPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDY_PLANS\",\"nativeType\":null,\"relationName\":\"STUDENTToSTUDY_PLANS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semesterRecords\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SEMESTER_RECORDS\",\"nativeType\":null,\"relationName\":\"SEMESTER_RECORDSToSTUDENT\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feedbacks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FEEDBACK\",\"nativeType\":null,\"relationName\":\"FEEDBACKToSTUDENT\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ADVISOR\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"advisor_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dept_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USERS\",\"nativeType\":null,\"relationName\":\"ADVISORToUSERS\",\"relationFromFields\":[\"advisor_id\"],\"relationToFields\":[\"user_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dept\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DEPARTMENTS\",\"nativeType\":null,\"relationName\":\"ADVISORToDEPARTMENTS\",\"relationFromFields\":[\"dept_id\"],\"relationToFields\":[\"dept_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feedbacks\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FEEDBACK\",\"nativeType\":null,\"relationName\":\"ADVISORToFEEDBACK\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ADMIN\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"admin_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USERS\",\"nativeType\":null,\"relationName\":\"ADMINToUSERS\",\"relationFromFields\":[\"admin_id\"],\"relationToFields\":[\"user_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSES\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credits\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"required_hours_to_take\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_available\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prerequisites\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_PREREQUISITES\",\"nativeType\":null,\"relationName\":\"CoursePrereq\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requiredFor\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSE_PREREQUISITES\",\"nativeType\":null,\"relationName\":\"PrereqCourse\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"planDetails\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PLAN_DETAILS\",\"nativeType\":null,\"relationName\":\"COURSESToPLAN_DETAILS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"COURSE_PREREQUISITES\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prereq_course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"nativeType\":null,\"relationName\":\"CoursePrereq\",\"relationFromFields\":[\"course_id\"],\"relationToFields\":[\"course_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"prereq\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"nativeType\":null,\"relationName\":\"PrereqCourse\",\"relationFromFields\":[\"prereq_course_id\"],\"relationToFields\":[\"course_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"course_id\",\"prereq_course_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SEMESTERS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"semester_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"50\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"start_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"end_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Date\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"studyPlans\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDY_PLANS\",\"nativeType\":null,\"relationName\":\"SEMESTERSToSTUDY_PLANS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semesterRecords\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SEMESTER_RECORDS\",\"nativeType\":null,\"relationName\":\"SEMESTERSToSEMESTER_RECORDS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"STUDY_PLANS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plan_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"20\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT\",\"nativeType\":null,\"relationName\":\"STUDENTToSTUDY_PLANS\",\"relationFromFields\":[\"student_id\"],\"relationToFields\":[\"student_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SEMESTERS\",\"nativeType\":null,\"relationName\":\"SEMESTERSToSTUDY_PLANS\",\"relationFromFields\":[\"semester_id\"],\"relationToFields\":[\"semester_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PLAN_DETAILS\",\"nativeType\":null,\"relationName\":\"PLAN_DETAILSToSTUDY_PLANS\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PLAN_DETAILS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plan\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDY_PLANS\",\"nativeType\":null,\"relationName\":\"PLAN_DETAILSToSTUDY_PLANS\",\"relationFromFields\":[\"plan_id\"],\"relationToFields\":[\"plan_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"course\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"COURSES\",\"nativeType\":null,\"relationName\":\"COURSESToPLAN_DETAILS\",\"relationFromFields\":[\"course_id\"],\"relationToFields\":[\"course_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"plan_id\",\"course_id\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SEMESTER_RECORDS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"record_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester_gpa\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"nativeType\":[\"Decimal\",[\"3\",\"2\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"registered_hours\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT\",\"nativeType\":null,\"relationName\":\"SEMESTER_RECORDSToSTUDENT\",\"relationFromFields\":[\"student_id\"],\"relationToFields\":[\"student_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"semester\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SEMESTERS\",\"nativeType\":null,\"relationName\":\"SEMESTERSToSEMESTER_RECORDS\",\"relationFromFields\":[\"semester_id\"],\"relationToFields\":[\"semester_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FEEDBACK\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"feed_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advisor_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"student\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"STUDENT\",\"nativeType\":null,\"relationName\":\"FEEDBACKToSTUDENT\",\"relationFromFields\":[\"student_id\"],\"relationToFields\":[\"student_id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"advisor\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ADVISOR\",\"nativeType\":null,\"relationName\":\"ADVISORToFEEDBACK\",\"relationFromFields\":[\"advisor_id\"],\"relationToFields\":[\"advisor_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"NOTIFICATIONS\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"notification_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recipient_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"VarChar\",[\"150\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_read\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sent_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recipient\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"USERS\",\"nativeType\":null,\"relationName\":\"NOTIFICATIONSToUSERS\",\"relationFromFields\":[\"recipient_id\"],\"relationToFields\":[\"user_id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

