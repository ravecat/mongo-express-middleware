export const callback = function(req, res, next) {
  res.status(200).send(res.data);
};
