import axios from 'axios';
import pubnub from './pubnubinit';

export const subscribe = (email) => {
  pubnub.subscribe({
    channels: [`channel.${email}`],
    withPresence: true,
  });
};
export const wildcardsubscription = () => {
  pubnub.subscribe({
    channels: ['channel.*'],
    withPresence: true,
  });
};
export const grantPermissions = async (users) => {
  if (users.flag === 'A') {
    const message = await axios({
      method: 'post',
      url: 'http://localhost:3000/pubnubadmin',
      data: {
        id: users.email,
        ttl: users.ttl,
      },
    });
    console.log(message);
    pubnub.setAuthKey(users.email);
    pubnub.setUUID(users.email);
    wildcardsubscription();
  } else {
    const message = await axios({
      method: 'post',
      url: 'http://localhost:3000/pubnubuser',
      data: {
        id: users.email,
        ttl: users.ttl,
      },
    });
    console.log(message);
    pubnub.setAuthKey(users.email);
    pubnub.setUUID(users.email);
    subscribe(users.email);
  }
};
export const publish = async (newMessage, channelName) => {
  try {
    await pubnub.publish({
      message: newMessage,
      channel: channelName,
      sendByPost: false,
      storeInHistory: false,
      meta: {
        cool: 'meta',
      },
    });
    return `publish message to the channel ${channelName}`;
  } catch (e) {
    throw new Error(e);
  }
};
export const signal = async (newMessage, channelName) => {
  try {
    await pubnub.signal({
      message: newMessage,
      channel: channelName,
    });
    return `signal to the channel ${channelName}`;
  } catch (e) {
    throw new Error('unable to signal message');
  }
};
export const addMessageAction = async (action, channelName, timetoken) => {
  try {
    await pubnub.addMessageAction({
      channel: channelName,
      messageTimetoken: timetoken,
      action,
    });
    return `Action added to the channel ${channelName}`;
  } catch (e) {
    throw new Error('unable to add action');
  }
};
export const unsubscribe = () => {
  pubnub.unsubscribeAll();
};
