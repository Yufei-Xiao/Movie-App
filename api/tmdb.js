export default async function handler(req, res) {
  const { path } = req.query; // e.g. "movie/550"
  const token = process.env.TMDB_API_KEY; // private

  const response = await fetch(`https://api.themoviedb.org/3/${path}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();
  res.status(200).json(data);
  console.log("TMDB token length:", process.env.TMDB_API_KEY?.length);

}

