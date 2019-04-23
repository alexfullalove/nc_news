exports.formatDate = data => {
  return data.map(obj => {
    newObj = { ...obj };
    const timestamp = obj["created_at"];
    const humanTime = new Date(timestamp);
    newObj["created_at"] = `${humanTime}`;
    return newObj;
  });
};

exports.createRef = (array, key, value) => {
  return array.reduce((refObj, element) => {
    refObj[element[key]] = element[value];
    return refObj;
  }, {});
};
exports.formatData = (data, keyToChange, newKey, refObj) => {
  return data.map(obj => {
    newObj = { ...obj };
    newObj[newKey] = refObj[newObj[keyToChange]];
    delete newObj[keyToChange];
    return newObj;
  });
};
