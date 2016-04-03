var calendar = {};
calendar.$ = {};
calendar.$.container =  $.el('.calendar .row');
calendar.$.birth_form  = $.el('form');
calendar.get_container_width = function() {
  var width = parseInt(window.getComputedStyle(calendar.$.container).getPropertyValue('width').match(/\d+/));
  return width;
};

calendar.set_grid = function (birth_date) {
  birth_date = moment(birth_date);
  var now =  moment();

  var weeks= 0;

  var difference = moment.duration(now.diff(birth_date))._milliseconds;
  var parse_diff = moment.preciseDiff(0, difference);

  parse_diff = parse_diff.match(/\d+/g);

  //counting years
  for (var y = parse_diff[0]; y > 0; y--){
    weeks += 52;
  }

  //counting weeks
  weeks += parseInt(parse_diff[1]) * 4.3;


  //counting days
  if (parseInt(parse_diff[2]) >= 30){
    weeks += 3;
  }
  else if (parseInt(parse_diff[2]) >= 20){
    weeks += 1;
  }
  else if (parseInt(parse_diff[2]) >= 10){
    weeks += 1;
  }

  //rounding
  weeks = Math.floor(weeks);
  return weeks;
};
calendar.create_grid = function (limit) {
  calendar.$.container.innerHTML = null;
var grid= document.createDocumentFragment();

  for (var i = 0; i < (52*90); i++){
   var week = document.createElement('div');
//    var opacity = (-1 / i) *-200;
    week.className = "case";
    if (i <= limit){
      week.className += " checked";
    //  week.style.background= 'rgba(255,0,0,'+ opacity +')';
    }



    week.id = i+1;
    week.style.height = calendar.get_container_width()/52 - 5  + "px";
    grid.appendChild(week);
  }
  calendar.$.container.appendChild(grid);
  calendar.$.grid = $.all('.case');
};

calendar.resize_grid= function(){
  [].forEach.call(calendar.$.grid, function (elem, index) {
    elem.style.height = calendar.get_container_width()/52 - 5   + "px";
  });
};

calendar.get_date= function () {
  var year = $.el('form #year').value;

  var month = $.el('form #month').value;
  if(month < 10){
    month = '0' + month;
  }

  var day = $.el('form #day').value;
  if(day < 10){
    day = '0' + day;
  }

  var res = year+month+day;
  return res;
};

//document.body.onresize = calendar.resize_grid;




calendar.$.birth_form.onsubmit = function (e) {
  e.preventDefault();
  calendar.create_grid(calendar.set_grid(  calendar.get_date()));

};
