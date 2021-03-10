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

Splprojectgrp.Group= Splprojectgrp.belongsTo(Group);
const {StudentFarmwork, StudentSocialwork} = require('../models/junctiontables');

const getsplgrpmemberlist = async (splgrpmembers)=>{
    return Promise.all(splgrpmembers.map(async (splgrpmember)=>{
        let splgrpmemberData = {}
        const person = await splgrpmember.getPerson();
        splgrpmemberData["studentId"] = splgrpmember.id;
        splgrpmemberData["firstname"] = person.FirstName;
        return splgrpmemberData;

 })) 
 }

exports.getEditProfile = (req, res, next) => {
    if(req.session.role!="Student"){
        return res.redirect('/student');
    }
    const user = req.user;
    student = {
        'FirstName' : user.dataValues['FirstName'],
        'MiddleName' : user.dataValues['MiddleName'],
        'LastName' : user.dataValues['LastName'],
        'Email' : user.dataValues['Email'],
        'Phone' : user.dataValues['Phone'],
    }
    res.render('studentEditProfile', {student: student});
}

exports.postEditProfile = async (req, res, next) => {
    if(req.session.role!="Student"){
        return res.redirect('/student');
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

    student = await People.findByPk(id);

    if(newPassword != confirmNewPassword || oldPassword != student.Password)
        res.redirect('/student/editProfile');
    else { 
        student.FirstName = (firstName == '' ? student.FirstName : firstName);
        student.MiddleName = (middleName == '' ? null : middleName);
        student.LastName = (lastName == '' ? student.lastName : lastName);
        student.Email = (email == '' ? null : email);
        student.Phone = (phone == '' ? null : phone);
        student.Password = (newPassword == '' ? student.Password : newPassword);

        await student.save();
        res.redirect('/student');
    }
}

exports.getPastActivities = async(req, res, next) => {
    if(req.session.role!='Student'){
        return res.redirect('/student');
    }

    const person = req.user;
    const student = await Student.findOne({
        where : {
            personId: person.id
        }
    });

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
             farmworkData["feedback"]=farmwork.Feedback;
     
             return farmworkData;
         })
        )
     };

    const getjoinedFarmlist = async (farmlist, student) => {
        return Promise.all(farmlist.map(async (farmworkData) => {
            const isJoined = await student.hasFarmworks(farmworkData.id);
            // console.log("|||||||||||||||||||||||||");
            // console.log(isJoined,farmworkData.id);
            if(isJoined){
                return farmworkData;
            }
            return null;
        })); 
    }

    const farmworks = await Farmwork.findAll();
    const farmworklist = await getFarmlist(farmworks);
    const joinedFarmlist = await getjoinedFarmlist(farmworklist, student);
    const finaljoinedFarmlist = joinedFarmlist.filter((farmworkData) => farmworkData != null);
    const approvedFarmlist = finaljoinedFarmlist.filter((farmworkData) => farmworkData.status == "Approved");

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
             socialworkData["feedback"]=socialwork.Feedback;
     
             return socialworkData;
         })
        )
     };

    const getjoinedSociallist = async (sociallist, student) => {
        return Promise.all(sociallist.map(async (socialworkData) => {
            const isJoined = await student.hasSocialworks(socialworkData.id);
            // console.log("|||||||||||||||||||||||||");
            // console.log(isJoined,socialworkData.id);
            if(isJoined){
                return socialworkData;
            }
            return null;
        })); 
    }

    const socialworks = await Socialwork.findAll();
    const socialworklist = await getSociallist(socialworks);
    const joinedSociallist = await getjoinedSociallist(socialworklist, student);
    const finaljoinedSociallist = joinedSociallist.filter((socialworkData) => socialworkData != null);
    const approvedSociallist = finaljoinedSociallist.filter((socialworkData) => socialworkData.status == "Approved");

    res.render('studentPastActivities', {
        approvedFarmlist: approvedFarmlist,
        approvedSociallist: approvedSociallist,
    });
};

