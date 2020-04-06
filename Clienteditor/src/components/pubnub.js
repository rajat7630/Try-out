import PubNub from 'pubnub';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-89808d60-77cc-11ea-9e80-76ec259d9e4f',
  publishKey: 'pub-c-ef9257aa-4007-40b4-b2b8-41db8ac1f880',
  uuid: 'sec-c-OWM4OWQyNTctZGI5ZC00ZTI2LTkxZjItY2Y0MGU5Nzc0YWI3',
  ssl: true,
}); //  Your PubNub keys here. Get them from https://dashboard.pubnub.com.

export default pubnub;
