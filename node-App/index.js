var jwt = require('jsonwebtoken');
const express = require("express");
const { body, validationResult } = require('express-validator');
const app = express();
const port = 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: true, }));
var mysql = require('mysql');
var databaseModule = require("./models/destination");
var credModule = require("./cred");
var cors = require('cors')
app.use(cors())

const key = 'MuchSecretVerySecureSoSafe';
const sign = require('jwt-encode');
const serverStatus = {
    "status": 500,
    "msg": "Internal Server Error"
};

var serverResponse = {
    "data": null,
    "serverStatus": null
}

console.log(credModule.connDetails);



app.get("/destinations", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO DESTINATION API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query(databaseModule.allDestinations, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/transports", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO TRANSPORTS API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM TRANSPORTS", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});



app.get("/destinations/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO DESTINATION API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM DESTINATIONS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});


app.get("/listings/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO LISTINSG API " + req.params.id);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql;
        if (req.params.id == 0) {
            console.log("Listing All Destinations")
            sql = databaseModule.listingsAllDestinations;
        } else {
            console.log("Listing All Destinations by ID : " + req.params.id);
            sql = databaseModule.listingsByDestinationsId + req.params.id;
        }

        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/listingDetail/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO LISTINSG Details API " + req.params.id);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = databaseModule.listingsByListingId + req.params.id + "";
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/listingDetailImages/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO LISTINSG Details API " + req.params.id);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = databaseModule.listingsByListingImagesId + req.params.id;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});
app.get("/transports/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO TRANSPORTS API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM TRANSPORTS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/hotels", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO HOTELS API");
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT h.id,h.hotel_name,h.hotel_rating,h.hotel_price,d.des_name FROM hotels h left join destinations d on h.des_id = d.id;", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/hotels/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO HOTELS API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM HOTELS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/sites", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log('Got INTO SITES API')
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT s.id,s.site_name,s.site_description,s.site_rating,s.site_price,d.des_name FROM sites s left join destinations d on s.des_id = d.id;", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

app.get("/images", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log('Got INTO Images API')
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);
        conn.query("SELECT s.img_url,s.site_name,d.des_name FROM sites s left join destinations d on s.des_id = d.id;", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });

});

