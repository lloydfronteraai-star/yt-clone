// Get current video data
const params = new URLSearchParams(window.location.search);

const title = params.get("title");
const channel = params.get("channel");
const views = params.get("views");
const videoUrl = params.get("videoUrl");

// Set main video
document.getElementById("player").src = videoUrl;
document.getElementById("title").innerText = title;
document.getElementById("channel").innerText = channel;
document.getElementById("views").innerText = "👁 " + formatViews(views) + " views";

// 🎥 Demo videos
const demoVideos = [
  { title: "🔥 INSANE Gaming Highlights", channel: "ProGamer", views: 1200345 },
  { title: "🎵 Chill Lofi Beats", channel: "Lofi Hub", views: 845223 },
  { title: "😂 Try Not To Laugh", channel: "FunZone", views: 2300456 },
  { title: "🚀 Space Documentary", channel: "ScienceX", views: 567890 },
  { title: "⚽ Football Skills", channel: "Sports TV", views: 999999 },
  { title: "💻 Learn JavaScript", channel: "CodeFast", views: 340000 },
  { title: "🎮 Minecraft Survival", channel: "BlockMaster", views: 1200000 }
];

// Show recommendations
const container = document.getElementById("recommendations");

demoVideos.forEach((video, index) => {
  const div = document.createElement("div");
  div.className = "rec-video";

  div.innerHTML = `
    <img src="https://picsum.photos/200/120?random=${index}">
    <div class="rec-info">
      <h4>${video.title}</h4>
      <p>${video.channel}</p>
      <p>👁 ${formatViews(video.views)}</p>
    </div>
  `;

  div.onclick = () => {
    const url = `watch.html?title=${encodeURIComponent(video.title)}
&channel=${encodeURIComponent(video.channel)}
&views=${video.views}
&videoUrl=https://www.w3schools.com/html/mov_bbb.mp4`;

    window.location.href = url;
  };

  container.appendChild(div);
});

// Format views
function formatViews(num) {
  num = Number(num);
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
}

// ================== LIKE SYSTEM ==================
let liked = false;
let likeCount = Math.floor(Math.random() * 10000);

const likeBtn = document.getElementById("likeBtn");
const likeCountEl = document.getElementById("likeCount");

likeCountEl.innerText = likeCount;

likeBtn.onclick = () => {
  liked = !liked;

  if (liked) {
    likeCount++;
    likeBtn.classList.add("liked");
  } else {
    likeCount--;
    likeBtn.classList.remove("liked");
  }

  likeCountEl.innerText = likeCount;
};

// ================== SUBSCRIBE ==================
let subscribed = false;

const subBtn = document.getElementById("subBtn");

subBtn.onclick = () => {
  subscribed = !subscribed;

  if (subscribed) {
    subBtn.innerText = "✅ Subscribed";
    subBtn.classList.add("subscribed");
  } else {
    subBtn.innerText = "🔔 Subscribe";
    subBtn.classList.remove("subscribed");
  }
};

// ================== COMMENTS ==================
const videoKey = "comments_" + title;
let comments = JSON.parse(localStorage.getItem(videoKey)) || [];

const commentsList = document.getElementById("commentsList");

// Render comments
function renderComments() {
  commentsList.innerHTML = "";

  const user = JSON.parse(localStorage.getItem("user"));

  comments.forEach((c, index) => {
    const div = document.createElement("div");
    div.className = "comment";

    div.innerHTML = `
      <img src="https://i.pravatar.cc/35?img=${index}" width="35">
      <div class="comment-content">
        <p><strong>${user ? user.username : "Guest"}</strong></p>
        <p>${c}</p>
      </div>
    `;

    commentsList.appendChild(div);
  });
}

// Add comment
function addComment() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first!");
    window.location.href = "auth.html";
    return;
  }

  const input = document.getElementById("commentText");
  const text = input.value.trim();

  if (!text) return;

  comments.push(text);
  localStorage.setItem(videoKey, JSON.stringify(comments));

  input.value = "";
  renderComments();
}

// Load comments on start
renderComments();