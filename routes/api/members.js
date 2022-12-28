const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


//get all members
router.get('/', (req, res) => res.json(members)); 

//get single member
router.get('/:id', (req, res) => {
    const member = members.filter(member => member.memberid == req.params.id);
     
    if(member[0])
    {
        res.json(member[0]);
    }
    else
    {
        res.status(400).json({msg:`No member with the id of ${req.params.id}`});
    }
   
 });
    

    //create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        membername: req.body.name,
        memberemail: req.body.email,
        status: 'active'
    };

    if (!newMember.membername || !newMember.memberemail ) {
       return res.status(400).json({msg:'please include name and email'});
    }
    members.push(newMember);
    res.json(members);
    //res.redirect('/');

});

//update member

//1. put request
//2. check its found if yes 
//3. we put req.body in updmember variable  loop through our members 
//4.check to see the id is equal to that (req.params.id)is passed in request put 
//  member.name = updMember.name
//5. set the member name depending on if the name was sent with we request
//  ? updMember.name: member.name;
// if it was we will set it to the new name if it wasn't  we will keep the old one 

router.put('/:id', (req, res) => {
    const member = members.filter(member => member.memberid == req.params.id);

if (member[0]) {
    const updMember = req.body;
    members.forEach(member => {
        if (member.memberid === parseInt(req.params.id)) {
            member.membername = updMember.name ? updMember.name : member.name;  //ternary operator 
            member.memberemail = updMember.email ? updMember.email : member.email;

            res.json({ msg: 'member updated', member });
        }
    });
}
else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
}
     
    });
   
    router.get('/memmbers', (req, res) => {
      res.send('This is member');
    });
  

    //delete member
   
    router.delete('/:id', function(req, res){

        var memberIds = members.map(function(m){
           return m.memberid ;
        }); // productIds = [11,22,33,44]
        
     
        var removemember = memberIds.indexOf(parseInt(req.params.id)); // 2
     
        if(removemember == -1){
           res.json({message: 'member Deleted'} )
        
        } else {
           members.splice(removemember, 1);
           res.status(400).json({message: `No member with id of ${req.params.id}`});
        }
     });

   
  
    module.exports = router; 