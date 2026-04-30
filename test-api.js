const axios = require('axios');

async function test() {
  try {
    console.log("Testing search parameter...");
    const res = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/', {
      params: { search: 'spacex' }
    });
    console.log("Results with 'search':", res.data.count);

    console.log("Testing title_contains parameter...");
    const res2 = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/', {
      params: { title_contains: 'spacex' }
    });
    console.log("Results with 'title_contains':", res2.data.count);
  } catch (err) {
    console.error(err.message);
  }
}
test();
