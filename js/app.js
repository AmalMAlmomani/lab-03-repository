`use strict`;

let KeywordArray1 = [];
let KeywordArray2 = [];


$(document).ready(function () {
  function Horns(horn) {
    this.image_url = horn.image_url;
    this.title = horn.title;
    this.description = horn.description;
    this.keyword = horn.keyword;
    this.horns = horn.horns;
    Horns.all.push(this);

  }
  Horns.all = [];
  console.log(Horns.all);


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
      data.forEach(function (honrItem1) {
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

  const readJson2 = () => {
    let horn;
    $.ajax("data/page-2.json", { method: "GET", dataType: "JSON" }).then(data2 => {
      data2.forEach(function (honrItem2) {
        horn = new Horns(honrItem2);
        if (!(KeywordArray2.includes(horn.keyword))) {
          KeywordArray2.push(horn.keyword);
        }
        horn.render2();
      });
      horn.selectedMenu(KeywordArray2);
    });
  };
  // readJson2();


  $('#buttons').on('click', a => {
    if (a.target.id === "button1") {
      Horns.all = [];
      $("section").remove();
      $("select option").remove();
      readJson();
    } else if (a.target.id === "button2") {
      Horns.all = [];
      $("section").remove();
      $("select option").remove();
      readJson2();
    }
  });


  $('.select').change(function () {
    let key = $(this).children('option:selected').val();
    $('section').hide();
    $(`.${key}`).show();
  });
  $('input').click(function () {

    $('#number').show();
  });



  // function sortBy(array, property) {
  //   array.sort((a, b) => {
  //     let firstItem = a[property];
  //     let secondItem = b[property];
  //     if(property === "horn"){
  //       firstItem=firstItem.toUpperCase();
  //       secondItem=secondItem.toUpperCase();
  //     }
  //     if (firstItem > secondItem) {
  //       return 1;
  //     } else if (firstItem < secondItem) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }
  
  // console.log(sortBy());
  // $("#radioSorting").on('click', e => { 
  //   if (e.target.id !== "radioSorting") {
  //     if (e.target.id === "titleS") {
       
  //       sortBy(Horns.all, "title");
        

  //     } else if (e.target.id === "hornsS") {
  //       sortBy(Horns.all, "horns");
      


  //     }
  //   }
  
 //empty html
// $('#container').html('');
// Horns.all.forEach(horn => horn.render() );
// });
function sortBy(arr, key) {
  return arr.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


$('#titleS').click(function(){
  $('section').remove();
  sortBy(Horns.all, 'title');
  Horns.all.forEach((value) => {
    value.render();
    $('#radioSorting').show();
  });
});

$('#hornsS').click(function(){
  $('section').remove();
  sortBy(Horns.all,'horns');
  Horns.all.forEach((value) => {
    value.render();
    $('#radioSorting').show();
  });
});


 });