exports.getStudent = async (req,res,next)=>{
    if(req.session.role!='Student'){
        return res.redirect('/student');
    }
    const person = req.user;
    const student = await Student.findOne({where:{personId: person.id}});
    const name = person.FirstName;
    const role = req.session.role;

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
            farmworkData["feedback"]=farmwork.Feedback;
    
            return farmworkData;
        })
       )
    }

    const getUnjoinedFarmlist = async (farmlist,student)=>{
       return Promise.all(farmlist.map(async (farmworkData)=>{
        const isJoined = await student.hasFarmworks(farmworkData.id);
        console.log("|||||||||||||||||||||||||");
        console.log(isJoined,farmworkData.id);
        if(!isJoined){
            return farmworkData;
        }
        return null;
    })) 
    }
    // 
    const getjoinedFarmlist = async (farmlist,student)=>{
        return Promise.all(farmlist.map(async (farmworkData)=>{
         const isJoined = await student.hasFarmworks(farmworkData.id);
         console.log("|||||||||||||||||||||||||");
         console.log(isJoined,farmworkData.id);
         if(isJoined){
             return farmworkData;
         }
         return null;
     })) 
     }

     
    
    const farmworks = await Farmwork.findAll();
    const farmworklist = await getFarmlist(farmworks);
    const unjoinedFarmlist = await getUnjoinedFarmlist(farmworklist,student); // This has null values in place of joined farm works
    const finalunjoinedFarmlist = unjoinedFarmlist.filter((farmworkData)=>farmworkData!=null);

    const joinedFarmlist = await getjoinedFarmlist(farmworklist,student);
    const finaljoinedFarmlist = joinedFarmlist.filter((farmworkData)=>farmworkData!=null);

    // 
    // const approvedFarmlist = finaljoinedFarmlist.filter((farmworkData)=>farmworkData.status=="Approved");
    // 
    const disapprovedFarmlist = finaljoinedFarmlist.filter((farmworkData)=>farmworkData.status=="Disapproved");
    const currentlyRegisteredFarmlist = finaljoinedFarmlist.filter((farmworkData)=>((farmworkData.status!="Approved")&&(farmworkData.status!="Disapproved")));

    let hasSplGrp = false;
    let createdStatus = false;
    let submittedSampleStatus = false;
    let sampleRejected =  false;
    let sampleAccepted = false;
    let submittedFullStatus = false;
    let fullRejected = false;
    let approved = false;

    let splprojectgrpData ={}
    let splgrpmembers = null;
    let splgrpmemberlist =null;

    const splprojectgrp = await student.getSplprojectgrp();
    if(splprojectgrp){
        const group =  await splprojectgrp.getGroup();
         splprojectgrpData = {
        splgrpId: splprojectgrp.id,
        projectname: splprojectgrp.projectName,
        status: group.status
        }
        hasSplGrp=true;
        splgrpmembers = await splprojectgrp.getStudents();
        splgrpmemberlist = await getsplgrpmemberlist(splgrpmembers);

        switch(splprojectgrpData.status){
            case 'Created':   createdStatus=true;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = false
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = false;
                                    break;
            case 'submittedSample':   createdStatus=false;
                                            submittedSampleStatus = true;
                                            sampleRejected =  false;
                                            sampleAccepted = false;
                                            submittedFullStatus = false;
                                            fullRejected = false;
                                            approved = false;
                                            break;
            case 'sampleRejected':  createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  true;
                                    sampleAccepted = false;
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = false;
                                    break;
            case 'sampleAccepted':  createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = true;
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = false;
                                    break;
            case 'submittedFull':    createdStatus=false;
                                            submittedSampleStatus = false;
                                            sampleRejected =  false;
                                            sampleAccepted = false;
                                            submittedFullStatus = true;
                                            fullRejected = false;
                                            approved = false;
                                            break;
            case 'fullRejected':    createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = false;
                                    submittedFullStatus = false;
                                    fullRejected = true;
                                    approved = false;
                                    break;
            case 'approved':        createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = false;
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = true;
                                    break;
            default: console.log("Error in status");
                    break;
                                                                            
        }

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
             socialworkData["feedback"]=socialwork.Feedback;
     
             return socialworkData;
         })
        )
     }
 
     const getUnjoinedSociallist = async (sociallist,student)=>{
        return Promise.all(sociallist.map(async (socialworkData)=>{
         const isJoined = await student.hasSocialworks(socialworkData.id);
         console.log("|||||||||||||||||||||||||");
         console.log(isJoined,socialworkData.id);
         if(!isJoined){
             return socialworkData;
         }
         return null;
     })) 
     }
     // 
     const getjoinedSociallist = async (sociallist,student)=>{
         return Promise.all(sociallist.map(async (socialworkData)=>{
          const isJoined = await student.hasSocialworks(socialworkData.id);
          console.log("|||||||||||||||||||||||||");
          console.log(isJoined,socialworkData.id);
          if(isJoined){
              return socialworkData;
          }
          return null;
      })) 
      }
     //  
     const socialworks = await Socialwork.findAll();
     const socialworklist = await getSociallist(socialworks);
     const unjoinedSociallist = await getUnjoinedSociallist(socialworklist,student); // This has null values in place of joined social works
     const finalunjoinedSociallist = unjoinedSociallist.filter((socialworkData)=>socialworkData!=null);
 
     const joinedSociallist = await getjoinedSociallist(socialworklist,student);
     const finaljoinedSociallist = joinedSociallist.filter((socialworkData)=>socialworkData!=null);
 
     // 
     // const approvedSociallist = finaljoinedSociallist.filter((socialworkData)=>socialworkData.status=="Approved");
     // 
     const disapprovedSociallist = finaljoinedSociallist.filter((socialworkData)=>socialworkData.status=="Disapproved");
     const currentlyRegisteredSociallist = finaljoinedSociallist.filter((socialworkData)=>((socialworkData.status!="Approved")&&(socialworkData.status!="Disapproved")));

    console.log("????????????????????????");
    console.log(socialworklist);

    people = {
        'ID' : person.dataValues['id'],
        'Name': person.dataValues['FirstName'] + ' ' + (person.dataValues['MiddleName'] == 'null' ? person.dataValues['MiddleName'] : '') + ' ' + person.dataValues['LastName'],
        'Email' : person.dataValues['Email'],
        'Phone' : person.dataValues['Phone'],
        'Department' :  person.dataValues['Department'],
        'Special Project ID' : student.dataValues['splprojectgrpId'],
        'Farm Hours' : student.dataValues['FarmWorkHours'],
        'Social Hours' : student.dataValues['SocialWorkHours'],
        'Special Project Hours' : student.dataValues['SplProjectHours'],
        'Faculty ID' : student.dataValues['facultyId'],
        'Grades' : student.dataValues['Grades']
    }
    res.render('student',{
        people : people,
        unjoinedfarmworklist: finalunjoinedFarmlist,
        // approvedFarmlist: approvedFarmlist,
        disapprovedFarmlist: disapprovedFarmlist,
        currentlyRegisteredFarmlist: currentlyRegisteredFarmlist,
        student: student,
        unjoinedsocialworklist: finalunjoinedSociallist,
        // approvedSociallist: approvedSociallist,
        disapprovedSociallist: disapprovedSociallist,
        currentlyRegisteredSociallist: currentlyRegisteredSociallist,

        splprojectgrpData: splprojectgrpData,
        splgrpmemberlist: splgrpmemberlist,
        hasSplGrp: hasSplGrp,
        createdStatus: createdStatus,
        submittedSampleStatus: submittedSampleStatus,
        sampleRejected:sampleRejected,
        sampleAccepted: sampleAccepted,
        submittedFullStatus: submittedFullStatus,
        fullRejected: fullRejected,
        approved: approved,
        
    });
        
    // res.render('student',{
    //     name: name,
    //     role: role,
    //     unjoinedfarmworklist: finalunjoinedFarmlist,
    //     approvedFarmlist: approvedFarmlist,
    //     disapprovedFarmlist: disapprovedFarmlist,
    //     currentlyRegisteredFarmlist: currentlyRegisteredFarmlist,
    //     student: student
    // })
    
}

