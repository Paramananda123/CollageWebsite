const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ........................................................ HomePage start .................................................
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const pythonProcess = spawn('python3', ['loginPageFinder.py', email, password]);

  let resultData = '';

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    resultData = resultData.trim();
    console.log(`Python exited with code ${code} and result: ${resultData}`);

    if (code === 0 && resultData === 'success') {
      res.send(`
        <script>
          alert('✅ Login Successful!');
          window.location.href = '/about.html';
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert('❌ Invalid Credentials. Please register first.');
          window.location.href = '/';
        </script>
      `);
    }
  });
});
// .................. Google Users start ............... //
app.post("/google-login", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const firstName = payload.given_name;
    const lastName = payload.family_name;
    const email = payload.email;

    console.log("Google user:", firstName, lastName, email); 

    const python = spawn("python3", ["InsertGoogleUser.py", firstName, lastName, email]);

    python.stdout.on("data", (data) => {
      console.log(`PYTHON STDOUT: ${data.toString()}`); 
    });

    python.stderr.on("data", (data) => {
      console.error(`PYTHON ERROR: ${data.toString()}`); 
    });

    python.on("close", (code) => {
      console.log(`Python exited with code ${code}`);
      res.send("✅ Google login processed.");
    });

  } catch (err) {
    console.error("Google login failed", err);
    res.status(500).send("Login failed.");
  }
});
// .................. Google Users start ............... //
// ........................................................ HomePage end .................................................


// ........................................................ Register page start .................................................
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reg.html'));
});

app.post('/register', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender
  } = req.body;

  const pythonProcess = spawn('python3', [
    'registerPage.py',
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender
  ]);

  let pythonOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    pythonOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python exited with code ${code}`);
    console.log(`Output: ${pythonOutput}`);

    if (pythonOutput.includes("User data inserted successfully")) {
      res.redirect('/register?success=1');
    } else if (pythonOutput.includes("Email already registered")) {
      res.send(`
        <h2>❌ Registration failed: Email already registered.</h2>
        <a href="/register">⬅ Go back</a>
      `);
    } else {
      res.send(`
        <h2>❌ Registration failed. Please try again.</h2>
        <pre>${pythonOutput}</pre>
        <a href="/register">⬅ Go back</a>
      `);
    }
  });
});
// ........................................................ Register page end .................................................

//....................................................... Contact ...........................................................//
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.post('/contact', (req, res) => {
  const { full_name, email_id, message } = req.body;

  const python = spawn('python3', ['store_contact.py', full_name, email_id, message]);

  python.stdout.on('data', (data) => {
    console.log(`Python says: ${data}`);
  });

  python.stderr.on('data', (data) => {
    console.error(`Python error: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.send(`
        <script>
          alert('✅ Message sent successfully!');
          window.location.href = '/contact';
        </script>
      `);
    } else {
      res.send(`
        <script>
          alert('❌ Failed to send message. Try again later.');
          window.location.href = '/contact';
        </script>
      `);
    }
  });
});
// .......................... For Sending Mail ........................... //
app.post('/contact', (req, res) => {
  const python = spawn('python3', ['SendMessageNewUser.py', email_id, full_name, message]);

  python.stdout.on('data', (data) => {
    console.log(`Python stdout: ${data}`);
  });

  python.stderr.on('data', (data) => {
    console.error(`Python stderr: ${data}`);
  });

  python.on('close', (code) => {
    if (code === 0) {
      res.send({ status: 'success', message: 'Email sent successfully!' });
    } else {
      res.status(500).send({ status: 'error', message: 'Failed to send email.' });
    }
  });
});

// .......................... For Sending Mail ........................... //
//....................................................... Contact end...........................................................//

app.listen(PORT, () => {
  console.log(✅ Server running at http://localhost:${PORT});
});
