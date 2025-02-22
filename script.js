const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your API key

document.getElementById('getThumbnail').addEventListener('click', function () {
  const videoUrl = document.getElementById('videoUrl').value;
  const videoId = extractVideoId(videoUrl);

  if (videoId) {
    // Fetch video details (including tags)
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const tags = data.items[0].snippet.tags || [];
        displayThumbnails(videoId);
        displayTags(tags);
      })
      .catch(error => {
        console.error('Error fetching video details:', error);
        alert('Failed to fetch video details. Please try again.');
      });
  } else {
    alert('Invalid YouTube URL');
  }
});

function displayThumbnails(videoId) {
  const qualities = [
    { name: 'Highest Quality (1280x720)', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
    { name: 'High Quality (640x480)', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
    { name: 'Medium Quality (480x360)', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { name: 'Standard Quality (320x180)', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    { name: 'Low Quality (120x90)', url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
  ];

  const thumbnailContainer = document.getElementById('thumbnailContainer');
  const thumbnailImage = document.getElementById('thumbnailImage');
  const downloadLinks = document.getElementById('downloadLinks');

  // Display the highest quality thumbnail
  thumbnailImage.src = qualities[0].url;

  // Clear previous download links
  downloadLinks.innerHTML = '';

  // Add download links for all qualities
  qualities.forEach(quality => {
    const link = document.createElement('a');
    link.href = quality.url;
    link.textContent = quality.name;
    link.download = `thumbnail_${videoId}_${quality.name.split(' ')[0]}.jpg`;
    link.style.display = 'block';
    link.style.marginTop = '10px';
    link.style.color = '#007bff';
    link.style.textDecoration = 'none';
    downloadLinks.appendChild(link);
  });

  // Show the container
  thumbnailContainer.style.display = 'block';
}

function displayTags(tags) {
  const tagsContainer = document.getElementById('tagsContainer');
  tagsContainer.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
}

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