exports.getSpecialProjectGroup = async(req, res, next) => {
    if(req.session.role!='Student'){
        return res.redirect('/student');
    }
    const person = req.user;
    const student = await Student.findOne({where:{personId: person.id}});
    let hasSplGrp = false;
    let createdStatus = false;
    let submittedSampleStatus = false;
    let sampleRejected =  false;
    let sampleAccepted = false;
    let submittedFullStatus = false;
    let fullRejected = false;
    let approved = false;

    let splprojectgrpData ={}
    let splgrpmembers = null;
    let splgrpmemberlist =null;

    // let splprojectgrp = {};
    const splprojectgrp = await student.getSplprojectgrp();
    if(splprojectgrp){
        const group =  await splprojectgrp.getGroup();
         splprojectgrpData = {
        splgrpId: splprojectgrp.id,
        projectname: splprojectgrp.projectName,
        status: group.status
        }
        hasSplGrp=true;
        splgrpmembers = await splprojectgrp.getStudents();
        splgrpmemberlist = await getsplgrpmemberlist(splgrpmembers);

        switch(splprojectgrpData.status){
            case 'Created':   createdStatus=true;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = false
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = false;
                                    break;
            case 'submittedSample':   createdStatus=false;
                                            submittedSampleStatus = true;
                                            sampleRejected =  false;
                                            sampleAccepted = false;
                                            submittedFullStatus = false;
                                            fullRejected = false;
                                            approved = false;
                                            break;
            case 'sampleRejected':  createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  true;
                                    sampleAccepted = false;
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = false;
                                    break;
            case 'sampleAccepted':  createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = true;
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = false;
                                    break;
            case 'submittedFull':    createdStatus=false;
                                            submittedSampleStatus = false;
                                            sampleRejected =  false;
                                            sampleAccepted = false;
                                            submittedFullStatus = true;
                                            fullRejected = false;
                                            approved = false;
                                            break;
            case 'fullRejected':    createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = false;
                                    submittedFullStatus = false;
                                    fullRejected = true;
                                    approved = false;
                                    break;
            case 'approved':        createdStatus=false;
                                    submittedSampleStatus = false;
                                    sampleRejected =  false;
                                    sampleAccepted = false;
                                    submittedFullStatus = false;
                                    fullRejected = false;
                                    approved = true;
                                    break;
            default: console.log("Error in status");
                    break;
                                                                            
        }

    }
    res.render('studentSpecialProject', {
        splprojectgrpData: splprojectgrpData,
        splgrpmemberlist: splgrpmemberlist,
        hasSplGrp: hasSplGrp,
        createdStatus: createdStatus,
        submittedSampleStatus: submittedSampleStatus,
        sampleRejected:sampleRejected,
        sampleAccepted: sampleAccepted,
        submittedFullStatus: submittedFullStatus,
        fullRejected: fullRejected,
        approved: approved,
    });
}

