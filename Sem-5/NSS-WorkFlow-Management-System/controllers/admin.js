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
Splvolunteer.Person = Splvolunteer.belongsTo(People);

exports.getEditProfile = (req, res, next) => {
    if(req.session.role!="Admin"){
        return res.redirect('/person');
    }
    const user = req.user;
    admin = {
        'FirstName' : user.dataValues['FirstName'],
        'MiddleName' : user.dataValues['MiddleName'],
        'LastName' : user.dataValues['LastName'],
        'Email' : user.dataValues['Email'],
        'Phone' : user.dataValues['Phone'],
    }
    res.render('adminEditProfile', {admin: admin});
}

exports.postEditProfile = async (req, res, next) => {
    if(req.session.role!="Admin"){
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

    admin = await Admin.findByPk(id);

    if(newPassword != confirmNewPassword || oldPassword != admin.Password)
        res.redirect('/admin/editProfile');
    else { 
        admin.FirstName = (firstName == '' ? admin.FirstName : firstName);
        admin.MiddleName = (middleName == '' ? null : middleName);
        admin.LastName = (lastName == '' ? admin.lastName : lastName);
        admin.Email = (email == '' ? null : email);
        admin.Phone = (phone == '' ? null : phone);
        admin.Password = (newPassword == '' ? admin.Password : newPassword);

        await admin.save();
        res.redirect('/admin/addperson');
    }
}

exports.getAddperson = (req,res,next)=>{
    if(req.session.role!="Admin"){
        return res.redirect('/person');
    }
    const user = req.user;
    admin = {
        'ID': user.dataValues['id'],
        'Name': user.dataValues['FirstName'] + ' ' + (user.dataValues['MiddleName'] == 'null' ? user.dataValues['MiddleName'] : '') + ' ' + user.dataValues['LastName'],
        'Email': user.dataValues['Email'],
        'Phone': user.dataValues['Phone']
    };
    res.render('admin',{admin: admin});
}

exports.postAddperson =async (req,res,next)=>{
    try {
        const role=req.body.role;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const department = req.body.department;

    if((role != 'Admin' && department == '') || (firstname == '') || (lastname == '') || (password == '') || (role == ''))
        res.redirect('/admin/addperson');

    switch(role){
        case 'Student': Student.create({
            person: {
                    FirstName: firstname,
                    LastName: lastname,
                    Password: password,
                    Department: department
            },},
            {
                include:[Student.Person]
            }
        ).then(result=>{
            console.log("Created By Admin!!!!!");
            console.log(result);
            res.redirect('/admin/addperson');
            // res.redirect('/person');
        })
        break;
    case 'Farmhead': Farmhead.create({
        person: {
                FirstName: firstname,
                LastName: lastname,
                Password: password,
                Department: department
        },},
        {
            include:[Farmhead.Person]
        }).then(result=>{
            console.log("Created By Admin!!!!!");
            console.log(result);
            res.redirect('/admin/addperson');
            // res.redirect('/farmhead');
        })
        break;
    case 'Socialhead':
        Socialhead.create({
        person: {
                FirstName: firstname,
                LastName: lastname,
                Password: password,
                Department: department
        }}, {include: [People]},
        ).then(result=>{
            console.log("Created By Admin!!!!!");
            console.log(result);
            res.redirect('/admin/addperson');
            // res.redirect('/farmhead');
        }).catch(err => console.log(err));
        break;
    case 'Faculty': Faculty.create({
        person: {
                FirstName: firstname,
                LastName: lastname,
                Password: password,
                Department: department
        },},
        {
            include:[People]
        }).then(result=>{
            console.log("Created By Admin!!!!!");
            console.log(result);
            res.redirect('/admin/addperson');
            // res.redirect('/farmhead');
        })
        break;
    case 'Nssvolunteer': Nssvolunteer.create({
        person: {
                FirstName: firstname,
                LastName: lastname,
                Password: password,
                Department: department
        },},
        {
            include:[Nssvolunteer.Person]
        }).then(result=>{
            console.log("Created By Admin!!!!!");
            console.log(result);
            res.redirect('/admin/addperson');
            // res.redirect('/farmhead');
        })
        break;
    case 'Splvolunteer': Splvolunteer.create({
        person: {
                FirstName: firstname,
                LastName: lastname,
                Password: password,
                Department: department
        },},
        {
            include:[Splvolunteer.Person]
        }).then(result=>{
            console.log("Created By Admin!!!!!");
            console.log(result);
            res.redirect('/admin/addperson');
        })
        break;
    case 'Admin': Admin.create({
        FirstName: firstname,
        LastName: lastname,
        Password: password
        })
        .then(result => {
            res.redirect('/admin/addperson');
        })
        break;
    default:
        console.log("Hi");
        console.log("Error!")
    }

    } catch(err) {
        next(err);
    }

}