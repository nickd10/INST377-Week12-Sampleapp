const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const { isValidStateAbbreviation } = require('usa-state-validator');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/Week12-Customers.html', { root: __dirname });
  });

app.get('/customers', async (req, res) => {
  console.log('Fetching customers...');

  const { data, error } = await supabase.from('customer').select()
  console.log(error);


  console.log(data);
  if (error) {
    console.log(`Error: ${error}`)
    res.send(error)
  } else { 
    console.log("About to send");
    res.send(data);
  }
});

app.post('/customer', async (req, res) => {
  console.log('Adding customer...');

  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const state = req.body.state;

  if(!isValidStateAbbreviation(state)) {
    console.error(`State ${state} is not valid`);
    res.header('Content-Type', 'application/json');
    const errorJson = {
      'messgae': `State ${state} is not valid`,
    }

    res.send(JSON.stringify(errorJson));
    return;
  }

  const { data, error } = await supabase
  .from('customer')
  .insert({ customer_first_name: firstName, customer_last_name: lastName, customer_state: state })
  .select()


  if (error) {
    console.log(`Error: ${error}`)
    res.send(error)
  }
  res.send(data);

});

app.listen(port, () => {
  console.log('Server is running at', port);
});