const { TwitterApi } = require('twitter-api-v2');
const usernameToCheck = 'imVkohli';

async function isUserOnTwitter(username) {
  const twitterClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAIbOsAEAAAAATQ23qk8de0zJz7qDCyxyOuCB9zw%3DWP37MNMGKSBJF8q8dhbalZBiixeBC006m4tuWgt7q1bp6Zv43V');
  try {

    console.log("----- result before ---")

    // twitterClient.v2.userByUsername("forbethink")
    const user = await twitterClient.v2.userByUsername("forbethink");
    return !!user;
  } catch (error) {
    console.log("--- in else ---", error);
    return false;
  }
}

async function checkUser() {
  const userExists = await isUserOnTwitter(usernameToCheck);

  if (userExists) {
    console.log(`User ${usernameToCheck} exists on Twitter.`);
  } else {
    console.log(`User ${usernameToCheck} does not exist on Twitter.`);
  }
}

checkUser();

