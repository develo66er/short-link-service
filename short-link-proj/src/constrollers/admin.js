
const uuid = require('uuid');
const { nanoid } = require('nanoid');
const User = require('./../models/user');

exports.addLink = (req, res, next) => {
    
    const url = req.body.text;
    let uid = req.body.uid;
    console.log(req.body);
  
    let user;
    let current_short;
    if (!uid) {
      const shorted_url = nanoid(7);
      uid = uuid.v1();
      links = [];
      links.push({ original_url: url, shorted_url: shorted_url, clicks: 1 });
      user = new User({
        uid: uid,
        links: links,
        currentShort: shorted_url
      });
      current_short = shorted_url;
      user.save();
      return res.end(JSON.stringify({ uid: uid, link: shorted_url, errMsg: '' }));
    } else {
  
      user = User.findOne({ "uid": uid }).then(u => {
       current_short =  u.addLink({ url });
       return res.end(JSON.stringify({ uid: uid, link: current_short, errMsg: '' }));
      }).catch(err => {
        return res.end(JSON.stringify({ uid: uid, link: undefined, errMsg: err }));
      });
  
  
    }
   

    
  }

  exports.postRedirect = (req, res, next) => {
    const short_link = req.body.link;
    const uid = req.body.uid;
    if (short_link && uid) {
      User.findOne({ "uid": uid }).then(u => {
        const original_url = u.getLink({ short_link });
        if (original_url) {
        
          return res.end(JSON.stringify({uid:uid,original_url:original_url}));
        } else {
          return res.end(JSON.stringify({ uid: uid, link: undefined, errMsg: err }));
        }
      }).catch(err => {
        return res.end(JSON.stringify({ uid: uid, link: undefined, errMsg: err }));
      });
    }else{
      return res.end(JSON.stringify({ errMsg: 'no params error' }));

    }
  }