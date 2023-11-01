const fs = require('fs');
const csv = require('csv-parser')
const { stringify } = require('csv-stringify');

const userCreate = async(req,res) => {
    try {
        const { email, mobile, firstname, lastname, address } = req.body;
        if(fs.existsSync('db.csv')){
            const results = [];

            fs.createReadStream('db.csv')
              .pipe(csv())
              .on('data', (data) => results.push(data))
              .on('end', () => {
                const user = results.find((row) => row.email == email);
                if(user){
                    res.status(404)
                    .send({message: "This email is already registered, Try with different email"})
                }else{
                    addUser();
                }
            });
            function addUser(){
                const data = [
                    [ email, mobile, firstname, lastname, address ]
                ];
                
                stringify(data,(error, output)=>{
                    if(error){
                        return res.status(400)
                        .send({message: "Error, User Not Created"});
                    };
                    fs.appendFileSync('db.csv',output);
                })
        
                res.status(200).
                send({message: "User Creation Successfull"});
            }
        }else{
            const data = [
                ['email', 'mobile', 'firstname', 'lastname', 'address'],
                [ email, mobile, firstname, lastname, address ]
            ];
    
            stringify(data,(error, output)=>{
                if(error){
                    return res.status(400)
                    .send({message: "Error, User Not Created"});
                };
                fs.writeFileSync('db.csv',output);
            })
    
            res.status(200).
            send({message: "User Creation Successfull"});
        }
    } catch (error) {
        res.status(500)
        .send({message: "Something went wrong"});
        console.log(error.message);
    }
}

const userLoad = async(req,res) => {
    try {
        const results = [];
        fs.createReadStream('db.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.status(200)
            .json(results)
        }); 
    } catch (error) {
        res.status(500)
        .send({message: "Something went wrong"});
        console.log(error.message);
    }
}

const deleteUser = async(req,res) => {
    try {
        const targetEmail = req.body.email;
        const results = [];
        fs.createReadStream('db.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const filteredResults = results.filter((row) => row.email != targetEmail);
            const ws = fs.createWriteStream('db.csv');
            ws.write('email,mobile,firstname,lastname,address\n');
            for(let row of filteredResults){
                ws.write(`${row.email},${row.mobile},${row.firstname},${row.lastname},${row.address}\n`);
            }
            ws.end();
            res.status(200)
            .send({message: "Data has been deleted", filteredResults});
        })
    } catch (error) {
        res.status(500)
        .send({message: "Something went wrong"});
        console.log(error.message);
    }
}

const getUser = async(req,res) => {
    try {
        const email = req.query.email;
        const results = [];
        let filteredResults;
        fs.createReadStream('db.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            filteredResults = results.filter((data) => data.email == email);
            res.status(200)
            .json(filteredResults);
        });
    } catch (error) {
        res.status(500)
        .send({message: "Something went wrong"});
        console.log(error.message);
    }
}

const updateUser = async(req,res) => {
    try {
        const email1 = req.body.email;
        const results = [];
        let filteredResults;
        fs.createReadStream('db.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            filteredResults = results.filter((data) => data.email != email1);
            filteredResults.push(req.body.userData);
            const ws = fs.createWriteStream('db.csv');
            ws.write('email,mobile,firstname,lastname,address\n');
            for(let row of filteredResults){
                ws.write(`${row.email},${row.mobile},${row.firstname},${row.lastname},${row.address}\n`);
            }
            ws.end();
            res.status(200)
            .send({message: "Data Updated Successfully"});
        });
    } catch (error) {
        res.status(500)
        .send({message: "Something went wrong"});
        console.log(error.message);
    }
}

module.exports = {
    userCreate,
    userLoad,
    deleteUser,
    getUser,
    updateUser
}