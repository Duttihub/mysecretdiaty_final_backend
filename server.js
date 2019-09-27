const express = require('express');
const cors = require('cors');
const mysql = require('mysql')

//Create connection
const db = mysql.createConnection({
  host: 'db.f4.htw-berlin.de',
  user: 's0544645',
  password: 'testtest',
  database: '_s0544645__Dani_webtech'
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
  next();
});

//Bearbeite Eintrag
app.get('/edit', (req, res) => {
  const { id, titelnew, eintragnew } = req.query;
  console.log(req.params);
  let sql = `UPDATE Tagebuch SET titel = ?, Eintrag =  ? WHERE ID = ?`;
  db.query(sql, [titelnew, eintragnew, id], (err, results) => {
    if (err) {
      console.log(err)
    }
    else {
      return res.send('Erfolgreich zu Schwarzmaler hinzugefügt')
    }
  })
});


//SELECT einen Eintrag nach ID
app.get('/get/:id', (req, res) => {
  console.log(req.params.id);
  let sql = `SELECT * FROM Tagebuch WHERE id = ${req.params.id}`;
  let query = db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.json({
      data: result
    });
  });
});

//Selct Einträge nach KID
app.get('/kategorie/:kid', (req, res) => {
  console.log(req.params.id);
  let sql = `SELECT * FROM Tagebuch t join Kategorie k on t.kid=k.kid WHERE t.kid = ${req.params.kid}`;
  let query = db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    console.log(result);
    return res.json({
      data: result
    });
  });
});


//SELECT ALLE Einträge
app.get('/Eintraege', (req, res) => {
  let sql = `Select Eintrag from Tagebuch`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Einträge geladen');
    return res.json({
      data: result
    });
  });
});



//Select Einträge Kategorie Schwarzmaler
app.get('/Schwarzmaler', (req, res) => {
  let sql = `Select * from Tagebuch where KID =1`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Einträge Schwarzmaler  geladen');
    return res.json({
      data: result
    });
  });
});

//Select Einträge Kategorie Get a Mate
app.get('/GetaMate', (req, res) => {
  let sql = `Select * from Tagebuch where KID =2`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Einträge Get a Mate geladen');
    return res.json({
      data: result
    });
  });
});

//Select Einträge Kategorie Dr.Chaos
app.get('/DrChaos', (req, res) => {
  let sql = `SELECT * FROM Tagebuch where KID =3`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Einträge Dr. Chaos geladen');
    return res.json({
      data: result
    });
  });
});

//Insert new Eintrag Dr.Chaos
app.get('/DrChaos/add', (req, res) => {
  const { titelnew, eintragnew } = req.query;
  let sql = `INSERT INTO Tagebuch(titel,KID,Eintrag) VALUES ('${titelnew}',3,'${eintragnew}')`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Eintrag zu Dr.Chaos konnte nicht gepusht werden')
    }
    else {
      return res.send('Erfolgreich zu Dr. Choas hinzugefügt')
    }
  })
});


//Insert Allround
app.get('/add', (req, res) => {
  const { titelnew, kid, eintragnew } = req.query;
  let sql = `INSERT INTO Tagebuch(titel,KID,Eintrag) VALUES ('${titelnew}',${kid},'${eintragnew}')`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(kid)
      console.log('Eintrag Allround konnte nicht gepusht werden')
    }
    else {
      return res.send('Erfolgreich zu Dr. Choas hinzugefügt')
    }
  })
});



//Delete Eintrag 
app.get('/delete', (req, res) => {
  const { id } = req.query;

  let sql = `DELETE from Tagebuch where ID=${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(req.query)
      console.log('Eintrag  konnte nicht gelöschz werden')
    }
    else {
      return res.send('Erfolgreich gelöscht')
    }
  })
});



//Insert new Eintrag Get a Mate
app.get('/GetaMate/add', (req, res) => {
  const { titelnew, eintragnew } = req.query;
  let sql = `INSERT INTO Tagebuch(titel,KID,Eintrag) VALUES ('${titelnew}',2,'${eintragnew}')`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Eintrag zu Get a Mate konnte nicht gepusht werden')
    }
    else {
      return res.send('Erfolgreich zu Get a Mate hinzugefügt')
    }
  })
});

//Insert new Eintrag Schwarzmaler
app.get('/Schwarzmaler/add', (req, res) => {
  const { titelnew, eintragnew } = req.query;
  let sql = `INSERT INTO Tagebuch(titel,KID,Eintrag) VALUES ('${titelnew}',1,'${eintragnew}')`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Eintrag zu Schwarzmaler konnte nicht gepusht werden')
    }
    else {
      return res.send('Erfolgreich zu Schwarzmaler hinzugefügt')
    }
  })
});


//Insert Kontakt-Anfrage
app.get('/Kontakt/add', (req, res) => {
  const { name, vorname, email, telefon, betreff, nachricht } = req.query;
  let sql = `INSERT INTO Anfragen(Name, Vorname, Email, Telefon, Betreff, Nachricht) VALUES('${name}','${vorname}','${email}','${telefon}','${betreff}','${nachricht}')`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Anfrage konnte nicht gepusht werden')
    }
    else {
      return res.send('Erfolgreich hinzugefügt')
    }
  })
});

//Insert neue Kategorie
app.get('/kategorie/add', (req, res) => {
  const { titelkategorie, beschreibungkategorie } = req.query;
  let sql = `INSERT INTO Kategorie (Name, Beschreibung)VALUES('${titelkategorie}','${beschreibungkategorie}')`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log('Kategorie konnte nicht gepusht werden')
    }
    else {
      return res.send(' Kategorie Erfolgreich hinzugefügt')
    }
  })
});


//Hol dir die Kategorie Informationen
app.get('/kategorie/info/:kid', (req, res) => {
  let sql = `Select Name, Beschreibung, KID from Kategorie where KID=${req.params.kid}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Kategorieinformation geladen geladen');
    return res.json({
      data: result
    });
  });
});

// Hol dir alle Kategorien
app.get('/kategorie', (req, res) => {
  let sql = `SELECT Name, KID FROM Kategorie `;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log('Kategoriedaten geladen geladen');
    return res.json({
      data: result
    });
  });
});



app.listen(3001, () => {
  console.log(' Server Started on 3001')
})