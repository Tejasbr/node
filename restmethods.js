let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
const routes = require("./api/routes/index");

let app = express();

app.use(bodyparser.json());
mongoose.connect('mongodb://localhost/tejasnr11', {useNewUrlParser: true,
                                                useUnifiedTopology: true,
                                                useFindAndModify: false,
                                                useCreateIndex: true
                                                });

routes(app);  
                                              
app.listen(3500, () => {
    console.log("server is running on port 3500");
})





// app.post("/api/user", register);
// app.get("/api/user", getreq);
// app.get("/api/user/:id", getreqById);
// app.patch("/api/user/:id", patchdata);
// app.delete("/api/user/:id", deletedata);


// let list = [
//     {
//         fid: 1,
//         name: "Tejas",
//         club: "PSG",
//         Age: 23
//     },
//     {
//         fid: 2,
//         name: "Neymar",
//         club: "PSG",
//         Age: 23
//     },
//     {
//         fid: 3,
//         name: "Ronaldo",
//         club: "PSG",
//         Age: 23
//     }
// ]

// app.get("/get", (req, res) => {
//     res.json({
//         message: "get request pass successfully",
//         user: list
//     })
// });

// app.get("/get/:fid", (req, res) => {
//     let user = list.filter(i => i.fid === JSON.parse(req.params.fid));
//     res.json({
//         message: "get request pass successfully",
//         user: user
//     })
// });

// app.post("/post", (req, res) => {
//     let reqData = req.body;
//     let name=req.body.name;
//     let user = list.filter(i => i.name === name);
//     if (user.length){
//         res.status(400).json({
//             Failed: "Post Request Failed!!!!!"
//         })
//     }
//     else {
//         reqData.fid = list.length + 1;
//         // req.body.fid = list.length + 1;
//         list.push(reqData);
//         res.status(200).json({
//             Success: "Post Request successful!!!",
//             user: req.body
//         })
//     }
// });

// app.delete("/delete/:fid", (req, res) => {
//     let user=list.filter(i => i.fid === JSON.parse(req.params.fid));
//     list.splice(req.params.fid,1);
//     // delete list[req.params.fid];
//     res.json({
//         Success: "Delete Request successful!!!"
//     })

// });