//for login page
app.post("/login", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log('Got INTO LOGIN API')
    conn.connect(function (err) {
        if (err) throw res.json(serverStatus);

        var sql = "select id,login_username,email,address from login where login_username='" + req.body.uname + "' AND login_password='" + req.body.password + "'";

        conn.query(sql, function (err, result) {

            if (err) throw err;

            console.log(req.body.password);
            console.log(JSON.stringify(result));
            const token = sign(result, key);
            let username = req.body.uname;
            let email = sql.email;
            
            console.log(token);
            if (result.length > 0) {
                res.json({
                    result,
                    token: token,
                    username,
                    message: "Login Successful" 

                });
            }
            else {
                res.send({
                    status: false, 
                    message: "Invaild Username or password..!" 
                })
            }
        });
    });
});
//Add Destination
app.post("/destinations", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO DESTINATION API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = `INSERT INTO DESTINATIONS (des_name, des_distance, des_rating) VALUES ('${req.body.des_name}',${req.body.des_distance}, ${req.body.des_rating} )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


app.post("/book", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO DESTINATION API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = `INSERT INTO user_bookings (id, trip_id, start_date, end_date, u_id, price) VALUES ('${req.body.user_id}',${req.body.trip_id}, '${req.body.start_date}', '${req.body.end_date}', ${req.body.u_id}, ${req.body.price} )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/book/:u_id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET INTO Booking API");
    conn.connect(function (err) {
        if (err) return res.json({ "errorCode": "500" });
        var sql = `select b.id, b.trip_id, b.start_date, b.end_date, b.u_id, b.price, d.des_name, d.des_rating from user_bookings b left join trips t on b.trip_id = t.id left join destinations d on t.des_id = d.id where u_id = `+req.params.u_id;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Registration
app.post("/register", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO REGISTER API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO LOGIN (
            login_username,
            login_password,
            usertype,
            email,
            address) VALUES ('${req.body.username}','${req.body.password}', 'user','${req.body.email}','${req.body.address}' )`;
            conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
            console.log(result);
            
        });
    });
});

//for forgot password
app.put("/register/:u_name", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO login API");
    console.log(req.params.u_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = "UPDATE login set login_password='" + req.body.u_pass + "' where login_username = '" + req.params.u_name + "'";
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


//Add transports
app.post("/transports", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO Transport API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO TRANSPORTS (
            t_name,
            t_price,
            t_rating,
            t_description,
            t_capacity) VALUES ('${req.body.t_name}',${req.body.t_price}, ${req.body.t_rating},'${req.body.t_description}',${req.body.t_capacity} )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
//Add sites
app.post("/sites", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO SITES API");
    console.log(req.body.site_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO SITES (
            site_name,
            site_description,
            site_rating,
            site_price,
            des_id) VALUES ('${req.body.site_name}', '${req.body.site_description}', ${req.body.site_rating}, ${req.body.site_price}, ${req.body.des_id})`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
//AddHotels
app.post("/hotels", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO HOTELS API");
    console.log(req.body.des_name);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO HOTELS (
            hotel_name,
            hotel_price,
            hotel_rating,
            des_id) VALUES ('${req.body.hotel_name}', ${req.body.hotel_price},${req.body.hotel_rating},${req.body.des_id})`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Update Destination
app.put("/destinations/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO DESTINATION API");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE DESTINATIONS set des_name = '${req.body.des_name}', des_distance = ${req.body.des_distance}, des_rating = ${req.body.des_rating} where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Update Transport
app.put("/transports/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO transports API");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE transports set t_name = '${req.body.t_name}', t_price = ${req.body.t_price}, t_rating = ${req.body.t_rating}, t_description = '${req.body.t_description}', t_capacity=${req.body.t_capacity}  where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Update Hotel
app.put("/hotels/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO HOTELS API");
    console.log(req.body.t_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE hotels set hotel_name = '${req.body.hotel_name}', hotel_price = ${req.body.hotel_price}, hotel_rating = ${req.body.hotel_rating}, des_id = ${req.body.des_id}  where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
//Update Site
app.put("/sites/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO SITES API");
    console.log(req.body.site_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE sites set site_name = '${req.body.site_name}', site_description = '${req.body.site_description}', site_rating = ${req.body.site_rating}, site_price = ${req.body.site_price}, image_url=${req.body.image_url}  where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
//Delete Destination
app.delete("/destinations/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO DESTINATION API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  DESTINATIONS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
//Delete Transport
app.delete("/transports/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO transports API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  transports where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

//Delete Site
app.delete("/sites/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO sites API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  sites where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
//Delete Hotel
app.delete("/hotels/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO hotels API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  hotels where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

app.get("/userfeedback", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO FEEDBACK API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM user_feedback", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
// All Testimonial Data
app.get("/testimonials", (req, res) => {


    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO TESTIMONIAL API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM TESTIMONIALS", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


// All Bookmarks Data
app.get("/bookmarks", (req, res) => {


    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GOT INTO BOOKMARKS API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        conn.query("SELECT * FROM BOOKMARKS", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});
// Testimonial Data by ID
app.get("/testimonial/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO TESTIMONIAL API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT * FROM TESTIMONIALS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
    
});


// Bookmark Data by ID
app.get("/bookmark/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("GET BY ID INTO BOOKMARK API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `SELECT DES_NAME,des_rating FROM DESTINATIONS WHERE ID in (SELECT DESTINATION_ID
            FROM BOOKMARKS WHERE USER_ID=${req.params.id} order by destination_id)`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
    
});

// Insert into Testimonial Table
app.post("/testimonial", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO TESTIMONIAL API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO TESTIMONIALS (picture, name, designation, comment) VALUES ('${req.body.picture}','${req.body.name}', '${req.body.designation}', '${req.body.comment}' )`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json("Successfully Inserted Data");
        });
    });
});


// Insert into Bookmarks Table
app.post("/bookmark", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("POST INTO BOOKMARK API");
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `INSERT INTO BOOKMARKS (user_id,destination_id) VALUES ('${req.body.user_id}','${req.body.destination_id}')`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json("Successfully Inserted Data");
        });
    });
});
// Update on Testimonial
app.put("/testimonial/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("PUT INTO TESTIMONIAL API");
    console.log(req.body.des_name);
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `UPDATE TESTIMONIALS set picture = '${req.body.picture}', name = '${req.body.name}', designation = '${req.body.designation}', comment = '${req.body.comment}' where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json("Successfully Updated ID: " + req.params.id)        
        });
    });
});

// Delete in Testimonial
app.delete("/testimonial/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO TESTIMONIAL API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM TESTIMONIALS where id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json("Successfully Deleted ID: " + req.params.id)        
        });
    });
});

// Delete in Bookmark
app.delete("/bookmark/:id", (req, res) => {
    const conn = mysql.createConnection(credModule.connDetails);
    console.log("DELETE INTO BOOKMARK API");
    console.log(req.params.id);
    conn.connect(function (err) {
        if (err) throw "ERROR";
        var sql = `DELETE FROM  BOOKMARKS where bookmark_id = ${req.params.id}`;
        conn.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json("Successfully Deleted ID: " + req.params.id)        
        });
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
