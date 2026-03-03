const reels = [
  {
    username: "arjun.codes",
    likeCount: 12453,
    isLiked: false,
    commentCount: 342,
    caption: "Building my first AI project 🚀 #coding #developer",
    video: "./videos/video1.mp4",
    userProfile: "./pictures/picture1.jpg",
    shareCount: 89,
    isFollowed: true,
  },
  {
    username: "priya.designs",
    likeCount: 9821,
    isLiked: true,
    commentCount: 210,
    caption: "UI/UX makes everything better ✨ #designlife",
    video: "./videos/video2.mp4",
    userProfile: "./pictures/picture2.jpg",
    shareCount: 54,
    isFollowed: false,
  },
  {
    username: "travelwithkabir",
    likeCount: 45231,
    isLiked: false,
    commentCount: 1203,
    caption: "Sunsets hit different in Goa 🌅",
    video: "./videos/video3.mp4",
    userProfile: "./pictures/picture3.jpg",
    shareCount: 410,
    isFollowed: false,
  },
  {
    username: "fitness.by.ananya",
    likeCount: 18765,
    isLiked: true,
    commentCount: 876,
    caption: "Consistency > Motivation 💪 #fitness",
    video: "./videos/video4.mp4",
    userProfile: "./pictures/picture4.jpg",
    shareCount: 233,
    isFollowed: true,
  },
  {
    username: "techwithrahul",
    likeCount: 23112,
    isLiked: false,
    commentCount: 645,
    caption: "Top 3 JavaScript tricks you should know ⚡",
    video: "./videos/video5.mp4",
    userProfile: "./pictures/picture5.jpg",
    shareCount: 178,
    isFollowed: false,
  },
  {
    username: "foodie.sana",
    likeCount: 15432,
    isLiked: true,
    commentCount: 532,
    caption: "Best street food in Kolkata 😋",
    video: "./videos/video6.mp4",
    userProfile: "./pictures/picture6.jpg",
    shareCount: 95,
    isFollowed: true,
  },
  {
    username: "dev.sidd",
    likeCount: 7654,
    isLiked: false,
    commentCount: 121,
    caption: "Grinding DSA daily 🔥 #100DaysOfCode",
    video: "./videos/video7.mp4",
    userProfile: "./pictures/picture7.jpg",
    shareCount: 34,
    isFollowed: false,
  },
  {
    username: "nature.diaries",
    likeCount: 33456,
    isLiked: true,
    commentCount: 980,
    caption: "Peace begins with nature 🌿",
    video: "./videos/video8.mp4",
    userProfile: "./pictures/picture8.jpg",
    shareCount: 276,
    isFollowed: true,
  },
  {
    username: "startup.talks",
    likeCount: 20123,
    isLiked: false,
    commentCount: 412,
    caption: "Building a product-based startup in India 🇮🇳",
    video: "./videos/video9.mp4",
    userProfile: "./pictures/picture9.jpg",
    shareCount: 143,
    isFollowed: false,
  },
  {
    username: "musicvibes",
    likeCount: 54321,
    isLiked: true,
    commentCount: 1520,
    caption: "Late night acoustic sessions 🎸",
    video: "./videos/video10.mp4",
    userProfile: "./pictures/picture10.jpg",
    shareCount: 502,
    isFollowed: true,
  },
];

var allReels = document.querySelector(".all-reels");
var follow = document.querySelector(".all-reels .reel .bottom .user button");
var sum = "";

reels.forEach(function (elem) {
  // if (elem.isFollowed) {

  // }
  sum =
    sum +
    `<div class="reel">
            <video class="main-video"
                src=${elem.video} 
                autoplay 
                loop 
                muted
                playsinline>
            </video>
            <div class="bottom">
              <div class="user">
                <img src=${elem.userProfile} alt="" />
                <h4>${elem.username}</h4>
                <button>${elem.isFollowed ? "Unfollow" : "Follow"}</button>
              </div>
              <h3>${elem.caption}</h3>
            </div>
            <div class="right">
              <div class="like">
                <h4 class="like-icon icon">${elem.isLiked?'<i class="love ri-heart-3-fill"></i>':'<i class="ri-heart-3-line"></i>'}
                </h4>
                <h6>${elem.likeCount}</h6>
              </div>
              <div class="comment">
                <h4 class="comment-icon icon"><i class="ri-chat-3-line"></i></h4>
                <h6>${elem.commentCount}</h6>
              </div>
              <div class="share">
                <h4 class="share-icon icon">
                  <i class="ri-share-forward-line"></i>
                </h4>
                <h6>${elem.shareCount}</h6>
              </div>
              <div class="menu">
                <h4 class="menu-icon icon"><i class="ri-more-2-fill"></i></h4>
              </div>
            </div>
          </div>`;
});

allReels.innerHTML = sum;
