
const User = require('../models/user');
const Post = require('../models/post');

const getPostsList = async (posts)=>{
    return Promise.all(
        posts.map(async (post)=>{
            const user = await post.getUser();
             
            return `[<i>${user.UserName}</i>] : ${post.Message}`;
        })
    )
}

const getCorrectedPostsList = async (posts)=>{
    return Promise.all(
        posts.map(async (post)=>{
            const user = await post.getUser();
             
            return `[${user.UserName}] : ${post.Message}`;
        })
    )
}



exports.getXss = async (req,res,next)=>{
    const posts = await Post.findAll();
    console.log(posts);
    const postsList = await getPostsList(posts);
    console.log(postsList);
    const user = req.user;
    //console.log(document.cookie);
    console.log("***********************************");
    res.render('xss',{
        posts: postsList,
        userName: user.UserName
    });
}

exports.getCorrectedXss = async (req,res,next)=>{
    const posts = await Post.findAll();
    console.log(posts);
    const postsList = await  getCorrectedPostsList(posts);
    console.log(postsList);
    const user = req.user;
    //console.log(document.cookie);
    console.log("***********************************");
    res.render('xss_corrected',{
        posts: postsList,
        userName: user.UserName
    });
}



exports.postXss = async (req,res,next)=>{
    const userMessage = req.body.userMessage;
    const user = req.user;

    await user.createPost({Message: userMessage});

    res.redirect('/xss');
}

exports.postCorrectedXss = async (req,res,next)=>{
    const userMessage = req.body.userMessage;
    const user = req.user;

    await user.createPost({Message: userMessage});

    res.redirect('/correctedxss');
}

exports.getReflectedXss = async (req,res,next)=>{
    //const user = req.user;
    const query = req.query.q;
    let message = 'No such user found!!';
    console.log(query);
    if(query){
        const queriedUser=   await User.findOne({where:{ UserName: query}});
     if(queriedUser!=null)
     {
        message = `<i>${queriedUser.UserName}</i> : ${queriedUser.Qualification}`
     }
     console.log(message);
    }
    
    res.render('search',{
        userName: "Goutham",
        query: query,
        message: message
    })
}

exports.getCorrectedReflectedXss = async (req,res,next)=>{
    //const user = req.user;
    const query = req.query.q;
    let message = 'No such user found!!';
    console.log(query);
    if(query){
        const queriedUser=   await User.findOne({where:{ UserName: query}});
     if(queriedUser!=null)
     {
        message = `${queriedUser.UserName}: ${queriedUser.Qualification}`
     }
   
    }
    
    res.render('search_corrected',{
        userName: "Goutham",
        query: query,
        message: message
    })
}


exports.postReflectedXss = async (req,res,next)=>{
    const query = req.body.query;
 
    res.redirect(`/reflectedXss?q=${query}`);
}

exports.postCorrectedReflectedXss = async (req,res,next)=>{
    const query = req.body.query;
    
    res.redirect(`/correctedreflectedXss?q=${query}`);
}

exports.getDomXss = (req,res,next)=>{
    res.render('domWelcome');
}

exports.getCorrectedDomXss = (req,res,next)=>{
    res.render('domWelcome_corrected');
}