const videoSection=document.querySelector("#ytplayer");

fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=1&playlistId=PLXLKdYUB-ACLTJJ8pJwnE2xb159JOHfar&key=AIzaSyCAyX63BR9_5XS8jFhXxV4doIGhvajcZ7c
`).then (res => res.json())
.then(data=>{

    data.items.forEach(el =>{
    videoSection.innerHTML += `

    <a target= "_blank" href="https://youtube.com/watch?v=${el.snippet.resourceId.videoId}" 
    class="yt-video">
        <img src="${el.snippet.thumbnails.maxres.url}" alt="">
        <h3>${el.snippet.title}</h3>
    </a>`
    });
    console.log(data.items[0]);
})