exports.postJoinfarmwork = async (req,res,next)=>{
    const farmworkId = req.body.farmworkId;
    const person = req.session.user;
    const student = await Student.findOne({where:{personId: person.id}});
    await student.addFarmworks([farmworkId])
    res.redirect('/student');
}

exports.getCreateSplGrp = async (req,res,next)=>{
    if(req.session.role!='Student'){
        return res.redirect('/student');
    }
    const person = req.user;
    const student = await Student.findOne({where:{personId: person.id}});
    const name = person.FirstName;
    const role = req.session.role;

    const createdStatus=req.query.createdStatus;
    const submittedSampleStatus = req.query.submittedSampleStatus;
    const sampleRejected =  req.query.sampleRejected;
    const sampleAccepted = req.query.sampleAccepted;
    const submittedFullStatus = req.query.submittedFullStatus;
    const fullRejected = req.query.fullRejected;
    const approved = req.query.approved;

    const getsplgrpmemberlist = async (splgrpmembers)=>{
        return Promise.all(splgrpmembers.map(async (splgrpmember)=>{
            let splgrpmemberData = {}
            const person = await splgrpmember.getPerson();
            splgrpmemberData["studentId"] = splgrpmember.id;
            splgrpmemberData["firstname"] = person.FirstName;
            return splgrpmemberData;

     })) 
     }

    let splprojectdata = {};
    const splprojectgrp = await student.getSplprojectgrp();
    let splgrpmemberlist = []
    if(splprojectgrp){
        const splgrpmembers = await splprojectgrp.getStudents();
         splgrpmemberlist = await getsplgrpmemberlist(splgrpmembers)

        splprojectdata["projectname"] = splprojectgrp.projectName;
        splprojectdata["sampledescription"] = splprojectgrp.SampleDescription;
        splprojectdata["fulldescription"] = splprojectgrp.FullDescription;
        splprojectdata["samplefeedback"] = splprojectgrp.Samplefeedback;
        splprojectdata["feedback"] = splprojectgrp.Feedback;
        

    }

    res.render('createsplgrp',{
        studentId: student.id,
        name: name,
        role: role,
        createdStatus: createdStatus,
        submittedSampleStatus: submittedSampleStatus,
        sampleRejected:sampleRejected,
        sampleAccepted: sampleAccepted,
        submittedFullStatus: submittedFullStatus,
        fullRejected: fullRejected,
        approved: approved,
        splprojectdata: splprojectdata,
        splgrpmemberlist: splgrpmemberlist
       
    })


}

