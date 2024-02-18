var song = "";
var LeftWristX = 0;
var LeftWristY = 0;
var RightWristX = 0;
var RightWristY = 0;
var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload(){
    song=loadSound("music.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);

    if(scoreLeftWrist > 0.1){
        fill("red");
    stroke("red");
    circle(LeftWristX, LeftWristY, 25);

    number_LeftWristY = Number(LeftWristY);
    remove_decimals = floor(number_LeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    song.setVolume(volume);
    }

    if(scoreRightWrist > 0.1){
        circle(RightWristX, RightWristY, 25);

        if(RightWristY > 0 && RightWristY <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        if(RightWristY > 100 && RightWristY <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }

        if(RightWristY > 200 && RightWristY <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        if(RightWristY > 300 && RightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }

        if(RightWristY > 400 && RightWristY <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}


function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function play_music(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("code");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("leftWristX = " + LeftWristX + ", leftWristY = " + LeftWristY + ", score of LeftWrist = " + scoreLeftWrist);

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("rightWristX = " + RightWristX + ", rightWristY = " + RightWristY + ", score of RightWrist = " + scoreRightWrist);

        
    }
}

