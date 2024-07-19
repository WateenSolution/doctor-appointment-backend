const complaintTemplate = (data) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 20px;
          }
  
          /* header {
              text-align: center;
              padding: 10px;
              background-color: #007bff;
              color: #fff;
          } */
  
          .container {
              max-width: 600px;
              margin: 20px auto;
              border: 1px solid #ddd;
              background-color: #f9f9f9;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
                color: #224c8b;
              text-align: center; 
              margin-bottom: 40px;
          }
  
          p {
              margin-bottom: 5px;
              text-align: left;
              color: #333333; 
              font-size: 14px;
           
          }
  
          strong {
              font-weight: bold;
          }
  
          footer {
              text-align: center;
              margin-top: 20px;
              padding: 10px;
              background-color: #007bff;
              color: #fff;
          }
      </style>
  </head>
  <body>
     
      <div class="container">
          <h1><strong>${data.header}</h1>
          <p><strong>Station Name:</strong> ${data.station_name}</p>
          <p><strong>Priority:</strong> ${data.priority}</p>
          <p><strong>Phone Number:</strong> ${data.phone_number}</p>
          <p><strong>Title:</strong> ${data.title}</p>
          <p><strong>Description:</strong> ${data.description}</p>
      </div>
  
      <!-- <footer>
          &copy; 2024 Your Company Name. All rights reserved.
      </footer> -->
  </body>
  </html>
  `;
};

const referralTemplate = (data) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 20px;
            }
    
            /* header {
                text-align: center;
                padding: 10px;
                background-color: #007bff;
                color: #fff;
            } */
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                border: 1px solid #ddd;
                background-color: #f9f9f9;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                  color: #224c8b;
                text-align: center; 
                margin-bottom: 40px;
            }
    
            p {
                margin-bottom: 5px;
                text-align: left;
                color: #333333; 
                font-size: 14px;
             
            }
    
            strong {
                font-weight: bold;
            }
    
            footer {
                text-align: center;
                margin-top: 20px;
                padding: 10px;
                background-color: #007bff;
                color: #fff;
            }
        </style>
    </head>
    <body>
       
        <div class="container">
            <h1><strong>${data.header}</h1>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone Number:</strong> ${data.phone_number}</p>
            <p><strong>Description:</strong> ${data.description}</p>
        </div>
    
        <!-- <footer>
            &copy; 2024 Your Company Name. All rights reserved.
        </footer> -->
    </body>
    </html>
    `;
};

module.exports = { complaintTemplate, referralTemplate };
