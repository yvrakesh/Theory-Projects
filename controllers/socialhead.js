const {People,
    Faculty,
    Student,
    Nssvolunteer,
    Farmhead,
    Socialhead,
    Splvolunteer} = require('../models/people');
const { Group,
    Activity,
    Farmwork,
    Socialwork,
    Splprojectgrp
} = require('../models/group');

const {StudentSocialwork} = require('../models/junctiontables');

Socialhead.Socialworks = Socialhead.hasMany(Socialwork);

Socialwork.Activity = Socialwork.belongsTo(Activity);
Activity.Group=Activity.belongsTo(Group);



const getStudentlist = async (students)=>{
    return Promise.all(
     students.map(async (student)=>{
         let studentData = {}
         const person = await student.getPerson();
         
        studentData["id"]=student.id;
        studentData["firstname"]=person.FirstName;
        studentData["lastname"]=person.LastName;

         return studentData;
     })
    )
 }

 const getPresentStudents = async (students,submittedsocialId) =>{
    return Promise.all(
        students.map(async (student)=>{
            const studentsocialworkInstance = await StudentSocialwork.findOne({where:{
                studentId: student.id,
                socialworkId: submittedsocialId
            }});

            const attendence = studentsocialworkInstance.attendence;
            if(attendence){
                return student;
            }else{
                return null;
            }
        })
       )
 }

 const giveAttendence = async (students,socialHour)=>{
    return Promise.all(
        students.map(async (student)=>{
            const socialworkHour = student.SocialWorkHours;
            const updatedsocialworkHour = socialworkHour+socialHour;

            await student.update({SocialWorkHours: updatedsocialworkHour })
        })
       )
 }

 exports.getEditProfile = (req, res, next) => {
    if(req.session.role!="Socialhead"){
        return res.redirect('/person');
    }
    const user = req.user;
    socialhead = {
        'FirstName' : user.dataValues['FirstName'],
        'MiddleName' : user.dataValues['MiddleName'],
        'LastName' : user.dataValues['LastName'],
        'Email' : user.dataValues['Email'],
        'Phone' : user.dataValues['Phone'],
    }
    res.render('socialheadEditProfile', {socialhead: socialhead});
}

