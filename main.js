function preload(){
    classifi=ml5.imageClassifier("DoodleNet");
}

function draw(){
    strokeWeight(7);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

}

function setup(){
    myCanvas=createCanvas(300, 300);
    myCanvas.center();
    background("yellow");
    myCanvas.mouseReleased(classifyCanvas);
    synthe=window.speechSynthesis;
}

function clearCanvas(){
    background("yellow");
}

function classifyCanvas(){
    classifi.classify(myCanvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("labell").innerHTML="Label: "+results[0].label;
        document.getElementById("cnfdnce").innerHTML="Confidence: "+Math.round(100*results[0].confidence)+"%";
        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synthe.speak(utterThis);
    }
}