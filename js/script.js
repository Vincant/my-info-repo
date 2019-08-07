$(document).ready(function () {

  var $window = $(window);

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
  $('.btn-ajax-1').on('click', function () {
    $('.wrap-ajax').load('ajax/ajax_1.html');
  });

  /*$('.btn-ajax-2').on('click', function () {
    $.ajax({
      url: 'ajax/ajax_2.json',
      dataType: 'text',
      success: function (jsondata) {
        //$('.wrap-ajax').html(jsondata);
        $('.wrap-ajax').html(JSON.parse(jsondata).address.streetAddress);  //---> парсинг файла c выборкой адресса
      }
    });
  });*/ //код ниже реализует то же самое только без JQuery

  var btnAjax = document.querySelector('.btn-ajax-2'),
      containerAjax = document.querySelector('.wrap-ajax');
  btnAjax.addEventListener('click', ajaxRequestJSON); // обработка JSON
  //btnAjax.addEventListener('click', ajaxRequestXML); // обработка XML

  function ajaxRequestJSON () {
    var request = new XMLHttpRequest();
    request.open('GET', 'ajax/ajax_2.json', true);
	
	request.send();

    request.onload = function (event) {     //в event приходит событие, в данном случае Load
      if (request.status === 200) {
        containerAjax.innerText = JSON.parse(request.responseText)[0].powers[1];  //парсим JSON данные и выбираем нужные данные, и вставляем в нужное место
      }
      else {
        alert('Request failed.  Returned status of ' + request.status);
      }
    };
  }

  function ajaxRequestXML () {
    var request = new XMLHttpRequest();
    request.open('GET', 'ajax/account.xml', true);
	
	request.send();

    request.onload = function (event) {     // в event приходит событие, в данном случае Load
      if (request.status === 200) {
        //var xmlStr = request.responseText; // полученные данные в виде текста
        //var xmlDoc = new DOMParser().parseFromString(xmlStr ,'text/html'); // преобразовываем данные c строки в [object HTMLDocument]
        var xml = request.responseXML; // полученные данные сразу в виде XML
        containerAjax.innerText = xml.getElementsByTagName('friend')[1].innerHTML; // Mary  (по тег нейму делаем выбокку, второй элемент в коллекции, текст)
      }
      else {
        alert('Request failed.  Returned status of ' + request.status);
      }
    };
  }

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
  var pzIIIGun = new Guns('Kwk39', 50, 86);
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
  обьектов может быть сколько угодно: object1, object2, object3 ... и так далее.

  console.log( object3.name );   // --> Obj2*/

//============================================================================
//  CALLBACK Function
//============================================================================
  /*Использование функ., переданной в качестве аргумента, внутри другой функ.
   функ. total передаем все переменные a,b,c,d и обе функции общета sum и sum2 (в переменных callback, callback2),
  внутри total сортируем переменные по callback функциям и создаем локальную переменную f
  и так же ее передаем в цунк. колбеков*/
  var sum = function (a, b, f) {
    return (a + b) * f;
    // (1 + 2) * 5 = 15
  };
  var sum2 = function (c, d, f) {
    return (c * d) - f;
    // (3 + 4) - 5 = 7
  };
  var total = function (a,b,c,d, callback, callback2) {
    var f = 5;
    return callback(a,b, f) + callback2(c,d, f);
    // 15 + 7 = 22
  };
  console.log( total(1,2,3,4, sum, sum2) ); // --> 22
//------------------------------------------------------------------------------
  /*1. Function Declaration – функция, объявленная в основном потоке кода.
        function sum(a, b) {
          return a + b;
        }
    2. Function Expression – объявление функции в контексте какого-либо выражения, например присваивания.
        var sum = function(a, b) {
          return a + b;
        }
    Но делают по сути одно и то же

    Основное отличие между ними: функции, объявленные как Function Declaration, создаются интерпретатором до выполнения кода.
    Поэтому их можно вызвать до объявления

    3. Функциональное выражение, которое не записывается в переменную, называют анонимной функцией.*/

//============================================================================
//  __PROTO__ vs PROTOTYPE
//============================================================================
/*__proto__ ссылка на прототип обьекта. (на родительский обьект и так до самого верховного Object.prototype)
  Prototype - свойство которое есть только у функ. (это почти пустой обьект).
  то есть он имеет свою собственную ссылку __proto__ на родителя,
  и свойство constructor которое указывает на саму функцию
  object.__proto__ === Object.prototype; // true*/

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
  //rabbit.__proto__ = animal;  //можно назначить наследование сдесь вместо __proto__: animal, вверху. Эквивалентно.
  //rabbit.__proto__ = Animals.prototype;  // ссылается на прототип класа Animals и имеет только метод move()
  console.log(rabbit.walk(), rabbit.__proto__.walk());
  // --> Rabbit, // --> Animal

//////////////////////////////////////////////

// создание класса Animals
  function Animals(name) {
    this.name = name;
    this.skills = function () {
      return 'Jump';
    }
  }

// добавление метода move в класс Animals
  Animals.prototype.move = function () {
    return 'default Animals speed';
  };

// создание нового обьекта из класса Animals
  var cat = new Animals('Murka');

  console.log(cat.name, cat.skills(), cat.move());
  // --> Murka, Jump, default Animals speed
  //параметр move берется из прототипа так как собственного нету.

// добавление собственного метода move конкретно данному обьекту cat
  cat.move = function () {
    return this.name + ' so fast';
  };

  console.log(cat.move(), cat.__proto__.move());
  // --> Murka so fast, default Animals speed
  //первый move-собственный, второй move-получаем с прототипа

// перезапись свойств метода move в прототипе обьекта cat
  cat.__proto__.move = function () {
    return 'new default Animals speed';
  };

  console.log(cat.move(), cat.__proto__.move());
  // --> Murka so fast, new default Animals speed
  //первый move-собственный, второй move-получаем с прототипа (обновленный)

  //создаем другой клас Tiger и обьект от него tiger
  function Animals2(name) {
    this.name = name;
  }
  //в прототип класса Animals2 назначаем свойства обьекта cat, то есть tiger наследуется от cat
  //Animals2.prototype = cat;

  var tiger = new Animals2('Sherhan');

  //console.log(tiger.name, tiger.__proto__.name, tiger.move());
  // --> Sherhan,  Murka,  Sherhan so fast
  // последнее свойство move взято в прототипе (унаследовано от обьекта cat)
  //------------------------------------------------------------------------
/* 1. Проверка на эквивалентность
      cat.__proto__ === Animals.prototype; // true

   2. Присваиваем __proto__ новый объект
      cat.__proto__ = Animals2.prototype;
      Теперь cat наследуется непосредственно от Animals2.prototype, а не от Animals.prototype,
      и теряет свойства, изначально унаследованные от Animals.prototype.
   -------------------------------------------------------------------------
   доступ к свойствам прототипа обьекта cat
      console.log( Object.getPrototypeOf(cat).move() ); // new default Animals speed /  ТИПА альтернативный метод
   устанавливает прототип
      Object.setPrototypeOf(cat, tiger); теперь прототипом обьекта cat будет обьект tiger*/

//============================================================================
//  CALL
//============================================================================
  /*схема вызова callback функ. для классов.
    function SomeClass(_arg1, _arg2) {
      Parent1.call(this, _arg1);
      Parent2.call(this, _arg2);
      //далее, собственные методы и свойства SomeClass
    }
    интересный тип наследования без прототайпа...
    чрезвычайно простая и наглядная методика, не требующая дополнительных сущностей,
    и к тому же, позволяющая множественное наследование, по необходимости.*/

  function ParentSEX(sex) {
    this.sex = sex;                       //создание свойства sex для будущего обьекта который будет создан из этого класса.
  }
  function ParentAGE(age) {
    this.age = age;
  }
  function User(name, _sex, _age) {
    ParentSEX.call(this, _sex);           //в this находится передаваемый обьект (someObj), sex - аргумент для функ.ParentSEX
    ParentAGE.call(this, _age);

    this.name = name;                     //- публичная переменная (public)
    var cock = 32;                        //- приватная переменная (private), доступна только внутри данной функ.
    var resume = function () {            //- приватная функция (private), доступна только внутри данной функ.
      return name + _age + _sex + cock;
    };
    this.getResume = resume();            //- публичный метод для доступа к результатам функ resume извне.
  }
  var someObj = new User('John', 'male', 27);

  console.log(someObj);
  //---> Object { name: "John", sex: "male", age: 27, getResume: "John27male32" }
  console.log(someObj.name, someObj.cock, someObj.getResume);
  //---> John,  undefined (потому что private),  John27male32

//============================================================================
//  FABRIC
//============================================================================
// создаем функцию которая возвращает обьект с параметрами
  function ParentClass(name) {
    var speed = 10;
    return {
      name: name,
      run: function (distance) {
        return distance/speed + '-секунд';
      }
    }
  }
  var parentObj = ParentClass('Animal');

  console.log(parentObj.run(1000));
  //---> 100

  function ChildClass(name) {
    //принимаем родительский обьект со всеми его свойствами
    var parent = ParentClass(name);
    //добавляем свойств которые должны быть у наследника
    var jumps = 1;
    parent.jump = function() {
      jumps++;
    };
    parent.getJumps = function() {
      return jumps
    };
    // поставить правильное свойство конструктора
    // (делаем вид, что объект создали мы, а не ParentClass)
    //этот пункт не обязателен, но он позволяет в будущем проводить сравнение обьекта через его прототип.
    parent.constructor = arguments.callee;

    //возвращаем готовый обьект с общими всеми свойствами
    return parent;
  }
  var childObj = ChildClass('Rabbit');
  //alert(childObj.constructor === ChildClass); // => true

  console.log(childObj.name, childObj.run(1000), childObj.jump(), childObj.getJumps());
  //---> Rabbit,  100-секунд,  undefined,  2
  //третий пункт- функ. отрабатывает но она ничего не выводит по этому мы видим undefined
  //а вот последняя функ. как раз делает вывод результата работы предыдущей функ. через return

  /*как это все работает?
    Фактически, функция берет другой объект и добавляет ему свои методы.
    Из-за этого такую реализацию наследования иногда называют "паразитическим наследованием".
  */

//============================================================================
//  BIND CALL APPLY,   This - Контекст выполнения функции
//============================================================================
  /*Если методы Call() и Apply() позволяют "выполнить" функцию с неким переданым ей контекстом (this) и аргументами.
  То вот метод Bind() позволяет "связать" функцию с неким переданым ей контекстом (this) и аргументами,
  что бы выполнить ее позже !!! 
  -------------------------------------------------------
  someFunc.call(this, arguments1, arguments2, ... )
  someFunc.apply(this, [arguments1, arguments2, ...] )
  -------------------------------------------------------
  Так можно было бы реализовать передачю контекста без методов call() и apply();
  function rename(obj, new_name, new_age) {
    obj.name = new_name;
    obj.age = new_age;
  }
  rename( human, 'Conor', 40 ); 
  
  Пример самописной реализации метода bind():
  function bind(callback, context){
    return function(){
      callback.apply(context, arguments);
    }
  }
  let rename_bind = bind(rename, human);
  rename_bind( 'Conor', 40 );
  */
   human = {
    name:'John',
    age:16
  };
  
  function rename(new_name, new_age) {
    this.name = new_name;
    this.age = new_age;
  }
  
  rename.call( human, 'Conor', 40 );    
  // первый параметр - контекст (this), последующие - аргументы для функ.
  rename.apply( human, ['Conor', 40] ); 
  // этот метод отличается от предыдущего лишь тем, что аргументы передаются в массиве.
  var rename_bind = rename.bind( human );
  rename_bind( 'Conor', 40 );
  // функция rename_bind вызывается просто с аргументами, так как нужный контекст (this) уже был привязан ранее.
  console.log( human ); 
  // --> Object { name: "Conor", age: 40 }
  
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
//  SCOPE (область видимости в ангулар)
//============================================================================
  var scope = [{'close':'cap', 'color':'red', 'size':'S'}, {'close':'cap', 'color':'blue', 'size':'XL'}];
  //в scope сейчас находятся 2 обьекта с параметрами, функ. funcClothes мы вносим изменения (все имена произвольны.)
  function funcClothes( scope ) {
    scope[1].size = 'XXXL'; // Change size in second object from "L" to "XXXL"
    scope.push( {'close':'cap', 'color':'green', 'size':'L'} ); // Add to Scope new object
  }
  funcClothes( scope );

  console.log(scope); // Now 3 object into Scope
  console.log(scope[1].size); // XXXL

//============================================================================
//  EVENT LOOP (цикл событий в JS)
//============================================================================
  /*Цикл событий решает одну основную задачу: наблюдает за стеком вызовов и очередью коллбэков (callback queue).
  Если стек вызовов пуст, цикл берёт первое событие из очереди и помещает его в стек,
  что приводит к запуску этого события на выполнение.
  Подобная итерация называется тиком (tick) цикла событий. Каждое событие — это просто коллбэк.
  Call Stack (стек вызовов)  -- WEB API (api браузера, например таймер)  -- Callback Queue (очередь колбеков)
  Рассмотрим следующий пример при использовании функ. setTimeout:
  функ. setTimeout(myCallback, 1000) попадает в стек вызовов -->
  отрабатывает и включается таймер в браузере -->
  функ. завершила работу и удаляется из стека вызовов -->
  таймер завершает работу и помещает коллбэк myCallback в очередь коллбэков. -->
  цикл событий берёт функ. из очереди коллбэков myCallback и помещает её в стек вызовов -->
  функ. выполняется --> удаляется с стека вызовов.
  */


  // можна заменить циклом for

//REDUCE - сумирование
  var arr = [1,2,3,4,5];
  var myReduce = arr.reduce(
    function (a, b) {
      return a + b;
    }
  );
  //REDUCE - проходит по всем елем циклом
  //возвращает результат сумирования массива.
  console.log(myReduce);  //--> 15

  //MAP - преобразование
  var myMap = arr.map(
    function (elem) {
      return elem * 2;
    }
  );
  //elem - каждый елемент в массиве, MAP - проходит по всем елем циклом
  //возвращает массив той же длины но уже обработанный, по сути новый массив.
  console.log(myMap);  // --> [2,4,6,8,10]

  //FILTER - фильтрация
  var myFilter = arr.filter(
    function (elem) {
      return elem > 1 && elem < 5;
    }
  );
  //elem - каждый елемент в массиве, FILTER - проходит по всем елем циклом
  //возвращает массив любой длины и уже обработанный, по сути новый массив.
  console.log(myFilter);  // --> [2,3,4]

//============================================================================
//  TRY, CATCH, THROW, FINALLY
//============================================================================
  /*try {
  .. пробуем выполнить код ..
  } catch(error) {
  .. перехватываем исключение ..
  } finally {
  .. выполняем всегда ..
  }*/
  var data = '{ "name": 30, "age": 30 }';
  try {
    var user = JSON.parse(data); // выполнится без ошибок
    if (!user.name) {
      throw new SyntaxError("Данные некорректны"); // если не находим name, то искуственно создаем ошибку
    }
    //blabla(); // ошибка!
    // ... если есть ошибка то датьше нее код не выполнится.
  } catch (error) {  // в error передается обьект с полным описанием ошибки, name, message, stack.
    if( error.name == "SyntaxError" ){  // если ошибка наша
      alert( "Извините, в данных ошибка" );  // вывод алерта об ошибке
    }
    else{  // если ошибка неизвестная то
      throw error;  // проброс ошибки дальше, не обрабатывать
    }
  }

//============================================================================
//  TEST SECTION
//============================================================================

  // var factory = 1;
  //
  // (function (factory) {
  //   if (typeof define === 'function' && define.amd) {
  //     // AMD
  //     define(['jquery'], factory);
  //   }
  //   else if (typeof exports === 'object') {
  //     // CommonJS
  //     factory(require('jquery'));
  //   }
  //   else {
  //     // Browser globals
  //     factory(jQuery);
  //   }
  // })(factory);

  var result1 = 3 > 4?'Ok':3 > 3?'No':'Else';   // Else
  var result2 = 3 > 2?'Ok':'Else';              // Ok
  console.log(result1, result2);



//============================================================================
//  VSCODE   Ctrl + Shift + P ---> Developer: Inspect TM Scopes
//============================================================================
/*
"editor.tokenColorCustomizations": {
  "[One Dark Bimbo]": {
    "textMateRules": [
      {
        "scope": "variable.language, keyword.operator",
        "settings": {
            "foreground": "#C594C5"
        } 
      },
      {
        "scope": "variable.parameter",
        "settings": {
            "foreground": "#D4D4D4"
        }
      }
    ]
    //entity.name.tag                         - thml tag (html + css + JS)
    //entity.name.tag.html                    - thml tag (html)
    //entity.name.tag.css                     - thml tag (css)
    //entity.name.tag.js                      - thml tag (JS)
    //text.html.derivative                    - html text (html)
    //entity.other.attribute-name             - attr key, .class #id (html + css)
    //entity.other.attribute-name.html        - attr key (html)
    //entity.other.attribute-name.class.css   - .class #id (css)
    //support.type.property-name.css          - params key (css)
    //constant.numeric, support.constant,     - params value(css)
    //keyword.other.unit, constant.other.color
    //string.quoted.double.html || string     - attr value (html) || string
    //storage.type                            - func, class, conctructor (JS)
    //storage.type.function.js                - function (JS)
    //storage.type.js                         - conctructor, const, let, var (JS)
    //storage.type.class.js                   - class (JS)
    //storage.modifier                        - extends
    //variable.language                       - this, super (JS)
    //variable                                - variable (JS)
    //keyword                                 - retutn, import, export, if, else
    //entity.name.function                    - render(), bind() and athers functions-methods
    //entity.name.type.class                  - class UserGreeting (class-name) (JS)
    //support.class                           - <UserGreeting />, console.log() (JS)
    //variable.parameter                      - props into func (JS)
    //constant.language                       - true, false, null
    //keyword.operator                        - new
    //meta.jsx.children.js || meta.tag        - html text (JS)
  } 
}
*/



});
