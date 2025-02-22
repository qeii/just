document.getElementById('getThumbnail').addEventListener('click', function () {
  const videoUrl = document.getElementById('videoUrl').value;
  const videoId = extractVideoId(videoUrl);

  if (videoId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    document.getElementById('thumbnailImage').src = thumbnailUrl;
    document.getElementById('downloadLink').href = thumbnailUrl;
    document.getElementById('thumbnailContainer').style.display = 'block';
  } else {
    alert('Invalid YouTube URL');
  }
});

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

document.getElementById('resetButton').addEventListener('click', function () {
  document.getElementById('videoUrl').value = ''; // Clear input
  document.getElementById('thumbnailContainer').style.display = 'none'; // Hide result
  document.getElementById('thumbnailImage').src = ''; // Reset thumbnail image
  document.getElementById('downloadLink').href = '#'; // Reset download link
});
