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
const { StudentFarmwork } = require('../models/junctiontables');

exports.getEditProfile = (req, res, next) => {
    if(req.session.role!="Splvolunteer"){
        return res.redirect('/person');
    }
    const user = req.user;
    splvolunteer = {
        'FirstName' : user.dataValues['FirstName'],
        'MiddleName' : user.dataValues['MiddleName'],
        'LastName' : user.dataValues['LastName'],
        'Email' : user.dataValues['Email'],
        'Phone' : user.dataValues['Phone'],
    }
    res.render('splprojectvolunteerEditProfile', {splprojectvolunteer: splvolunteer});
}

exports.postEditProfile = async (req, res, next) => {
    if(req.session.role!="Splvolunteer"){
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

    splvolunteer = await People.findByPk(id);

    if(newPassword != confirmNewPassword || oldPassword != splvolunteer.Password)
        res.redirect('/splprojectvolunteer/editProfile');
    else { 
        splvolunteer.FirstName = (firstName == '' ? splvolunteer.FirstName : firstName);
        splvolunteer.MiddleName = (middleName == '' ? null : middleName);
        splvolunteer.LastName = (lastName == '' ? splvolunteer.lastName : lastName);
        splvolunteer.Email = (email == '' ? null : email);
        splvolunteer.Phone = (phone == '' ? null : phone);
        splvolunteer.Password = (newPassword == '' ? splvolunteer.Password : newPassword);

        await splvolunteer.save();
        res.redirect('/splprojectvolunteer');
    }
}

const getSplprojectgrplist = async (splprojectgrps)=>{
    return Promise.all(
        splprojectgrps.map(async (splprojectgrp)=>{
            let splprojectgrpData = {}
            const group = await splprojectgrp.getGroup();

            splprojectgrpData["splprojectgrpId"] = splprojectgrp.id;
            splprojectgrpData["status"] = group.status;
            splprojectgrpData["projectname"] = splprojectgrp.projectName;
            splprojectgrpData["sampledescription"] = splprojectgrp.SampleDescription;
            splprojectgrpData["fulldescription"] = splprojectgrp.FullDescription;
            splprojectgrpData["feedback"] = splprojectgrp.Feedback;
            splprojectgrpData["samplefeedback"]=splprojectgrp.Samplefeedback;

            return splprojectgrpData;
        })
    );
}

const getSamplestagegrps = async (splprojectgrps)=>{
    return Promise.all(
        splprojectgrps.map(async (splprojectgrp)=>{
            const group = await splprojectgrp.getGroup();

            if(group.status=="submittedSample"){
                return splprojectgrp;
            }
            return null;
        })
    );
}

const getFullstagegrps = async (splprojectgrps)=>{
    return Promise.all(
        splprojectgrps.map(async (splprojectgrp)=>{
            const group = await splprojectgrp.getGroup();

            if(group.status=="submittedFull"){
                return splprojectgrp;
            }
            return null;
        })
    );
}

exports.getSplprojectvolunteer = async (req,res,next)=>{
    const person = req.user;
    const splprojectvolunteer = await Splvolunteer.findOne({where:{personId: person.id}});
    const role = req.session.role;
    

    const opensplprojectgrps = await Splprojectgrp.findAll({where: {splvolunteerId: null}});
    const opensplprojectgrpslist = await getSplprojectgrplist(opensplprojectgrps);

    const takensplprojectgrps = await Splprojectgrp.findAll({where: {splvolunteerId: splprojectvolunteer.id }});

    const takensamplestagegrps = await getSamplestagegrps(takensplprojectgrps);
    const filteredsamplestagegrps = takensamplestagegrps.filter((splprojectgrp)=>splprojectgrp!=null);
    const takensamplegrpslist = await getSplprojectgrplist(filteredsamplestagegrps);

    const takenfullstagegrps = await getFullstagegrps(takensplprojectgrps);
    const  filteredfullstagegrps = takenfullstagegrps.filter((splprojectgrp)=>splprojectgrp!=null);
    const takenfullgrpslist = await getSplprojectgrplist(filteredfullstagegrps);

    people = {
        'ID' : person.dataValues['id'],
        'Name': person.dataValues['FirstName'] + ' ' + (person.dataValues['MiddleName'] == 'null' ? person.dataValues['MiddleName'] : '') + ' ' + person.dataValues['LastName'],
        'Email' : person.dataValues['Email'],
        'Phone' : person.dataValues['Phone'],
        'Department' :  person.dataValues['Department'],
    }

    res.render('splprojectvolunteer',{
        // name: person.FirstName,
        people: people,
        splvolunteerId: splprojectvolunteer.id,
        opensplprojectgrpslist: opensplprojectgrpslist,
        takensamplegrpslist: takensamplegrpslist,
        takenfullgrpslist: takenfullgrpslist,
        // role: role
    })

}

exports.postTakesplprojectgrp = async (req,res,next)=>{
    const person = req.user;
    const splprojectvolunteer = await Splvolunteer.findOne({where:{personId: person.id}});

    const splprojectgrpId = req.body.splprojectgrpId;


    console.log("HERE--------------------");
    console.log(splprojectgrpId);
    console.log(splprojectvolunteer);
    console.log("---------------------");

    await splprojectvolunteer.addSplprojectgrp(splprojectgrpId);

    res.redirect('/splprojectvolunteer');
}

exports.getApprovesplprojectgrp = async (req,res,next)=>{
    const splprojectgrpId  = req.params.splprojectgrpId;
    const sample = req.query.sample;

    const person = req.user;
    const splprojectvolunteer = await Splvolunteer.findOne({where:{personId: person.id}});

    const splprojectgrp = await Splprojectgrp.findByPk(splprojectgrpId);
    let splprojectgrpData = {}
    const group = await splprojectgrp.getGroup();

    splprojectgrpData["splprojectgrpId"] = splprojectgrp.id;
    splprojectgrpData["status"] = group.status;
    splprojectgrpData["projectname"] = splprojectgrp.projectName;
    splprojectgrpData["sampledescription"] = splprojectgrp.SampleDescription;
    splprojectgrpData["fulldescription"] = splprojectgrp.FullDescription;
    splprojectgrpData["feedback"] = splprojectgrp.Feedback;
    splprojectgrpData["samplefeedback"]=splprojectgrp.Samplefeedback;

    res.render('approvesplproject',{
        name: person.FirstName,
        splprojectvolunteerId: splprojectvolunteer.id,
        sample: sample,
        splprojectgrpData: splprojectgrpData,
    })
}

exports.postApprovesplprojectgrp = async (req,res,next)=>{
    const splprojectgrpId = req.body.splprojectgrpId;
    const splprojectgrp = await Splprojectgrp.findByPk(splprojectgrpId);
    const group = await splprojectgrp.getGroup();
    const students = await splprojectgrp.getStudents();

    const sample = req.query.sample;

    const approvalStatus = req.body.approvalStatus;

    const giveAttendence = async (students,hour)=>{
        return Promise.all(
            students.map(async (student)=>{
                const splprojecthours = student.SplProjectHours;
                const updatedsplprojecthours = splprojecthours+hour;

                await student.update({SplProjectHours: updatedsplprojecthours});

            })
        );
    }

    if(sample){
        const samplefeedback = req.body.samplefeedback;

        if(approvalStatus=="disapprove"){
            await splprojectgrp.update({Samplefeedback: samplefeedback});
            await group.update({status: "sampleRejected"});
        }else{
            await splprojectgrp.update({Samplefeedback: samplefeedback});
            await group.update({status: "sampleAccepted"});
            await giveAttendence(students,5);
        }
    }else{
        const feedback = req.body.feedback;

        if(approvalStatus=="disapprove"){
            await splprojectgrp.update({Feedback: feedback});
            await group.update({status: "fullRejected"});
        } else {
            await splprojectgrp.update({Feedback: feedback});
            await group.update({status: "approved"});
            await giveAttendence(students,10);
        }
    }

    res.redirect('/splprojectvolunteer');
}
