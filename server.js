const express = require("express");
const app = express();
const PORT = 3000;

//Calculating Age using the date of birth
function date(dob) {
  const today = new Date();
  const DOB = new Date(dob);
  let age = today.getFullYear() - DOB.getFullYear();
  const monthDiff = today.getMonth() - DOB.getMonth();
  if (monthDiff < 0 || today.getDate() < DOB.getDate()) {
    age -= 1;
  }
  return age;
}
app.get('/',(req,res)=>{
    res.json({message : "Please go to the /signup Route"})
})
// Getting the details using GET and accepting the detail via query and showing the details to the user with validation  

app.get("/signup", (req, res) => {
  const { username, email, password, dob } = req.query;
  const data = { username, email, password, dob };

  if (!username) {
    return res.status(400).send({ error: "Username cannot be empty" });
  }
  if (!email) {
    return res.status(400).send({ error: "Email cannot be empty" });
  }
  if(!password){
    return res.status(400).send({ error: "Password cannot be empty and it must be minimum of 8 characters and cannot exceed 16 characters " });
  }
  if (password.length < 8 || password.length > 16) {
    if(password.length < 8){
        return res.status(400).send({ error: "Password must be minimum of 8 characters" });  
    }else if(password.length > 16){
        return res.status(400).send({ error: "Password must not exceed 16 characters" });
    }
  }
else{
    const age = date(dob)
    const details = {
        "Username" : username,
        "email" : email,
        "Password" : password,
        "Date of Birth" : dob,
        "Age" : age
    }
    res.status(201).json(details)
}

});



app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));