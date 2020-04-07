import PubNub from 'pubnub';

const pubnub = new PubNub({
  subscribeKey: 'sub-c-c4482926-7984-11ea-9770-0a12e0cf0d6e',
  publishKey: 'pub-c-766f0388-8e3c-4b8a-952e-9679734077e8',
  ssl: true,
});

export default pubnub;

// message: function (m) {
//     const channelName = m.channel;
//     let channelGroup = m.subscription;
//     let pubTT = m.timetoken;
//     let msg = m.message;
//     console.log(msg);
//     const publisher = m.publisher;
//   },
//   messageAction: function (ma) {
//     let channelName = ma.channel;
//     let publisher = ma.publisher;
//     let event = ma.message.event;
//     let type = ma.message.data.type;
//     let value = ma.message.data.value;
//     let messageTimetoken = ma.message.data.messageTimetoken;
//     let actionTimetoken = ma.message.data.actionTimetoken;
//   },
//   presence: function (p) {
//     console.log(p);
//     let action = p.action;
//     let channelName = p.channel;
//     let occupancy = p.occupancy;
//     let state = p.state;
//     let channelGroup = p.subscription;
//     let publishTime = p.timestamp;
//     let timetoken = p.timetoken;
//     let uuid = p.uuid;
//   },
//   signal: function (s) {
//     let channelName = s.channel;
//     let channelGroup = s.subscription;
//     let pubTT = s.timetoken;
//     let msg = s.message;
//     let publisher = s.publisher;
//   },
