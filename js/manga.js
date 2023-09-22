var btn = document.getElementById('voice-btn');
var serif = document.getElementById('serif');


//音声認識APIの使用
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var speech = new webkitSpeechRecognition();
//言語を日本語に設定
speech.lang = "ja";

btn.addEventListener( 'click' , function() {
    // ➀ボタンをクリックした時の処理
   // 音声認識をスタート
   speech.start();
} );

speech.addEventListener( 'result' , function( e ) {
    // ➁音声認識した結果を得る処理
// 認識された「言葉」を、変数「text」に格納
var text = e.results[0][0].transcript;
// 認識された「言葉(text)」を、表示用のdivタグに代入する
 serif.value = text;
} );




var droparea = document.querySelectorAll("div.koma-serif");
const wrapCharSpan = function(str){
  return [...str].map(char => `${char}<br>`).join('');
}

//ドラッグ開始時の処理
serif.addEventListener("dragstart", function(evt) {
    //テキストをdataTransferにセットする
    evt.dataTransfer.setData( "text/plain" , evt.target.value);
    //イベントの予期せぬ伝播を防ぐための記述
    evt.stopPropagation();
  }, false);
  
 //全てのドロップ要素にdropイベントを追加する
for(var i=0; i < droparea.length ; i++ ){
    
  droparea[i].addEventListener("drop", function(evt){
    var droptxt = evt.dataTransfer.getData( "text/plain" );

    
    //その要素のidを再取得
    var obj2 = document.getElementById(evt.target.id );

    //ドロップエリアに受け取ったテキストを記述
    obj2.innerHTML = wrapCharSpan(droptxt);
    //ブラウザのデフォルト動作の抑制
    evt.preventDefault();
  },false);

  //２つのイベントでデフォルト動作を抑制する
  droparea[i].addEventListener( "dragenter" , function(evt){
    evt.preventDefault();
  }, false );
  droparea[i].addEventListener( "dragover" , function(evt){
    evt.preventDefault();
  }, false );
}  



$(function() {
  $('#slider').slick({
    vertical:true,
    prevArrow: '<span class="material-symbols-outlined usiro">arrow_back_ios</span>',
    nextArrow: '<span class="material-symbols-outlined mae">arrow_forward_ios</span>',
  }); 
});

let mode = 1;

var komaImg = document.querySelectorAll(".card-img");

//全ての画像にイベントを追加
for(var k=0; k < komaImg.length ; k++ ){
    
  komaImg[k].addEventListener('click', function(evt){
    //その要素のidを再取得
  $obj = evt.target.id;
    //画像変更
    $('#area' + mode).children('img').attr('src','images/' + $obj + '.png');
    //領域変更
    $nowArea = $('#area' + mode).children('.koma-serif');
    $nowArea.removeClass().addClass('koma-serif');
    $nowArea.eq(0).addClass($obj + '-1');
    $nowArea.eq(1).addClass($obj + '-2');
  },false);

}  
$('#random').click(function(){
  var random = Math.floor(Math.random() * (komaImg.length - 1)) + 1;

  $('#area' + mode).children('img').attr('src','images/koma' + random + '.png');
  //領域変更
  $nowArea = $('#area' + mode).children('.koma-serif');
  $nowArea.removeClass().addClass('koma-serif');
  $nowArea.eq(0).addClass('koma' + random + '-1');
  $nowArea.eq(1).addClass('koma' + random + '-2');
})


 $('#next-btn').click(function(){
  if(mode == 1){
    $('#back-btn').fadeIn(500);
    $('#move').addClass("syou");
    $('#ki').removeClass("active");
    $('#syou').addClass("active");
    message = new MessageViewer({
      "data": [{
          "message": "１コマ目はできたかな？<br>次は２コマ目、「承」の部分を作ってみよう！",
      },{
          "message": "「起」からお話が少しだけすすむよ！<br>新しくキャラが動いたり、会話したりするよ",
      }], "option": {
        "loop": true,
        "speed": "slow"
    }});
    mode++;
 }else if(mode == 2){
    $('#move').addClass("ten");
    $('#syou').removeClass("active");
    $('#ten').addClass("active");
    message = new MessageViewer({
      "data": [{
          "message": "次はいよいよ３コマ目！<br>山場の「転」の部分を作ってみよう！",
      },{
          "message": "「転」ではお話の流れが変わる！<br>驚くようなことがおきたり、大きく話が動くよ",
      }], "option": {
        "loop": true,
        "speed": "slow"
    }});
    mode++;
 }else if(mode == 3){
    $('#move').addClass("ketu");
    $('#ten').removeClass("active");
    $('#ketu').addClass("active");
    message = new MessageViewer({
      "data": [{
          "message": "そして最後のコマ！<br>「結」の部分を作ってみよう！",
      },{
          "message": "お話をまとめて、おもしろくオチをつけるよ！<br>インパクトがあれば形になりやすいかも！？",
      }], "option": {
        "loop": true,
        "speed": "slow"
    }});
    mode++;
 }else if(mode == 4){
  $('#move').removeClass();
  $('#move').addClass("ki");
  $('#stepbar,#voice-area,#slider-wrap,#next-btn,#random').fadeOut();
  $('#capture').css('height','112vw');
  message = new MessageViewer({
    "data": [{
        "message": "４コマ漫画ができたね！最後に、<br>できた漫画を保存してみよう！",
    }], "option": {
      "loop": true,
      "speed": "slow"
  }});
  $('body,html').animate({scrollTop: 1800}, 600);
  mode++;
  //画像保存処理
  html2canvas(document.getElementById("capture")).then(canvas => {
    var imageData = canvas.toDataURL();
    // document.getElementById('result').setAttribute("src", canvas.toDataURL());
    document.getElementById("plotter-img").href = imageData;
    });
    $('#plotter-img').fadeIn();
    }
})


