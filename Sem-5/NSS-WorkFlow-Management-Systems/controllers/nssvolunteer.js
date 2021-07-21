const {People,
    Faculty,
    Student,
    Nssvolunteer,
    Farmhead,
    Socialhead,
    Splvolunteer} = require('../models/people');

 const { Farmwork, Socialwork } = require('../models/group');

 const { StudentFarmwork, StudentSocialwork} = require('../models/junctiontables');

 exports.getEditProfile = (req, res, next) => {
    if(req.session.role!="Nssvolunteer"){
        return res.redirect('/person');
    }
    const user = req.user;
    nssvolunteer = {
        'FirstName' : user.dataValues['FirstName'],
        'MiddleName' : user.dataValues['MiddleName'],
        'LastName' : user.dataValues['LastName'],
        'Email' : user.dataValues['Email'],
        'Phone' : user.dataValues['Phone'],
    }
    res.render('nssvolunteerEditProfile', {nssvolunteer: nssvolunteer});
}

exports.postEditProfile = async (req, res, next) => {
    if(req.session.role!="Nssvolunteer"){
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

    nssvolunteer = await People.findByPk(id);

    if(newPassword != confirmNewPassword || oldPassword != nssvolunteer.Password)
        res.redirect('/nssvolunteer/editProfile');
    else { 
        nssvolunteer.FirstName = (firstName == '' ? nssvolunteer.FirstName : firstName);
        nssvolunteer.MiddleName = (middleName == '' ? null : middleName);
        nssvolunteer.LastName = (lastName == '' ? nssvolunteer.lastName : lastName);
        nssvolunteer.Email = (email == '' ? null : email);
        nssvolunteer.Phone = (phone == '' ? null : phone);
        nssvolunteer.Password = (newPassword == '' ? nssvolunteer.Password : newPassword);

        await nssvolunteer.save();
        res.redirect('/nssvolunteer');
    }
} 

exports.getPastActivities = async(req, res, next) => {
    if(req.session.role!='Nssvolunteer'){
        return res.redirect('/person');
    }

    const person = req.user;
    const nssvolunteer = await Nssvolunteer.findOne({
        where : {
            personId: person.id
        }
    });

    const getFarmlist = async (farmworks) => {
        return Promise.all(
            farmworks.map(async (farmwork) => {
            let farmworkData = {}
            const activity = await farmwork.getActivity();
            const group = await activity.getGroup();

            farmworkData["id"]=farmwork.id;
            farmworkData["hours"] = activity.Hours;
            farmworkData["date"] = activity.Date;
            farmworkData["location"]=activity.Location;
            farmworkData["status"]=group.status;

            return farmworkData;
            }));
    }

    const takenfarmworks = await Farmwork.findAll({where:{nssvolunteerId : nssvolunteer.id}})
    const takenfarmworklist = await getFarmlist(takenfarmworks);
    const approvedfarmworklist = takenfarmworklist.filter((takenfarmwork) => takenfarmwork.status === "Approved");

    const getSociallist = async (socialworks) => {
        return Promise.all(
            socialworks.map(async (socialwork) => {
            let socialworkData = {}
            const activity = await socialwork.getActivity();
            const group = await activity.getGroup();

            socialworkData["id"]=socialwork.id;
            socialworkData["hours"] = activity.Hours;
            socialworkData["date"] = activity.Date;
            socialworkData["location"]=activity.Location;
            socialworkData["status"]=group.status;

            return socialworkData;
            }));
    }

    const takensocialworks = await Socialwork.findAll({where:{nssvolunteerId : nssvolunteer.id}})
    const takensocialworklist = await getSociallist(takensocialworks);
    const approvedsocialworklist = takensocialworklist.filter((takensocialwork) => takensocialwork.status === "Approved");

    res.render('nssvolunteerPastActivities', {
        approvedfarmworklist : approvedfarmworklist,
        approvedsocialworklist : approvedsocialworklist,
    });
}

exports.getNssvolunteer = async (req,res,next)=>{
    if(req.session.role!='Nssvolunteer'){
        return res.redirect('/');
    }
    const person = req.user;
    const role = req.session.role;
    const nssvolunteer = await Nssvolunteer.findOne({where:{personId: person.id}});

    const getFarmlist = async (farmworks)=>{
        return Promise.all(
         farmworks.map(async (farmwork)=>{
             let farmworkData = {}
             const activity = await farmwork.getActivity();
             const group = await activity.getGroup();
     
             farmworkData["id"]=farmwork.id;
             farmworkData["hours"] = activity.Hours;
             farmworkData["date"] = activity.Date;
             farmworkData["location"]=activity.Location;
             farmworkData["status"]=group.status;
     
             return farmworkData;
         })
        )
     }

    const openfarmworks =  await Farmwork.findAll({where:{nssvolunteerId:null}});
    const openfarmworklist = await getFarmlist(openfarmworks);

    const takenfarmworks = await Farmwork.findAll({where:{nssvolunteerId: nssvolunteer.id}})
    const takenfarmworklist = await getFarmlist(takenfarmworks);

    const allocatedfarmworklist = takenfarmworklist.filter((takenfarmwork)=>takenfarmwork.status==="Allocated");
    const submitedfarmworklist = takenfarmworklist.filter((takenfarmwork)=>takenfarmwork.status==="Submitted for approval");
    const approvedfarmworklist = takenfarmworklist.filter((takenfarmwork)=>takenfarmwork.status==="Approved");
    const disapprovedfarmworklist = takenfarmworklist.filter((takenfarmwork)=>takenfarmwork.status==="Disapproved");

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

    const opensocialworks =  await Socialwork.findAll({where:{nssvolunteerId:null}});
    const opensocialworklist = await getSociallist(opensocialworks);

    const takensocialworks = await Socialwork.findAll({where:{nssvolunteerId: nssvolunteer.id}})
    const takensocialworklist = await getSociallist(takensocialworks);

    const allocatedsocialworklist = takensocialworklist.filter((takensocialwork)=>takensocialwork.status==="Allocated");
    const submitedsocialworklist = takensocialworklist.filter((takensocialwork)=>takensocialwork.status==="Submitted for approval");
    const approvedsocialworklist = takensocialworklist.filter((takensocialwork)=>takensocialwork.status==="Approved");
    const disapprovedsocialworklist = takensocialworklist.filter((takensocialwork)=>takensocialwork.status==="Disapproved");

    people = {
        'ID' : person.dataValues['id'],
        'Name': person.dataValues['FirstName'] + ' ' + (person.dataValues['MiddleName'] == 'null' ? person.dataValues['MiddleName'] : '') + ' ' + person.dataValues['LastName'],
        'Email' : person.dataValues['Email'],
        'Phone' : person.dataValues['Phone'],
        'Department' :  person.dataValues['Department'],
    }
    res.render('nssvolunteer',{
        people: people,
        openfarmworklist: openfarmworklist,
        allocatedfarmworklist: allocatedfarmworklist,
        submitedfarmworklist: submitedfarmworklist,
        approvedfarmworklist:approvedfarmworklist,
        disapprovedfarmworklist:disapprovedfarmworklist,
        opensocialworklist: opensocialworklist,
        allocatedsocialworklist: allocatedsocialworklist,
        submitedsocialworklist: submitedsocialworklist,
        approvedsocialworklist:approvedsocialworklist,
        disapprovedsocialworklist:disapprovedsocialworklist
    })

}

exports.postTakefarmwork = async (req,res,next)=>{
    const person = req.user;
    const nssvolunteer = await Nssvolunteer.findOne({where:{personId: person.id}});
    const openfarmworkId = req.body.openfarmworkId;
    await nssvolunteer.addFarmwork(openfarmworkId);
    res.redirect('/nssvolunteer');
}

exports.postTakesocialwork = async (req,res,next)=>{
    const person = req.user;
    const nssvolunteer = await Nssvolunteer.findOne({where:{personId: person.id}});
    const opensocialworkId = req.body.opensocialworkId;
    await nssvolunteer.addSocialwork(opensocialworkId);
    res.redirect('/nssvolunteer');
}

exports.getGiveFarmproof = async (req,res,next)=>{
    const person = req.user;
    const nssvolunteer =  await Nssvolunteer.findOne({where:{personId: person.id}});
    const farmworkId = req.params.takenfarmId;
    const editmode = req.query.edit;
    const disapprovemode = req.query.disapprove;
    const seemode = req.query.see;
    const getStudentlist = async (students,farmworkId)=>{
        return Promise.all(
         students.map(async (student)=>{
             let studentData = {}
             const person = await student.getPerson();
             const studentfarmworkInstance = await StudentFarmwork.findOne({where:{
                studentId: student.id,
                farmworkId: farmworkId
            }});

            const attendence = studentfarmworkInstance.attendence;
             
            studentData["id"]=student.id;
            studentData["firstname"]=person.FirstName;
            studentData["lastname"]=person.LastName;
            studentData["attendence"] = attendence;

             return studentData;
         })
        )
     }

    const farmwork = await Farmwork.findByPk(farmworkId);
    const activity = await farmwork.getActivity();
    const group = await activity.getGroup();
    const farmworkObj = {
        id: farmwork.id,
        hours: activity.Hours,
        date: activity.Date,
        location: activity.Location,
        status: group.status,
        proof: farmwork.Proof,
        feedback: farmwork.Feedback
    }

    const students = await farmwork.getStudents();
    const studentList = await getStudentlist(students,farmworkId);

    console.log(students);
    console.log(studentList);
    console.log("Students registered in this farm work");

    res.render('farmproof',{
        farmwork: farmworkObj,
        studentList: studentList,
        editmode: editmode,
        disapprovemode: disapprovemode,
        seemode: seemode
    })
}

exports.getGiveSocialproof = async (req,res,next)=>{
    const person = req.user;
    const nssvolunteer =  await Nssvolunteer.findOne({where:{personId: person.id}});
    const socialworkId = req.params.takensocialId;
    const editmode = req.query.edit;
    const disapprovemode = req.query.disapprove;
    const seemode = req.query.see;
    const getStudentlist = async (students,socialworkId)=>{
        return Promise.all(
         students.map(async (student)=>{
             let studentData = {}
             const person = await student.getPerson();
             const studentsocialworkInstance = await StudentSocialwork.findOne({where:{
                studentId: student.id,
                socialworkId: socialworkId
            }});

            const attendence = studentsocialworkInstance.attendence;
             
            studentData["id"]=student.id;
            studentData["firstname"]=person.FirstName;
            studentData["lastname"]=person.LastName;
            studentData["attendence"] = attendence;

             return studentData;
         })
        )
     }

    const socialwork = await Socialwork.findByPk(socialworkId);
    const activity = await socialwork.getActivity();
    const group = await activity.getGroup();
    const socialworkObj = {
        id: socialwork.id,
        hours: activity.Hours,
        date: activity.Date,
        location: activity.Location,
        status: group.status,
        proof: socialwork.Proof,
        feedback: socialwork.Feedback
    }

    const students = await socialwork.getStudents();
    const studentList = await getStudentlist(students,socialworkId);

    console.log(students);
    console.log(studentList);
    console.log("Students registered in this social work");

    res.render('socialproof',{
        socialwork: socialworkObj,
        studentList: studentList,
        editmode: editmode,
        disapprovemode: disapprovemode,
        seemode: seemode
    })

}

exports.postFarmproof = async (req,res,next)=>{
    console.log("Here i am!!");
    const farmworkId = req.body.farmworkId;
    const proof = req.body.proof;
    const farmwork = await Farmwork.findByPk(farmworkId);
    const students = await farmwork.getStudents();
    const activity = await farmwork.getActivity();
    const group = await activity.getGroup();

    const updateAttendence = async (students,farmworkId,req)=>{
        console.log(students);
      return Promise.all(students.map(async (student)=>{
        let bool=false;
        if(req.body[student.id]=="true"){
            bool=true;
        }
        if(bool) {
            await StudentFarmwork.update({attendence: true},{
                where:{studentId: student.id,
                    farmworkId: farmworkId
                }
            })
        }
        else {
            await StudentFarmwork.update({attendence: false},{
                where:{studentId: student.id,
                    farmworkId: farmworkId
                }
            })
        }
       
    }))  
    }

    await updateAttendence(students,farmworkId,req);

    await group.update({status: "Submitted for approval"});

    await farmwork.update({Proof: proof })

    res.redirect('/nssvolunteer');
}

exports.postSocialproof = async (req,res,next)=>{
    console.log("Here i am!!");
    const socialworkId = req.body.socialworkId;
    const proof = req.body.proof;
    const socialwork = await Socialwork.findByPk(socialworkId);
    const students = await socialwork.getStudents();
    const activity = await socialwork.getActivity();
    const group = await activity.getGroup();

    const updateAttendence = async (students,socialworkId,req)=>{
        console.log(students);
      return Promise.all(students.map(async (student)=>{
        let bool=false;
        if(req.body[student.id]=="true"){
            bool=true;
        }
        if(bool) {
            await StudentSocialwork.update({attendence: true},{
                where:{studentId: student.id,
                    socialworkId: socialworkId
                }
            })
        }
        else {
            await StudentSocialwork.update({attendence: false},{
                where:{studentId: student.id,
                    socialworkId: socialworkId
                }
            })
        }
       
    }))  
    }

    await updateAttendence(students,socialworkId,req);

    await group.update({status: "Submitted for approval"});

    await socialwork.update({Proof: proof })

    res.redirect('/nssvolunteer');
}