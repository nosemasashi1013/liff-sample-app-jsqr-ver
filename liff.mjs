import liff from "@line/liff/dist/lib";

$(function () {
  // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
  // LINE DevelopersのLIFF画面より確認可能
  var liffId = "1656501658-pq7GAjnA";
  initializeLiff(liffId);

  $(".open-camera-btn").click(function () {
    console.log("camera open");
    scanCode();
  });

  $("form").submit(function () {
    var date = $('input[name="date"]').val();
    var name = $('input[name="text"]').val();

    var msg = `希望日：${date}\n氏名：${name}`;
    sendMessages(msg);

    return false;
  });
});

// LIFFアプリを初期化
// このメソッドを実行すると、LIFF SDKの他のメソッドを実行できるようになる
function initializeLiff(liffId) {
  liff
    .init({
      liffId: liffId,
    })
    .then(() => {
      // Webブラウザからアクセスされた場合は、LINEにログインする
      if (!liff.isInClient() && !liff.isLoggedIn()) {
        alert("LINEアカウントにログインしてください。");
        liff.login({ redirectUri: location.href });
      }
    })
    .catch((err) => {
      console.log("LIFF Initialization failed ", err);
    });
}

// QRコードリーダーを起動する
function scanCode() {
  liff
    .scanCodeV2()
    .then((result) => {
      console.log(result);
      const stringifiedResult = result.value;
      console.log(stringifiedResult);
    })
    .catch((err) => {
      alert("scanCode failed!");
    });
}

// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
  liff
    .sendMessages([
      {
        type: "text",
        text: text,
      },
    ])
    .then(function () {
      liff.closeWindow();
    })
    .catch(function (error) {
      alert("Failed to send message " + error);
    });
}
