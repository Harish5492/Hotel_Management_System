[1mdiff --git a/src/common/database/entities/treatment.entity.ts b/src/common/database/entities/treatment.entity.ts[m
[1mindex a411e15..6dc6cbf 100644[m
[1m--- a/src/common/database/entities/treatment.entity.ts[m
[1m+++ b/src/common/database/entities/treatment.entity.ts[m
[36m@@ -18,7 +18,7 @@[m [mexport class Treatment extends Model<Treatment> {[m
   })[m
   userId: string;[m
 [m
[31m-  @BelongsTo(() => User, 'userId')[m
[32m+[m[32m  @BelongsTo(() => User, 'id')[m
   user: User;[m
 [m
   @ForeignKey(() => User) // Refer to the User model for doctor[m
[36m@@ -41,7 +41,10 @@[m [mexport class Treatment extends Model<Treatment> {[m
   @BelongsTo(() => Tests)[m
   test: Tests;[m
 [m
[31m-  @Column[m
[32m+[m[32m  @Column({[m
[32m+[m[32m    type: DataType.STRING,[m
[32m+[m[32m    allowNull: false,[m
[32m+[m[32m  })[m
   disease: string;[m
 [m
   @Column({[m
[1mdiff --git a/src/modules/medicalTests/tests.service.ts b/src/modules/medicalTests/tests.service.ts[m
[1mindex 582418d..549b66c 100644[m
[1m--- a/src/modules/medicalTests/tests.service.ts[m
[1m+++ b/src/modules/medicalTests/tests.service.ts[m
[36m@@ -25,7 +25,6 @@[m [mexport default class TestService {[m
   }[m
 [m
   async IsTestExists(LabName: string, TestName: string) {[m
[31m-    console.log(LabName, TestName);[m
     const test = await this.testRepository.findOne({[m
       where: { LabName, TestName },[m
       attributes: ['TestName', 'LabName', 'Cost'],[m
[36m@@ -91,13 +90,11 @@[m [mexport default class TestService {[m
     filters: testDto.IGetFilterDto,[m
   ): Promise<{ list: Array<Tests>; countNumber: number }> {[m
     const { page, limit } = params;[m
[31m-    console.log("yo babay params are chko",page, limit);[m
     const { patientId, LabName, TestName } = filters;[m
     const where: WhereOptions<Tests> = {};[m
     if (patientId) where.patientId = patientId;[m
     if (LabName) where.LabName = LabName;[m
     if (TestName) where.TestName = TestName;[m
[31m-    console.log(filters, '=========>', params);[m
     const { count, rows: tests } = await this.testRepository.findAndCountAll({[m
       where,[m
       limit: limit,[m
