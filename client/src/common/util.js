export const getConvertedFormData = (jsonObject) => {
  var form_data = new FormData();

  for (var key in jsonObject) {
    form_data.append(key, jsonObject[key]);
  }
  return form_data;
};
