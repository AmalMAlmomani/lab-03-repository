`use strict`;

let KeywordArray1 = [];
let KeywordArray2 = [];
let hornsObj = [];

$(document).ready(function () {
  function Horns(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;
    hornsObj.push(this);

  }



  Horns.prototype.render = function () {
    let $hornClone = $("#template").html();
    var render1 = Mustache.render($hornClone, this);
    // $hornClone.find("img").attr("src", this.image_url);
    // $hornClone.find("h2").text(this.title);
    // $hornClone.find("p").text(this.description);
    // $hornClone.find("img").attr("class", this.keyword);
    // $hornClone.find("img").attr("alt", this.title);
    // $hornClone.removeAttr("id");
    // $hornClone.attr("class", this.keyword);
    $(" main ").append(render1);

  };
  Horns.prototype.render2 = function () {
    let $hornClone = $("#template").html();
    let rendered = Mustache.render($hornClone, this);
    $('main').append(rendered);

  };

  Horns.prototype.selectedMenu = function (arr) {
    arr.forEach((value) => {
      let menuSelect = $('.select');
      menuSelect.append(`<option> ${value} </option>`);
    });
  };



  const readJson = () => {
    let horn;
    $.ajax("data/page-1.json", { method: "GET", dataType: "JSON" }).then(data => {
        data.forEach(function(honrItem1){
          horn = new Horns(honrItem1);
          if (!(KeywordArray1.includes(horn.keyword))) {
            KeywordArray1.push(horn.keyword);
          }
          horn.render();
        });
        horn.selectedMenu(KeywordArray1);
      });
  };
  readJson();

  $('#button1').on('click', function () {
    hornsObj = [];
    $("section").remove();
    $("select option").remove();
    readJson();
  });


  const readJson2 = () => {
    let horn;
    $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data2 => {
        data2.forEach(function(honrItem2) {
         horn = new Horns(honrItem2);
          if (!(KeywordArray2.includes(horn.keyword))) {
            KeywordArray2.push(horn.keyword);
          }
          horn.render2();
        });
        horn.selectedMenu(KeywordArray2);
      });
  };
  readJson2();
  $('#button2').on('click', function () {
    hornsObj = [];
    $("section").remove();
    // $("select option").remove();
    readJson2();
  });
});

$('.select').change(function () {
  let key = $(this).children('option:selected').val();
  $('section').hide();
  $(`.${key}`).show();
});
$('input').click(function () {
  $('#number').show();
});

$("#title").click(function () {
  $("section").remove();
  sortImage(hornsObj, "title");
  hornsObj.forEach((value) => {
    value.render();
    $("#title").show();
  });
});

$("#number").click(function () {
  $("section").remove();
  sortImage(hornsObj, "horns");
  hornsObj.forEach((value) => {
    value.render();
    $("#number").show();
  });
});


function sortImage(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; 
    var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}




