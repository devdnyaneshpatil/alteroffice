const isValidData = (payload, fields) => {
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!payload.hasOwnProperty(field) || payload[field] === undefined || payload[field] === null || payload[field] === '') {
      return `Missing required field: ${field}`;
    }
  }
  return true;
};

module.exports = isValidData;
