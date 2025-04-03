import { 
    DynamoDBClient, 
    QueryCommand,
    PutItemCommand, 
    UpdateItemCommand, 
    DeleteItemCommand 
  } from "@aws-sdk/client-dynamodb";
  import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
  import crypto from 'crypto';
  import jwt from 'jsonwebtoken';
  
  // Initialize AWS services
  const dynamoDB = new DynamoDBClient({ region: "af-south-1" }); // Change region as needed
  const ses = new SESClient({ region: "af-south-1" });
  
  // Table names
  const USERS_TABLE = 'syneo-task-management-Users';
  const VERIFICATION_CODES_TABLE = 'syneo-task-management-Verification-code';
  
  // JWT secret (use AWS Secrets Manager in production)
  const JWT_SECRET = 'Y29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ3lvdXItc2VjcmV0LWtleSc7';
  
  export const handler = async (event) => {
    try {
      const path = event.path;
  
      console.log('Request:', {
        path,
        method: event.httpMethod,
        body: event.body
      });
  
      switch (path) {
        case '/auth/register':
          return await handleRegister(event);
        case '/auth/verify-code':
          return await handleVerifyCode(event);
        case '/auth/login':
          return await handleLogin(event);
        default:
          return formatResponse(404, { success: false, message: 'Endpoint not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      return formatResponse(500, { success: false, message: 'Internal server error' });
    }
  };
  
  // 🔹 Handle User Registration
  async function handleRegister(event) {
    const { firstName, lastName, email, password } = JSON.parse(event.body);
  
    if (!firstName || !lastName || !email || !password) {
      return formatResponse(400, { success: false, message: 'All fields are required' });
    }
  
    // 🔹 Check if the user already exists
    const userCheck = await dynamoDB.send(new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-userId-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      }
    }));
    
    if (userCheck.Items && userCheck.Items.length > 0) {
      return formatResponse(409, { success: false, message: "User already exists" });
    }
  
    const verificationCode = generateVerificationCode();
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const userId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
  
    await dynamoDB.send(new PutItemCommand({
      TableName: USERS_TABLE,
      Item: {
        userId: { S: userId },
        email: { S: email },
        firstName: { S: firstName },
        lastName: { S: lastName },
        password: { S: hashedPassword },
        verified: { BOOL: false },
        createdAt: { S: timestamp },
        updatedAt: { S: timestamp }
      }
    }));
  
    await dynamoDB.send(new PutItemCommand({
      TableName: VERIFICATION_CODES_TABLE,
      Item: {
        email: { S: email },
        code: { S: verificationCode },
        expiresAt: { N: (Math.floor(Date.now() / 1000) + 3600).toString() },
        createdAt: { S: timestamp }
      }
    }));
  
    await sendVerificationEmail(email, verificationCode, firstName);
  
    return formatResponse(201, { success: true, message: 'User registered. Check your email for verification code.' });
  }
  
  // 🔹 Handle Email Verification
  async function handleVerifyCode(event) {
    const { email, code } = JSON.parse(event.body);
  
    if (!email || !code) {
      return formatResponse(400, { success: false, message: 'Email and code are required' });
    }
  
    // 🔹 Check if the user exists
    const userResult = await dynamoDB.send(new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-userId-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      }
    }));
  
    if (!userResult.Items || userResult.Items.length === 0) {
      return formatResponse(404, { success: false, message: 'User not found' });
    }
  
    const user = userResult.Items[0];
    if (user.verified.BOOL) {
      return formatResponse(200, { success: true, message: 'Account already verified' });
    }
  
    // 🔹 Check verification code
    const codeResult = await dynamoDB.send(new QueryCommand({
      TableName: VERIFICATION_CODES_TABLE,
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      }
    }));
  
    if (!codeResult.Items || codeResult.Items[0].code.S !== code) {
      return formatResponse(400, { success: false, message: 'Invalid or expired verification code' });
    }
  
    await dynamoDB.send(new UpdateItemCommand({
      TableName: USERS_TABLE,
      Key: { email: { S: email } },
      UpdateExpression: 'SET verified = :verified, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':verified': { BOOL: true },
        ':updatedAt': { S: new Date().toISOString() }
      }
    }));
  
    await dynamoDB.send(new DeleteItemCommand({
      TableName: VERIFICATION_CODES_TABLE,
      Key: { email: { S: email } }
    }));
  
    return formatResponse(200, { success: true, message: 'Email verified successfully. You can now login.' });
  }
  
  // 🔹 Handle User Login
  async function handleLogin(event) {
    const { email, password } = JSON.parse(event.body);
  
    if (!email || !password) {
      return formatResponse(400, { success: false, message: 'Email and password are required' });
    }
  
    // 🔹 Retrieve user details
    const userResult = await dynamoDB.send(new QueryCommand({
      TableName: USERS_TABLE,
      IndexName: "email-userId-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email }
      }
    }));
  
    if (!userResult.Items || userResult.Items.length === 0) {
      return formatResponse(401, { success: false, message: 'Invalid credentials' });
    }
  
    const user = userResult.Items[0];
    if (crypto.createHash('sha256').update(password).digest('hex') !== user.password.S) {
      return formatResponse(401, { success: false, message: 'Invalid credentials' });
    }
  
    if (!user.verified.BOOL) {
      return formatResponse(403, { success: false, message: 'Account not verified' });
    }
  
    const token = jwt.sign(
      { user: { email, firstName: user.firstName.S, lastName: user.lastName.S } },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
  
    return formatResponse(200, { success: true, token });
  }
  
  // 🔹 Send Verification Email
  async function sendVerificationEmail(email, code, firstName) {
    const params = {
      Source: "your-verified-email@example.com",
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: "Verify Your Account" },
        Body: {
          Html: {
            Data: `<p>Hi ${firstName}, use the following code to verify your account: <strong>${code}</strong></p>`
          }
        }
      }
    };
  
    await ses.send(new SendEmailCommand(params));
  }
  
  // 🔹 Utility Functions
  function formatResponse(statusCode, body) {
    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(body)
    };
  }
  
  function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  