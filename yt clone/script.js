const API = "http://localhost:5000/api/videos";

// Demo videos (make sure this exists)
const demoVideos = [
  { title: "🔥 INSANE Gaming Highlights", channel: "ProGamer", views: 1200345, duration: "12:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🎵 Chill Lofi Beats", channel: "Lofi Hub", views: 845223, duration: "2:10:20", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "😂 Try Not To Laugh", channel: "FunZone", views: 2300456, duration: "10:12", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🚀 Space Documentary", channel: "ScienceX", views: 567890, duration: "18:33", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "⚽ Football Skills 2026", channel: "Sports TV", views: 999999, duration: "8:55", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },

  { title: "💻 Learn JavaScript Fast", channel: "CodeFast", views: 340000, duration: "10:01", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "📱 Best Mobile Games", channel: "GameHub", views: 780000, duration: "9:40", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🎬 Movie Trailer HD", channel: "CinemaWorld", views: 2100000, duration: "2:30", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🍔 Street Food India", channel: "Foodie", views: 450000, duration: "11:22", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🎧 Top Songs 2026", channel: "MusicZone", views: 890000, duration: "15:00", videoUrl: "https://www.w3schools.com/html/movie.mp4" },

  { title: "🧠 Brain Tricks", channel: "MindBlown", views: 610000, duration: "7:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🚗 Supercar Review", channel: "AutoX", views: 530000, duration: "13:20", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🎮 Minecraft Survival", channel: "BlockMaster", views: 1200000, duration: "25:10", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🏀 NBA Moments", channel: "SportsZone", views: 770000, duration: "9:55", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "📸 Photography Tips", channel: "PhotoPro", views: 310000, duration: "6:30", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },

  { title: "🧑‍💻 Coding Setup Tour", channel: "DevLife", views: 290000, duration: "8:10", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🌍 Travel Vlog Bali", channel: "TravelNow", views: 650000, duration: "14:40", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🎤 Live Concert", channel: "MusicLive", views: 2000000, duration: "1:05:00", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🧩 Puzzle Challenge", channel: "ThinkFast", views: 180000, duration: "5:25", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🐶 Cute Dogs", channel: "PetWorld", views: 3000000, duration: "12:00", videoUrl: "https://www.w3schools.com/html/movie.mp4" },

  { title: "🎯 PUBG Pro Tips", channel: "BattleZone", views: 880000, duration: "11:11", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "📦 Unboxing iPhone", channel: "TechGuru", views: 1400000, duration: "9:30", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🎨 Drawing Tutorial", channel: "ArtMaster", views: 390000, duration: "7:20", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🏝️ Maldives Travel", channel: "Wanderlust", views: 720000, duration: "13:00", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🎓 Study Tips", channel: "SmartStudent", views: 260000, duration: "6:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },

  { title: "⚡ Speedrun Challenge", channel: "FastPlay", views: 510000, duration: "8:15", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🎮 GTA Funny Moments", channel: "GameFun", views: 980000, duration: "10:05", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🍕 Pizza Making", channel: "ChefPro", views: 430000, duration: "9:00", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
  { title: "🎧 EDM Mix 2026", channel: "DJ Beats", views: 1500000, duration: "30:00", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { title: "🏋️ Workout Routine", channel: "FitLife", views: 620000, duration: "12:30", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
];
// Load videos
function loadVideos() {
  displayVideos(demoVideos);
}

// Display videos
function displayVideos(videos) {
  const container = document.getElementById("videos");
  container.innerHTML = "";

  videos.forEach((video, index) => {
    const div = document.createElement("div");
    div.className = "video-card";

    div.innerHTML = `
      <div class="thumbnail" onclick="openVideo(${index})">
        <img src="https://picsum.photos/400/230?random=${index}">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <img class="channel-logo" src="https://i.pravatar.cc/40?img=${index}">
        <div>
          <h4>${video.title}</h4>
          <p class="channel">${video.channel}</p>
          <p class="meta">👁 ${formatViews(video.views)} views • ${randomDays()} days ago</p>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

// Format views
function formatViews(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
}

// Random upload time
function randomDays() {
  return Math.floor(Math.random() * 30) + 1;
}

// Open video page
function openVideo(index) {
  const v = demoVideos[index];

  const url = `watch.html?title=${encodeURIComponent(v.title)}
&channel=${encodeURIComponent(v.channel)}
&views=${v.views}
&videoUrl=${encodeURIComponent(v.videoUrl)}`;

  window.location.href = url;
}

// Search
function searchVideos() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = demoVideos.filter(v =>
    v.title.toLowerCase().includes(query)
  );

  displayVideos(filtered);
}

// Start
loadVideos();