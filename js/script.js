$(document).ready(function () {

  var $window = $(window);

//============================================================================
//  SLIDING MENU
//============================================================================
  $('.menu-overlay').click(function () {
    $('.wrapper').removeClass('open-menu');
  });
  $('#mobile-menu-btn').click(function () {
    if (!$('.wrapper').hasClass('open-menu')) {
      $('.wrapper').addClass('open-menu');
    }
    else {
      $('.wrapper').removeClass('open-menu');
    }
    return false;
  });

//============================================================================
//  NAV MOVING
//============================================================================
  /*function navMove(){
      if ($window.width() <= 800) {
          $('nav').appendTo('#mobile-menu');
      } else {
          $('nav').appendTo('.nav-wrap');
      }
  }
  navMove();
  $window.resize(navMove);*/

  var nav = document.querySelector('nav');
  var nav_wrap = document.querySelector('.nav-wrap');
  var mobile_menu = document.querySelector('#mobile-menu');

  function navMove() {
    if (window.innerWidth <= 800) {
      mobile_menu.appendChild(nav);
    } else {
      nav_wrap.appendChild(nav);
    }
  }
  navMove();
  window.addEventListener('resize', navMove);

//============================================================================
//  SEARCH BLOCK w BOUNCE EFFECT
//============================================================================
  /*function searchFunc() {
      var $searchBtn = $('.search-btn-js');
      var $searchBlock = $('#search_block');

      $searchBtn.on('click', function (){
          if(!$(this).hasClass('state-btn-opened')){
              $searchBtn.addClass('state-btn-opened');
              $searchBlock.removeClass('bounceOutUp').addClass('state-opened bounceInDown');
          }
          else{
              $searchBtn.removeClass('state-btn-opened');
              $searchBlock.removeClass('state-opened bounceInDown').addClass('bounceOutUp');
          }
      });
  }*/

//============================================================================
//  AJAX
//============================================================================
  $('.btn-ajax-1').click(function () {
    $('.wrap-ajax').load('ajax/ajax_1.html');
  });

  $('.btn-ajax-2').click(function () {
    $.ajax({
      url: 'ajax/ajax_2.json',
      dataType: 'text',
      success: function (jsondata) {
        //$('.wrap-ajax').html(jsondata);
        $('.wrap-ajax').html(JSON.parse(jsondata).address.streetAddress);  //---> парсинг файла c выборкой адресса
      }
    });
  });

//============================================================================
//  DRAG & DROP
//============================================================================
  var dragDrops = document.querySelectorAll('.dragDrop');
  dragDrops.forEach(function (dragDrop) {
    dragDropFunc(dragDrop);
  });

  function dragDropFunc(dragDrop) {
    var dragElement = null;

    function handleDragStart(e) {
      dragElement = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);   //запоминаем перетягиваемый обьект
    }

    function handleDragOver(e) {
      e.preventDefault();   //allow to drop.
      e.dataTransfer.dropEffect = 'move';
      return false;
    }

    function handleDragEnter(e) {
      this.classList.add('over');   // добавление класса .over элементу над которым находится курсор
    }

    function handleDragLeave(e) {
      this.classList.remove('over');   // очистка класса .over элементу который покинул курсор
    }

    function handleDrop(e) {
      e.stopPropagation();
      if (dragElement != this) {
        dragElement.innerHTML = this.innerHTML;                 // обмен данными, между элементами:
        this.innerHTML = e.dataTransfer.getData('text/html');   // перетягиваемым и тем над которым совершено событие drop
      }
      return false;
    }

    function handleDragEnd(e) {
      dragElems.forEach(function (elem) {
        elem.classList.remove('over');   // очистка всех элементов от класса .over
      });
    }

    var dragElems = dragDrop.querySelectorAll('.elem');
    dragElems.forEach(function (elem) {
      elem.addEventListener('dragstart', handleDragStart, false);   // start drag elem
      elem.addEventListener('dragenter', handleDragEnter, false);   // over the elem
      elem.addEventListener('dragover', handleDragOver, false);
      elem.addEventListener('dragleave', handleDragLeave, false);   // leave elem
      elem.addEventListener('drop', handleDrop, false);             // drop place(over the elem), elems changed
      elem.addEventListener('dragend', handleDragEnd, false);       // clear class over fror all elems
    });
  }

//============================================================================
//  DRAG & DROP 2
//============================================================================
  /* function allowDrop(ev) {
      ev.preventDefault();
   }

   function drag(ev) {
     ev = this;
     ev.dataTransfer.setData("text", ev.target.id);
   }

   function drop(ev) {
     ev.preventDefault();
     var data = ev.dataTransfer.getData("text");
     ev.target.appendChild(document.getElementById(data));
   }

   var dropBox = document.getElementById('drop_box'),
     dragElem = document.getElementById('drag_elem');

     /*dragElem.ondragstart=function drag(ev) {
       ev.dataTransfer.setData("text", ev.target.id);
     }
     dropBox.ondragover=function allowDrop(ev) {
       ev.preventDefault();
     }
     dropBox.ondrop=function drop(ev) {
       ev.preventDefault();
       var data = ev.dataTransfer.getData("text");
       ev.target.appendChild(document.getElementById(data));
     }*/

  /*ondrop="drop(event)" ondragover="allowDrop(event)"
  ondragstart="drag(event)"
  object.addEventListener("drop", myScript);*/

//============================================================================
//  FOOTBALL
//============================================================================
  var field = document.getElementById('field');
  var ball = document.getElementById('ball');

  field.addEventListener('click', function (event) {
    var fieldCoords = field.getBoundingClientRect(); // собирает полные данные об обьекте (поле с учетом рамки): высота, ширина, позиция top (или y) и left (или x) относительно окна.
    var fieldCoordsInner = {                         // позиция поля без учета рамки слева и сверху относительно окна
      X: fieldCoords.left + field.clientLeft,
      Y: fieldCoords.top + field.clientTop         // field.clientTop и field.clientLeft ширина рамки (10px)
    };
    var ballDiameter = ball.offsetWidth;
    var pointCoords = {
      X: Math.max(Math.min(                                      // Эта запись говорит: если X будет больше (Xmax - 340) то X = 340, если же X меньше (Xmin - 0), то X = 0
        event.clientX - fieldCoordsInner.X - ballDiameter / 2,   // event.clientX и event.clientY координаты курсора в момент клика относительно окна, ballDiameter/2 - пол мяча
        field.clientWidth - ballDiameter), 0),                 // field.clientWidth - ширина поля без рамки, (380 - 40 = 340) - поправка не дающая мячу уйти за пределы поля.
      Y: Math.max(Math.min(
        event.clientY - fieldCoordsInner.Y - ballDiameter / 2,
        field.clientHeight - ballDiameter), 0)
    };
    ball.style.left = pointCoords.X + 'px';    // style.left и style.top назначение стилей мячу
    ball.style.top = pointCoords.Y + 'px';
  });

//============================================================================
//  GEOLOCATION
//============================================================================
  //  Более простой вариант, тоже работает
  /*if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude, longitude);
      }
    );
  }
  else {
    alert("Geolocation API не поддерживается в вашем браузере");
  }

  //  Более сложный вариант
  var x = document.getElementById('geolocation');
  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  getLocation();

  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
  }*/

//============================================================================
//  PANZERS
//============================================================================
  // создаем консткуктор (класс) Tanks, заданные парамеры при создании обьекта записываются как его свойства с помощью this
  function Tanks(tank_name, front_armor, side_armor, tank_speed) {
    this.tank_name = tank_name;
    this.front_armor = front_armor;
    this.side_armor = side_armor;
    this.tank_speed = tank_speed;
  }

  // создание новых обьектов танков от класса Tanks
  var T34 = new Tanks('T-34', 45 / 0.5, 45, 55);
  var IS2 = new Tanks('IS-2', 120 / 0.5, 90, 37);

  // добавление метода movement в прототип класса Tanks
  Tanks.prototype.movement = function () {
    var tank_speed = this.tank_speed;
    var result;
    if (tank_speed > 40) {
      result = 'fast'
    }
    else if (tank_speed <= 40) {
      result = 'slow'
    }
    else {
      alert('ERROR: unset speed value')
    }
    return 'Target detected, this tank moving ' + result;
  };

  // определение типа цели (танка), ее положения, бронирования и скорости движения.
  var target_type;

  (function () {
    if (Math.random() > 0.25) {
      target_type = T34;
    }
    else {
      target_type = IS2;
    }
  })();

  console.log(target_type.movement());

  var target_speed = Math.round(Math.random() * target_type.tank_speed);
  var target_position;
  var target_armor;

  (function () {
    if (Math.random() > 0.5) {
      target_position = 'front';
      target_armor = target_type.front_armor;
    }
    else {
      target_position = 'side';
      target_armor = target_type.side_armor;
    }
  })();

  // создание консткуктора (класса) Guns
  function Guns(gun_name, gun_diameter, gun_penetration) {
    this.gun_name = gun_name;
    this.gun_diameter = gun_diameter;
    this.gun_penetration = gun_penetration;
  }

  // добавление метода attack в прототип класса Guns
  Guns.prototype.attack = function (target_type, target_speed, target_position, target_armor, fire_distance) {
    var target = target_type.tank_name;
    var speed = target_speed;
    var position = target_position;
    var armor = target_armor;
    var distance = fire_distance;

    var gunname = this.gun_name;
    var diameter = this.gun_diameter;
    var base_penetration = this.gun_penetration;
    var real_penetration;

    (function () {
      if (distance < 500) {
        real_penetration = base_penetration - 5;
      }
      else if (distance >= 500 && distance < 1000) {
        real_penetration = base_penetration - 15;
      }
      else if (distance >= 1000 && distance < 1500) {
        real_penetration = base_penetration - 25;
      }
      else if (distance >= 1500 && distance < 2000) {
        real_penetration = base_penetration - 35;
      }
      else {
        real_penetration = base_penetration - 50;
      }
    })();

    console.log(gunname + ' gun(' + diameter + 'mm)' + ' attacked ' + target + ' from ' + distance + 'm to ' + position + ' projection');

    function shootResult() {
      if (speed > 40) {
        console.log('Miss! Target go away!');
      }
      else {
        if ((armor - real_penetration) > 0) {
          console.log('Not penetrate!');
        }
        else if ((armor - real_penetration) <= 0) {
          console.log('Target Destroy!');
        }
        else {
          alert('ERROR: incorrect calculate');
        }
      }
    }
    shootResult();
  };
  // создание новых обьектов (орудий)из класса Guns
  var pzIIIGun = new Guns('Kwk39', 50, 96);
  var tigerGun = new Guns('Acht-Acht', 88, 145);

  // определение типа орудия из которого ведется огонь и растояние до цели
  var gun_type;

  if (Math.random() > 0.25) {
    gun_type = pzIIIGun;
  }
  else {
    gun_type = tigerGun;
  }

  var fire_distance = 1500;

  // применение обьектом gun_type метода attack (огонь орудия по цели!)
  gun_type.attack(target_type, target_speed, target_position, target_armor, fire_distance);

//============================================================================
//  WOT VBR +-25%
//============================================================================
   /*var random = Math.floor(Math.random()*100);
   var damage = 390;
   var persent;
   var result;

   if(random < 50){
       persent = 100 - (random/2);
   }
   else{
       persent = 100 + ((random - 50)/2);
   }
   result =  Math.floor(persent/100*damage);

   console.log(persent + '% ', result);*/

//============================================================================
//  __PROTO__ PROTOTYPE
//============================================================================
// создание класса Animal с методом skills
  function Animals(name) {
    this.name = name;
    this.skills = function () {
      return 'Jump';
    }
  }

// добавление метода move в класс Animals
  Animals.prototype.move = function () {
    return 'default Animal speed';
  };

// создание нового обьекта из класса Animal
  var cat = new Animals('Murka');

  console.log(cat.name, cat.skills(), cat.move());
  // --> Murka, Jump, default Animal speed
  //все параметры кроме name берутся из прототипа так как собственных нету.

// добавление собственного метода move конкретно данному обьекту cat
  cat.move = function () {
    return this.name + ' so fast';
  };

  console.log(cat.move(), cat.__proto__.move());
  // --> Murka so fast, default Animal speed
  //первый move-собственный, второй move-получаем с прототипа

// перезапись свойств метода move в прототипе обьекта cat
  cat.__proto__.move = function () {
    return 'new Animal speed';
  };

  console.log(cat.move(), cat.__proto__.move());
  // --> Murka so fast, new Animal speed
  //первый move-собственный, второй move-получаем с прототипа (обновленный)

////////////////////////////////////////////////////////////////////////////

//создание обьекта animal
  var animal = {
    walk: function () {
      return 'Animal';
    }
  };

//создание обьекта rabbit, и присвоение его прототипом обьекта animal
  var rabbit = {
    __proto__: animal,
    walk: function () {
      return 'Rabbit';
    }
  };

  console.log(rabbit.walk(), rabbit.__proto__.walk());
  // --> Rabbit, // --> Animal

////////////////////////////////////////////////////////////////////////////

  function Product(name, price) {
    //2 Object{}
    this.name = name;
    this.price = price;
    //3 Object { name: "cheese", price: 50 }
    this.cell = function () {
      return this.name + ' cell for ' + this.price;
    };
    //4 Object { name: "cheese", price: 50, cell: Product/this.cell() }
  }

  /*Product.prototype.cell = function () {
      return this.name + ' cell for ' + this.price;
  };   через такой вариант cell не передается*/

  function Food(name, price) {
    //1 Object{}
    Product.call(this, name, price);
    //5 Object { name: "cheese", price: 50, cell: Product/this.cell() }
    this.category = 'food';
    //6 Object { name: "cheese", price: 50, , cell: Product/this.cell(), category: "food" }
  }

  var food = new Food('cheese', 50);

  console.log(food.cell());
  // -->  cheese cell for 50

//============================================================================
//  VALIDATION FORM
//============================================================================
  /*var form = document.forms['form_login']['form_login_pass'];
  document.forms выводит массив с всеми формами, в которых массивы со всеми инпутами
  данная запись forms['форма']['инпут'] ищет конкретное поле в конкретной форме.*/

  var loginSubmit = document.querySelector('#form_login .submit');
  loginSubmit.addEventListener('click', validateForm);

  function validateForm() {
    var form = this.closest('form');
    var pass = form.querySelector('#form_login_pass');

    if (pass.value.length < 3) {
      pass.classList.add('error');
      return false;  // blocking Form, NOT submit!
    }
    else {
      pass.classList.remove('error');
      // submit Form
    }
  }

//============================================================================
//  ABOUT OBJECT
//============================================================================
  /*var object1 = Object.create(null);   // Создаем пустой обьект, вобще без аргументов нельзя поэтому используем в качестве аргумента null
  var object1 = {};                    // так тоже можна создать пустой обьект

  var object1 = Object.setPrototypeOf({   // В свойства прототипа обьекта записываем параметры и методы
    name: 'Obj1',
    size: 500,
    show: function () {
        alert('Show Alert');
    }
  }, null);

  var object2 = Object.setPrototypeOf({
    name: 'Obj2'
  }, null);

  var object3 = Object.assign({}, object1, object2);

  Создаем новый пустой обьект и копируем в него все свойства обьектов object1 и object2
  в тело пустого обьекта {} можна поместить некие параметры, и если они уникальны то добавятся,
  но если таковы уже есть в копируемом обьекте object1 или object1 то они попросту проигнорируются и перезапишутся
  то есть добавив {weight: 100, name: 'Obj3'} параметр веса добавится,
  а парамент имени проигнорируется и возьмется с копии. Будет все равно Obj2 (параметр последнего в списке обьекта а именно object2)
  обьектов может быть сколько угодлно: object1, object2, object3 ... и так далее.

  console.log( object3.name );   // --> Obj2*/

//============================================================================
//  TEST SECTION
//============================================================================


});