export default function reading(req, res) {
  fetch('https://oku.club/api/collections/user/jadann/reading?format=json')
  .then(r => r.json())
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    res.json({
      error: err.message
    });
  });
}
