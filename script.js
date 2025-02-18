function fetchThumbnail() {
  const url = document.getElementById('url').value;
  const videoId = url.match(/v=([^&]+)/)[1];
  const thumbnailContainer = document.getElementById('thumbnail-container');

  if (videoId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    thumbnailContainer.innerHTML = `
      <img src="${thumbnailUrl}" alt="YouTube Thumbnail">
      <br>
      <a href="${thumbnailUrl}" download>Download Thumbnail</a>
      ;
  } else {
      thumbnailContainer.innerHTML = '<p>Invalid YouTube URL</p>';
  }
}