exports.postEditProfile = async (req, res, next) => {
    if(req.session.role!="Socialhead"){
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

    socialhead = await People.findByPk(id);

    if(newPassword != confirmNewPassword || oldPassword != socialhead.Password)
        res.redirect('/socialhead/editProfile');
    else { 
        socialhead.FirstName = (firstName == '' ? socialhead.FirstName : firstName);
        socialhead.MiddleName = (middleName == '' ? null : middleName);
        socialhead.LastName = (lastName == '' ? socialhead.lastName : lastName);
        socialhead.Email = (email == '' ? null : email);
        socialhead.Phone = (phone == '' ? null : phone);
        socialhead.Password = (newPassword == '' ? socialhead.Password : newPassword);

        await socialhead.save();
        res.redirect('/socialhead');
    }
} 

exports.getNewSocialTask = async (req, res, next) => {
    if(req.session.role!="Socialhead"){
        return res.redirect('/');
    }
    res.render('socialheadNewTask');
}

exports.getSocialhead = async (req,res,next)=>{
    if(req.session.role!="Socialhead"){
       return res.redirect('/');
    }

    const getSociallist = async (socialworks)=>{
        return Promise.all(
         socialworks.map(async (socialwork)=>{
             let socialworkData = {}
             const activity = await socialwork.getActivity();
             const group = await activity.getGroup();
     
             socialworkData["id"]=socialwork.id;
             socialworkData["hours"] = activity.Hours;
             socialworkData["date"] = activity.Date;
             socialworkData["location"]=activity.Location;
             socialworkData["status"]=group.status;
     
             return socialworkData;
         })
        )
     }

    const person = req.user;
    const socialHead  = await Socialhead.findOne({where:{personId: person.id}});
    const socialworks = await socialHead.getSocialworks();
    const socialworklist = await getSociallist(socialworks);
    const submitedsocialworklist = socialworklist.filter((socialworkData)=>socialworkData.status==="Submitted for approval");

    people = {
        'ID' : person.dataValues['id'],
        'Name': person.dataValues['FirstName'] + ' ' + (person.dataValues['MiddleName'] == 'null' ? person.dataValues['MiddleName'] : '') + ' ' + person.dataValues['LastName'],
        'Email' : person.dataValues['Email'],
        'Phone' : person.dataValues['Phone'],
        'Department' :  person.dataValues['Department'],
    }

    res.render('socialhead',{
        // name: req.user.FirstName,
        // socialHeadId: socialHead.id,
        people: people,
        pastSocialWork: socialworks.filter((socialwork) => socialwork.nssvolunteerId != null),
        submitedsocialworklist: submitedsocialworklist
    });
}

exports.postSocialwork = (req,res,next)=>{
    const status = "Allocated";
    const hours = req.body.hours;
    const date = req.body.date;
    const location = req.body.location;

    const person = req.user;
    console.log(person);
     Socialhead.findOne({where:{personId: person.id}}).then(socialhead=>{
        console.log(socialhead);
        socialhead.createSocialwork({
            activity:{
                Hours: hours,
                Date: date,
                Location: location,
                group:{
                    status: status
                }
            }
        },{
            include:[{
                association: Socialwork.Activity,
                include: [Activity.Group]
            }]
        }).then(result=>{
            console.log(result);
            res.redirect('/socialhead');
        })
        .catch(err=>{console.log(err);
            res.redirect('/');
        })
     })
     .catch(err=>{
         console.log(err);
         res.redirect('/');
     })
   
}

exports.getApprovesocialproof = async (req,res,next)=>{
    const submittedsocialId = req.params.submittedsocialId;
    const submittedsocialwork = await Socialwork.findByPk(submittedsocialId);
    const activity = await submittedsocialwork.getActivity();
    const group = await activity.getGroup();
    const nssvolunteerId = submittedsocialwork.nssvolunteerId;
    const nssvolunteer = await Nssvolunteer.findByPk(nssvolunteerId);
    const personId = nssvolunteer.personId;
    const person = await People.findByPk(personId); 
    const socialworkObj = {
        id: submittedsocialwork.id,
        hours: activity.Hours,
        date: activity.Date,
        location: activity.Location,
        status: group.status,
        proof: submittedsocialwork.Proof,
        nssvolunteerId: nssvolunteerId,
        firstname: person.FirstName
    }

    const students = await submittedsocialwork.getStudents();
    const presentStudents = await getPresentStudents(students,submittedsocialId);
    const finalpresentStudents = presentStudents.filter((student)=>student!=null);
    const studentList = await getStudentlist(finalpresentStudents);

    res.render('socialheadApprove',{
        socialwork: socialworkObj,
        studentList: studentList,
    })

}

exports.postApprovesocialproof = async (req,res,next)=>{
    const approvalStatus = req.body.approvalStatus;
    const socialworkId = req.body.socialworkId;
    const feedback = req.body.feedback;
    const socialwork = await Socialwork.findByPk(socialworkId);
    const activity = await socialwork.getActivity();
    const group = await activity.getGroup();
    if(approvalStatus!="approve"){
        await socialwork.update({Feedback: feedback});
        await group.update({status: "Disapproved" });
        return res.redirect('/socialhead');
    }
   
    const students = await socialwork.getStudents();
    const presentStudents = await getPresentStudents(students,socialworkId);
    const finalpresentStudents = presentStudents.filter((student)=>student!=null);

    await giveAttendence(finalpresentStudents,activity.Hours);
    await socialwork.update({Feedback: feedback});
    await group.update({status: "Approved" });

    res.redirect('/socialhead');
}
