# rest-api

Sample RESTful Web Service project.


sequelize model:create --name Patient --attributes enterpriseId:string,firstName:string,lastName:string,socialSecurityNumber:string
sequelize model:create --name PatientMemberRecord --attributes medicalRecordNumber:string,source:string 
sequelize model:create --name Address --attributes addressLine1:string,addressLine2:string,city:string,state:string,zipCode:string

@Data
public class Patient {

  private String enterpriseId; // global identifier
  private List<PatientMemberRecord> memberRecords;  // individual Member records
}


@Data
public class Address {

  private Long  addressId 
}

@Data
public class PatientMemberRecord {

  private String source;
  private String medicalRecordNumber;
  private String firstName;
  private String lastName;
  private String socialSecurityNumber;
  private Address address;
}