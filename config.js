import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import {
    fromCognitoIdentityPool,
} from "@aws-sdk/credential-provider-cognito-identity";
import { Polly } from "@aws-sdk/client-polly";
import { getSynthesizeSpeechUrl } from "@aws-sdk/polly-request-presigner";

// Polly client configuration
const client = new Polly({
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: "us-east-1" }),
      identityPoolId: "IDENTITY_POOL_ID" //Replace identity pool id here
  }),
});

// Set the parameters
let speechParams = {
  OutputFormat: "mp3",
  SampleRate: "22050",
  Text: "Hello David, How are you?",
  TextType: "text",
  VoiceId: "Kimberly" 
};

export async function speakText() {

  // Update the Text parameter with the text entered by the user
  speechParams.Text = document.getElementById("textEntry").value;
  try{
      let url = await getSynthesizeSpeechUrl({
          client, params: speechParams
      }); 
      console.log(url);
      // Load the URL of the voice recording into the browser
      document.getElementById('audioSource').src = url;
      document.getElementById('audioPlayback').load();
      document.getElementById('result').innerHTML = "Speech ready to play.";
  } catch (err) {
      console.log("Error", err);
      document.getElementById('result').innerHTML = err;
  }
};