const API_KEY = "d4ed4376b5f06d850d02691c98ec5162";

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTrending: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTrending: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchTrending: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchTrending: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchTrending: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchTrending: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchTrending: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
}

export default requests;