$('#back-btn').click(function(){
 if(mode == 2){
  $('#back-btn').fadeOut(300);
  $('#move').removeClass("syou");
  $('#syou').removeClass("active");
  $('#ki').addClass("active");
  message = new MessageViewer({
    "data": [{
        "message": "4コマ漫画をつくってみよう！<br>まずは１コマ目「起」の部分から！",
    },
    {
        "message": "ここはお話のはじまり！どういう状況なのか？<br>どんなキャラがいるのか？を伝えるところだよ",
    },],
    "option": {
        "loop": true,
        "speed": "slow"
    }
});
  mode--;
 }else if(mode == 3){
  $('#move').removeClass("ten");
  $('#ten').removeClass("active");
  $('#syou').addClass("active");
  message = new MessageViewer({
    "data": [{
        "message": "１コマ目はできたかな？<br>次は２コマ目、「承」の部分を作ってみよう！",
    },{
        "message": "「起」からお話が少しだけすすむよ！<br>新しくキャラが動いたり、会話したりするよ",
    }], "option": {
      "loop": true,
      "speed": "slow"
  }});
  mode--;
 }else if(mode == 4){
  $('#move').removeClass("ketu");
  $('#ketu').removeClass("active");
  $('#ten').addClass("active");
  message = new MessageViewer({
    "data": [{
        "message": "次はいよいよ３コマ目！<br>山場の「転」の部分を作ってみよう！",
    },{
        "message": "「転」ではお話の流れが変わる！<br>驚くようなことがおきたり、大きく話が動くよ",
    }], "option": {
      "loop": true,
      "speed": "slow"
  }});
  mode--;
}else if(mode == 5){
  $('#move').addClass("ketu");
  $('#stepbar,#voice-area,#slider-wrap,#next-btn,#random').fadeIn();
  $('#capture').css('height','28vw');
  message = new MessageViewer({
    "data": [{
        "message": "そして最後のコマ！<br>「結」の部分を作ってみよう！",
    },{
        "message": "お話をまとめて、おもしろくオチをつけるよ！<br>インパクトがあれば形になりやすいかも！？",
    }], "option": {
      "loop": true,
      "speed": "slow"
  }});
  $('#plotter-img').fadeOut();
  mode--;
}
})


document.addEventListener("DOMContentLoaded", function () {
    let message = new MessageViewer({
        "data": [{
            "message": "4コマ漫画をつくってみよう！<br>まずは１コマ目「起」の部分から！",
        },
        {
            "message": "ここはお話のはじまり！どういう状況なのか？<br>どんなキャラがいるのか？を伝えるところだよ",
        },],
        "option": {
            "loop": true,
            "speed": "slow"
        }
    });
}, {once:true});
