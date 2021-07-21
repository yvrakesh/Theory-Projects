const {People,
    Faculty,
    Student,
    Nssvolunteer,
    Farmhead,
    Socialhead,
    Splvolunteer} = require('../models/people');

const Admin = require("../models/admin");

Student.Person = Student.belongsTo(People);
Farmhead.Person = Farmhead.belongsTo(People);
Nssvolunteer.Person=Nssvolunteer.belongsTo(People);

exports.getEditProfile = (req, res, next) => {
    if(req.session.role!="Faculty"){
        return res.redirect('/person');
    }
    const user = req.user;
    faculty = {
        'FirstName' : user.dataValues['FirstName'],
        'MiddleName' : user.dataValues['MiddleName'],
        'LastName' : user.dataValues['LastName'],
        'Email' : user.dataValues['Email'],
        'Phone' : user.dataValues['Phone'],
    }
    res.render('facultyEditProfile', {faculty: faculty});
}

exports.postEditProfile = async (req, res, next) => {
    if(req.session.role!="Faculty"){
        return res.redirect('/person');
    }
    
    
    id = req.user.id;
    firstName = req.body.FirstName;
    middleName = req.body.MiddleName;
    lastName = req.body.LastName;
    email = req.body.Email;
    phone = req.body.Phone;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;
    confirmNewPassword = req.body.confirmNewPassword;

    faculty = await People.findByPk(id);

    if(newPassword != confirmNewPassword || oldPassword != faculty.Password)
        res.redirect('/faculty/editProfile');
    else { 
        faculty.FirstName = (firstName == '' ? faculty.FirstName : firstName);
        faculty.MiddleName = (middleName == '' ? null : middleName);
        faculty.LastName = (lastName == '' ? faculty.lastName : lastName);
        faculty.Email = (email == '' ? null : email);
        faculty.Phone = (phone == '' ? null : phone);
        faculty.Password = (newPassword == '' ? faculty.Password : newPassword);

        await faculty.save();
        res.redirect('/faculty');
    }
}

exports.getFaculty = async (req,res,next)=>{
    if(req.session.role!="Faculty"){
        return res.redirect('/person');
    }
    const person = req.user;

    people = {
        'ID' : person.dataValues['id'],
        'Name': person.dataValues['FirstName'] + ' ' + (person.dataValues['MiddleName'] == 'null' ? person.dataValues['MiddleName'] : '') + ' ' + person.dataValues['LastName'],
        'Email' : person.dataValues['Email'],
        'Phone' : person.dataValues['Phone'],
        'Department' :  person.dataValues['Department'],
    }

    const getStudentlist = async (students) => {
        return Promise.all(
            students.map(async(student) => {
                let studentData = {};

                const details = await student.getPerson();

                studentData['ID'] = student.id;
                studentData['Name'] = details['FirstName'] + ' ' + (details['MiddleName'] == null ? '' : details['MiddleName'] + ' ') + details['LastName'];
                studentData['Email'] = details['Email'];
                studentData['Phone'] = details['Phone'];
                studentData['Department'] = details['Department'];
                studentData['Grades'] = student.Grades
                
                return studentData;
            })
        )
    }

    openStudents = await Student.findAll({where: {'facultyId': null}});
    openStudentslist = await getStudentlist(openStudents);

    faculty = await Faculty.findOne({where : {'personId': people['ID']}});

    takenStudents = await Student.findAll({where: {'facultyId' : faculty['id']}})
    takenStudentlist = await getStudentlist(takenStudents);

    console.log("******** start");
    console.log("********* end");

    res.render('faculty',{
        people : people,
        openStudents : openStudentslist,
        takenStudents : takenStudentlist
    });
}

exports.postTakeStudent = async (req, res, next) => {
    const person = req.user;

    const faculty = await Faculty.findOne({where:{personId: person.id}});
    const openstudentId = req.body.openstudentId;
    await faculty.addStudent(openstudentId);

    res.redirect('/faculty');
}

exports.getGiveGrades = async (req, res, next) => {
    const person = req.user;

    const faculty = await Faculty.findOne({where:{'personId': person.id}});
    const studentID = req.params.studentId;

    const student = await Student.findByPk(studentID);
    const details = await student.getPerson();

    const people = {
        'ID' : studentID,
        'Name' : details['FirstName'] + ' ' + (details['MiddleName'] == null ? '' : details['MiddleName'] + ' ') + details['LastName'],
        'Email' : details['Email'],
        'Phone' : details['Phone'],
        'Department' : details['Department'],
        'Farm Hours' : student.FarmWorkHours,
        'Social Hours' : student.SocialWorkHours,
        'Special Project Hours' : student.SplProjectHours,
        'Grades' : student.Grades
    }

    res.render('grades',{
        student: people,
    })
}

exports.postGiveGrades = async (req, res, next) => {
    const person = req.user;

    const faculty = await Faculty.findOne({where:{'personId': person.id}});
    const studentID = req.params.studentId;

    const student = await Student.findByPk(studentID);

    const grade = req.body.grade;
    console.log(grade);

    await student.update({'Grades' : grade});
    res.redirect('/faculty');
}