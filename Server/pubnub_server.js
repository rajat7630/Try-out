const PubNub = require('pubnub');

const pubnub = new PubNub({
  subscribeKey: 'sub-c-89808d60-77cc-11ea-9e80-76ec259d9e4f',
  publishKey: 'pub-c-ef9257aa-4007-40b4-b2b8-41db8ac1f880',
  secretKey: 'sec-c-OWM4OWQyNTctZGI5ZC00ZTI2LTkxZjItY2Y0MGU5Nzc0YWI3',
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