exports.postCreateSplGrp = async (req,res,next)=>{
    const studentId = req.body.studentId;
   
    let status = "Created"

    const student = await Student.findByPk(studentId);
    let splprojectgrp = await student.getSplprojectgrp();
    let group = null;
    if(splprojectgrp){
        group = await splprojectgrp.getGroup();
    }
    

    const createdStatus=req.query.createdStatus;
    const submittedSampleStatus = req.query.submittedSampleStatus;
    const sampleRejected =  req.query.sampleRejected;
    const sampleAccepted = req.query.sampleAccepted;
    const submittedFullStatus = req.query.submittedFullStatus;
    const fullRejected = req.query.fullRejected;
    const approved = req.query.approved;

    const sampledescription = req.body.sampledescription;
    const fulldescription = req.body.fulldescription;

    

    if(createdStatus){
        await splprojectgrp.update({SampleDescription: sampledescription})
        await group.update({status: "submittedSample"})
    } else if (submittedSampleStatus){
       await  splprojectgrp.update({SampleDescription: sampledescription})
       await group.update({status: "submittedSample"})
    } else if(sampleRejected) {
        await  splprojectgrp.update({SampleDescription: sampledescription})
        await group.update({status: "submittedSample"})
    } else if(sampleAccepted){
       await splprojectgrp.update({FullDescription: fulldescription})
       await group.update({status: "submittedFull"})
    } else if(submittedFullStatus){
        await splprojectgrp.update({FullDescription: fulldescription})
        await group.update({status: "submittedFull"})
    } else if(fullRejected){
        await splprojectgrp.update({FullDescription: fulldescription})
        await group.update({status: "submittedFull"})
    }
    else {
        const student1Id = req.body.student1;
        const student2Id = req.body.student2;
        const student3Id = req.body.student3;
        const student4Id = req.body.student4;
        const projectName = req.body.projectName;

        await student.createSplprojectgrp({
            projectName: projectName,
            group:{
                status: status
            }
        },{
            include: [Splprojectgrp.Group]
        });
    
         splprojectgrp = await student.getSplprojectgrp();
    
        await splprojectgrp.addStudents([student1Id,student2Id,student3Id,student4Id]);

    }
    res.redirect('/student');
}

    

exports.postJoinsocialwork = async (req,res,next)=>{
    const socialworkId = req.body.socialworkId;
    const person = req.session.user;
    const student = await Student.findOne({where:{personId: person.id}});
    await student.addSocialworks([socialworkId])
    res.redirect('/student');
}