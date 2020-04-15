const PubNub = require('pubnub');

const pubnub = new PubNub({
  subscribeKey: 'sub-c-c4482926-7984-11ea-9770-0a12e0cf0d6e',
  publishKey: 'pub-c-766f0388-8e3c-4b8a-952e-9679734077e8',
  secretKey: 'sec-c-MGJjYzgxNzEtZjc5NC00MjI1LTkwN2MtYWU2M2Q3ZWI4NTU3',
});

const userExists = async (user) => {
  try {
    const response = await pubnub.getUser({
      userId: user.email,
      include: {
        customFields: true,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const grantPermissionForAdmin = async (id, time) => {
  try {
    await pubnub.grant({
      channels: ['channel.*', 'channel.*-pnpres'],
      authKeys: [id],
      ttl: time,
      read: true,
      write: true,
      delete: true,
    });
    return 'permission granted Successfully';
  } catch (e) {
    throw new Error('unable to grant Permission');
  }
};

const grantPermissionForUser = async (id, time) => {
  try {
    await pubnub.grant({
      channels: [`channel.${id}`, `channel.${id}-pnpres`],
      authKeys: [id],
      ttl: time,
      read: true,
      write: true,
    });
    return 'permission granted Successfully';
  } catch (e) {
    throw new Error('unable to grant Permission');
  }
};

const createUser = async (user) => {
  try {
    await pubnub.createUser({
      id: user.email,
      name: user.name,
      profileUrl: user.profileUrl,
      email: user.email,
    });

    return 'User Created Successfully';
  } catch (e) {
    throw new Error('unable to create User');
  }
};
module.exports = {
  createUser,
  userExists,
  grantPermissionForUser,
  grantPermissionForAdmin,
};
